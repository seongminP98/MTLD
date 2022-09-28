import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Bobi from 'assets/bobi.png';
import MedicalCheckup from 'assets/survey_question.png';
import WalkingDiary from 'assets/diary_home.png';
import PetFriendly from 'assets/location_main.png';
import HoneyTip from 'assets/info_board.png';
import AdoptionHelper from 'assets/adoption_survey.png';
import AbandonedDogs from 'assets/adoption_home.png';

const StyledSwiper = styled(Swiper)`
  margin: 15px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const OurBabyDiv = styled.div`
width: 150px;
height: 150px;
border-radius: 70%;
border: 10px solid #ffeeb1;
overflow: hidden;
margin-bottom: 20px;
`;

const OurBaby = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

const Welcome = styled.div`
display: flex;
color: #5c5c5c;
font-size: 28px;
margin-bottom: 12px;
`;

const BabyName = styled.span`
color: #81e3d7;
font-weight: 600;
`;

const Alarm = styled.div`
width: 330px;
height: 90px;
background-color: #eafed1;
border-radius: 15px;
display: flex;
flex-direction: column;
justify-content: center;
color: #5c5c5c;
font-size: 18px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const MenuGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 1356px) {
    flex-wrap: nowrap;
    gap: 60px;
  }
`;

const MenuItem = styled.div`
  width: 30%;
  margin-bottom: 20px;
  @media screen and (min-width: 1356px) {
    width: 80px;
  }
`;

const MenuImage = styled.img`
  height: 8vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #5c5c5c;
    font-size: 13px;
  }
`;

function Main() {
  return (
    <div>
      <StyledSwiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1} // 한 슬라이드에 보여줄 갯수
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        navigation
      >
        <StyledSwiperSlide>
          <StyledLink to="/mypage">
            <OurBabyDiv>
              <OurBaby src={Bobi} />
            </OurBabyDiv>
          </StyledLink>
          <Welcome>
            <BabyName>&nbsp;보비</BabyName>
            <span>&nbsp;반가워!</span>
          </Welcome>
          <StyledLink to="/pet-medical-card">
            <Alarm>
              <span>예방접종까지 10일 남았어요!</span>
              <span>심장사상충약 잊지 말아주세요!</span>
            </Alarm>
          </StyledLink>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <OurBabyDiv>
            <OurBaby src={Bobi} />
          </OurBabyDiv>
          <Welcome>
            <BabyName>&nbsp;바비야</BabyName>
            <span>&nbsp;반가워!</span>
          </Welcome>
          <StyledLink to="/pet-medical-card">
            <Alarm>
              <div>
                <span>예방접종까지 10일 남았어요!</span>
                <span>심장사상충약 잊지 말아주세요!</span>
              </div>
            </Alarm>
          </StyledLink>
        </StyledSwiperSlide>
        <StyledSwiperSlide>Slide 3</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 4</StyledSwiperSlide>
      </StyledSwiper>
      <Container>
        <MenuGroup>
          <MenuItem>
            <StyledLink to="/survey-question">
              <div>
                <MenuImage src={MedicalCheckup} />
              </div>
              건강진단
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/diary-home">
              <div>
                <MenuImage src={WalkingDiary} />
              </div>
              산책일지
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/location-main">
              <div>
                <MenuImage src={PetFriendly} />
              </div>
              애견동반장소
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/info-board">
              <div>
                <MenuImage src={HoneyTip} />
              </div>
              꿀팁게시판
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/adoption-survey">
              <div>
                <MenuImage src={AdoptionHelper} />
              </div>
              입양도우미
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/adoption-home">
              <div>
                <MenuImage src={AbandonedDogs} />
              </div>
              유기견친구들
            </StyledLink>
          </MenuItem>
        </MenuGroup>
      </Container>
    </div>
  );
}

export default Main;
