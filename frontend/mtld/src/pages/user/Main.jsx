import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import MedicalCheckup from 'assets/survey_question.png';
import WalkingDiary from 'assets/diary_home.png';
import PetFriendly from 'assets/location_main.png';
import HoneyTip from 'assets/info_board.png';
import AdoptionHelper from 'assets/adoption_survey.png';
import AbandonedDogs from 'assets/adoption_home.png';
import Arrow from 'assets/arrow.png';
import Spinner from 'components/common/Spinner';
import bobi from 'assets/bobi.png';
import { fetchPuppyInfo, puppySelector, fetchAlarmInfo, alarmSelector } from 'app/puppy';
import { useSelector, useDispatch } from 'react-redux';
import { isFulfilled } from '@reduxjs/toolkit';
import vaccine from 'app/vaccine';

const StyledSwiper = styled(Swiper)`
  margin-top: 30px;
  position: relative;
  .swiper-button-prev {
    display: none;
  }
  .swiper-button-next {
    width: 90px;
    height: 100px;
    background: url(${Arrow}) no-repeat !important;
    position: absolute;
    right: 0;
    top: 100px;
  }
  .swiper-button-next::after {
    display: none;
  }
  @media screen and (min-width: 1356px) {
    margin-top: 60px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
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
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  @media screen and (min-width: 1356px) {
    margin-top: 60px;
  }
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
  const puppy = useSelector(puppySelector);
  const alarm = useSelector(alarmSelector);
  const dispatch = useDispatch();

  const vaccineAlarm = [];
  const [medicineAlarm, setMedicineAlarm] = useState([]);
  const [vaccineDday, setVaccineDday] = useState([]);
  const [vaccineName, setVaccineName] = useState([]);
  const [medicineDday, setMedicineDday] = useState([]);
  const [medicineName, setMedicineName] = useState([]);

  useEffect(() => {
    dispatch(fetchPuppyInfo());
  }, []);

  useEffect(() => {
    const triggerAlarm = async () => {
      const action = await dispatch(fetchAlarmInfo());
      if (isFulfilled(action)) {
        // console.log(action.payload.data); // [{...}]
        return action.payload.data;
      }
    };
    triggerAlarm().then((res) => {
      let vaccResult = {};
      let medResult = {};
      console.log(res);
      for (let i = 0; i < res.length; i += 1) {
        // ????????? ?????????
        for (let j = 0; j < res[i].vaccinations.length; j += 1) {
          const vaccineAlarmValue = res[i].vaccinations.slice();
          const vaccineResult = vaccineAlarmValue.sort((a, b) => (a.expectDate < b.expectDate ? 1 : -1));
          vaccResult = { date: vaccineResult[j].expectDate, vaccineId: vaccineResult[j].vaccineId };
        }
        console.log(vaccResult);
        const dday = new Date(vaccResult.date);
        const today = new Date(); // ?????? ?????? ?????? ??????
        const yy = today.getFullYear();
        const mm = dday.getMonth();
        const dd = dday.getDate();

        const dDay = new Date(yy, mm, dd);
        const diffDate = Math.ceil((dDay.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

        if (isNaN(diffDate)) {
          console.log('is NaN');
        } else {
          setVaccineDday((oldArray) => [...oldArray, diffDate]);
        }

        if (vaccResult.vaccineId === 1) {
          setVaccineName((oldArray) => [...oldArray, 'DHPPL']);
        } else if (vaccResult.vaccineId === 2) {
          setVaccineName((oldArray) => [...oldArray, '?????????']);
        } else if (vaccResult.vaccineId === 3) {
          setVaccineName((oldArray) => [...oldArray, '????????????']);
        } else if (vaccResult.vaccineId === 4) {
          setVaccineName((oldArray) => [...oldArray, '?????????']);
        }

        for (let k = 0; k < res[i].takingMedicines.length; k += 1) {
          const medicineAlarmValue = res[i].takingMedicines.slice();
          const medicineResult = medicineAlarmValue.sort((a, b) => (a.expectDate < b.expectDate ? 1 : -1));
          medResult = { date: medicineResult[k].expectDate, medicineId: medicineResult[k].medicineId };
        }

        const Dday = new Date(medResult.date);
        const medtoday = new Date(); // ?????? ?????? ?????? ??????
        const medyy = medtoday.getFullYear();
        const medmm = Dday.getMonth();
        const meddd = Dday.getDate();

        const medDday = new Date(medyy, medmm, meddd);
        const medDiffDate = Math.ceil((medDday.getTime() - medtoday.getTime()) / (24 * 60 * 60 * 1000));

        if (isNaN(medDiffDate)) {
          console.log('is NaN');
        } else {
          setMedicineDday((oldArray) => [...oldArray, medDiffDate]);
        }

        if (medResult.medicineId === 1) {
          setMedicineName((oldArray) => [...oldArray, '??????????????????']);
        } else if (medResult.medicineId === 2) {
          setMedicineName((oldArray) => [...oldArray, '?????????']);
        } else if (medResult.medicineId === 3) {
          setMedicineName((oldArray) => [...oldArray, '?????????']);
        }
      }
    });
  }, []);

  if (!puppy.puppyInfo) {
    return <Spinner />;
  }

  return (
    <div>
      {Array.isArray(puppy.puppyInfo) && puppy.puppyInfo.length < 1 ? (
        <StyledSwiper
          modules={[Navigation]}
          // spaceBetween={}
          slidesPerView={1} // ??? ??????????????? ????????? ??????
          navigation
        >
          <StyledSwiperSlide>
            <StyledLink to="/mypage">
              <OurBabyDiv>
                <OurBaby src={bobi} />
              </OurBabyDiv>
            </StyledLink>
            <Welcome>
              <BabyName>&nbsp;?????????</BabyName>
              <span>&nbsp;????????????!</span>
            </Welcome>
            <Alarm>
              <span>??????????????? ??? ??? ????????????</span>
              <span>?????? ????????? ?????? ????????? ????????????</span>
            </Alarm>
          </StyledSwiperSlide>
        </StyledSwiper>
      ) : (
        <StyledSwiper
          modules={[Navigation]}
          slidesPerView={1} // ??? ??????????????? ????????? ??????
          navigation
        >
          {puppy.puppyInfo.map((pup, i) => (
            <StyledSwiperSlide key={i}>
              <StyledLink to="/mypage">
                <OurBabyDiv>
                  <OurBaby src={pup.fileURL} />
                </OurBabyDiv>
              </StyledLink>
              <Welcome>
                <BabyName>&nbsp;{pup.name}</BabyName>
                <span>&nbsp;?????????!</span>
              </Welcome>
              <StyledLink to={`/pet-medical-card/${pup.id}`}>
                <Alarm>
                  {!vaccineName[i] || vaccineDday.length === 0 ? (
                    <span style={{ color: '#81e3d7' }}>????????? ????????? ??????????????? ???????????????!</span>
                  ) : (
                    <span>
                      {vaccineName[i]} ???????????? {vaccineDday[i]}??? ????????????!
                    </span>
                  )}
                  {!medicineName[i] || medicineDday.length === 0 ? (
                    <span style={{ color: '#81e3d7' }}>????????? ????????? ???????????????!</span>
                  ) : (
                    <span>
                      {medicineName[i]} {medicineDday[i]}??? ?????? ????????????!
                    </span>
                  )}
                </Alarm>
              </StyledLink>
            </StyledSwiperSlide>
          ))}
        </StyledSwiper>
      )}

      <MenuDiv>
        <MenuGroup>
          <MenuItem>
            <StyledLink to="/survey-question">
              <div>
                <MenuImage src={MedicalCheckup} />
              </div>
              ????????????
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/diary-home">
              <div>
                <MenuImage src={WalkingDiary} />
              </div>
              ????????????
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/location-main">
              <div>
                <MenuImage src={PetFriendly} />
              </div>
              ??????????????????
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/info-board">
              <div>
                <MenuImage src={HoneyTip} />
              </div>
              ???????????????
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/adoption-survey-home">
              <div>
                <MenuImage src={AdoptionHelper} />
              </div>
              ???????????????
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/adoption-home">
              <div>
                <MenuImage src={AbandonedDogs} />
              </div>
              ??????????????????
            </StyledLink>
          </MenuItem>
        </MenuGroup>
      </MenuDiv>
    </div>
  );
}

export default Main;
