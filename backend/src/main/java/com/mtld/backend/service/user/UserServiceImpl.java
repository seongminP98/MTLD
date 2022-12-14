package com.mtld.backend.service.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtld.backend.config.SecurityUtil;
import com.mtld.backend.dto.token.KakaoProfileDto;
import com.mtld.backend.dto.token.KakaoTokenDto;
import com.mtld.backend.dto.token.ReissueDto;
import com.mtld.backend.dto.token.TokenDto;
import com.mtld.backend.dto.user.LoginResponseDto;
import com.mtld.backend.dto.user.UserInfoDto;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.exception.BadRequestException;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.jwt.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.Duration;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * created by seongmin on 2022/09/14
 * updated by seongmin on 2022/09/23
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    String KAKAO_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    String KAKAO_REDIRECT_URI;
    @Value("${spring.security.oauth2.client.registration.kakao.authorization-grant-type}")
    String GRANT_TYPE;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    String CLIENT_SECRET;


    @Override
    public UserInfoDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new BadRequestException("???????????? id : {" + id + "}??? ?????? ????????? ???????????? ????????????."));
        return UserInfoDto.of(user);
    }

    @Override
    public KakaoTokenDto getKakaoAccessToken(String code) {
        log.info("getKakaoAccessToken = {}", code);
        RestTemplate rt = new RestTemplate();

        rt.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        rt.setErrorHandler(new DefaultResponseErrorHandler() {
            @Override
            public boolean hasError(ClientHttpResponse response) throws IOException {
                HttpStatus statusCode = response.getStatusCode();
                return statusCode.series() == HttpStatus.Series.SERVER_ERROR;
            }
        });

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        // HttpBody ?????? ??????
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", KAKAO_CLIENT_ID); //????????? ??? REST API ???
        params.add("redirect_uri", KAKAO_REDIRECT_URI);
        params.add("code", code); //?????? ?????? ????????? ?????? ?????? ?????????, ??????????????? ???????????? ??? ??????
        params.add("client_secret", CLIENT_SECRET);

        // ????????? ?????? ????????? ?????? HttpEntity ?????? ??????
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
        log.info("kakaoTokenRequest = {}", kakaoTokenRequest);

        // ?????????????????? Access token ??????
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // JSON Parsing (-> KakaoTokenDto)
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoTokenDto kakaoTokenDto = null;
        log.info("accessTokenResponse.getBody() = {}", accessTokenResponse.getBody());
        try {
            kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoTokenDto;
    }

    @Override
    public User getKakaoInfo(String kakaoAccessToken) {

        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        // POST ???????????? API ????????? ?????? ?????????, response ?????????
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );


        // JSON Parsing (-> kakaoAccountDto)
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfileDto kakaoAccountDto = null;
        try {
            kakaoAccountDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoProfileDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // kakaoAccountDto ?????? ????????? ?????? ????????? Account ????????? ??????
        String email = kakaoAccountDto.getKakao_account().getEmail();
        String kakaoName = kakaoAccountDto.getProperties().getNickname();

        return User.builder()
                .platform("KAKAO")
                .oauthId(email)
                .name(kakaoName)
                .roleType(RoleType.USER)
                .build();
    }

    @Override
    public LoginResponseDto kakaoLogin(String kakaoAccessToken) {
        // kakaoAccessToken ?????? ???????????? ????????????
        User user = getKakaoInfo(kakaoAccessToken);

        Optional<User> findByOauthId = userRepository.findByOauthId(user.getOauthId());

        User loginUser;
        if (findByOauthId.isEmpty()) {
            loginUser = userRepository.save(user);
        } else {
            loginUser = findByOauthId.get();
        }


        TokenDto tokenDto = jwtTokenProvider.generateJwtToken(loginUser.getOauthId(), loginUser.getId());
        redisTemplate.opsForValue().set(
                loginUser.getOauthId(),
                tokenDto.getRefreshToken(),
                tokenDto.getRefreshTokenExpiresIn(),
                TimeUnit.MILLISECONDS
        );

        return LoginResponseDto.of(loginUser, tokenDto);
    }

    @Override
    public void logout(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new BadRequestException("???????????? ?????? ??????????????????."));
        redisTemplate.delete(user.getOauthId());
    }

    @Override
    public TokenDto reissue(ReissueDto reissueDto) {
        if (!jwtTokenProvider.validateToken(reissueDto.getRefreshToken())) {
            throw new BadRequestException("Refresh Token ??? ???????????? ????????????.");
        }
        Authentication authentication = jwtTokenProvider.getAuthentication(reissueDto.getAccessToken());
        String refreshToken = redisTemplate.opsForValue().get(authentication.getName());
        if (refreshToken == null || !refreshToken.equals(reissueDto.getRefreshToken())) {
            throw new BadRequestException("????????? ?????? ????????? ???????????? ????????????.");
        }
        User user = userRepository.findByOauthId(authentication.getName()).orElseThrow(() -> new BadRequestException("???????????? ?????? ??????????????????."));
        TokenDto tokenDto = jwtTokenProvider.generateJwtToken(user.getOauthId(), user.getId());
        redisTemplate.opsForValue().set(
                authentication.getName(),
                tokenDto.getRefreshToken(),
                tokenDto.getRefreshTokenExpiresIn(),
                TimeUnit.MILLISECONDS
        );
        return tokenDto;
    }

    public UserInfoDto getMyInfoSecret() {
        log.info("SecurityUtil.getCurrentMemberId() = {}", SecurityUtil.getCurrentOauthId());
        User user = userRepository.findByOauthId(SecurityUtil.getCurrentOauthId()).orElseThrow(() -> new BadRequestException("???????????? ?????? ??????????????????."));

        return UserInfoDto.of(user);
    }
}