import axios from 'axios';
import { Navigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_BASE_URL;

const accessToken = window.localStorage.getItem('accessToken');

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenExp = localStorage.getItem('accessTokenExp');
    const refreshToken = localStorage.getItem('refreshToken');

    // 오늘 날짜와 expiration date의 차이가 1보다 작을 경우, 토큰은 만료됨
    const today = new Date();
    const parsedToday = today.getTime();
    const isExpired = accessTokenExp - parsedToday < 1;
    // console.log('is access token Expired?', isExpired);

    const RTexpire = window.localStorage.getItem('refreshTokenExp');
    const parsedRTexpire = Math.floor((RTexpire - parsedToday) / 3600000);
    // console.log('refresh token expires in: ', parsedRTexpire, '시간');

    // 1. access token이 만료되지 않았을 경우: 그대로 리턴
    if (accessToken && !isExpired) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
    if (parsedRTexpire < 1) {
      Navigate('/login');
    }
    if (accessToken && isExpired) {
      // 2. access token이 만료되었고, refresh token은 남아있는 경우: refresh token으로 재발급 요청
      axios({
        url: `${baseURL}/login/oauth2/reissue`,
        method: 'get',
        headers: {
          'Access-Token': `${accessToken}`,
          'Refresh-Token': `${refreshToken}`,
        },
      })
        .then((res) => {
          window.localStorage.setItem('accessToken', res.data.accessToken);
          window.localStorage.setItem('accessTokenExp', res.data.tokenExpiresIn);
          window.localStorage.setItem('refreshToken', res.data.refreshToken);
          window.localStorage.setItem('refreshTokenExp', res.data.refreshTokenExpiresIn);
          // 재발급 받은 accessToken 다시 헤더에 넣음
          config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return config;
        })
        .catch((err) => {
          // 3. access token 발급이 거절된 경우(아마 refresh token도 만료되었을 경우)
        });
      return config;
    }
  },
  (err) => {
    Navigate('/login');
    return Promise.reject(err);
  },
);

// 받아온거에 반복적인 작업을 따로 설정 해 줄 필요가 있을 때
// 콘솔 너무 많이 찍혀서 일단 코멘트아웃

// axiosInstance.interceptors.response.use(
//   (config) => {
//     console.log(config);
//     return config;
//   },
//   ({ config, request, response, ...err }) => {
//     const errMsg = 'Authorization Error';
//     return Promise.reject(
//       new Error({
//         config,
//         message: errMsg,
//         response,
//         ...err,
//       }),
//     );
//   },
// );

export default axiosInstance;
