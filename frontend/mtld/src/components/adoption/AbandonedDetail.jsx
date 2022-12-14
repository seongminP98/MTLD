import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Spinner from 'components/common/Spinner';

const StyledItem = styled.div`
  color: #5c5c5c;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .img {
    border: 6px solid #ffeeb1;
    width: 280px;
    height: 280px;
    margin-top: 1vh;
  }

  .div {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .paragraph {
    display: flex;
    align-items: center;
    margin-top: 0.8vh;
    margin-bottom: 0;
  }

  .title {
    display: inline-block;
    width: 80px;
    background-color: #ffeeb1;
    border-radius: 3px;
    padding: 2px;
    margin-right: 3vh;
    vertical-align: middle;
  }

  .text {
    padding-bottom: 3px;
    text-align: left;
  }
`;

const Button = styled.div`
  width: 280px;
  height: 4vh;
  background-color: #ffdcdc;
  border-radius: 8px;
  // box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #5c5c5c;
  font-size: 18px;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;

  .content {
    font-size: 14px;
  }
`;

function AbandonedDetail() {
  const url = window.location.href;
  const id = url.split('/')[4];

  const [abandonedList, setAbandonedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?numOfRows=1000&upkind=417000&_type=json&state=protect&serviceKey=WXT8p8vqKpEWsfVbboNx3tvmBeHbzj87Zpv1VqSqNdCFz4qrvPfjNjuH3qrvfkdtSRzhZiSu0arymoQwLSp%2Bbg%3D%3D',
      )
      .then((res) => res.data)
      .then((data) => {
        setAbandonedList(data.response.body.items.item);
      });
  }, []);

  const [puppy, setPuppy] = useState([]);

  useEffect(() => {
    if (abandonedList.length > 0) {
      // console.log(abandonedList);
      const getIt = abandonedList.filter((abandoned) => abandoned.desertionNo === id);
      setPuppy(getIt[0]);
      setLoading(false);
    }
  }, [abandonedList]);
  // console.log('puppy', puppy);

  //  ????????? ????????? Y, N, U??? O, X, ?????????????????? ??????
  const [neutered, setNeutered] = useState();

  useEffect(() => {
    if (puppy.neuterYn === 'Y') {
      setNeutered('O');
    } else if (puppy.neuterYn === 'N') {
      setNeutered('X');
    } else {
      setNeutered('????????????');
    }
  }, [puppy]);

  return (
    <StyledItem>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <img className="img" src={puppy.popfile} alt="puppy" style={{ overflow: 'hidden' }} />
          <div className="div">
            <p className="paragraph">
              <span className="title">????????????</span>
              <span className="text">{puppy.desertionNo}</span>
            </p>
            <p className="paragraph">
              <span className="title">????????????</span>
              <span className="text">{puppy.happenDt}</span>
            </p>
            <p className="paragraph">
              <span className="title">????????????</span>
              <span className="text">{puppy.happenPlace}</span>
            </p>
            <p className="paragraph">
              <span className="title">???????????????</span>
              <span className="text">{puppy.careNm}</span>
            </p>
            <p className="paragraph">
              <span className="title">??????</span>
              <span className="text">{puppy.kindCd}</span>
            </p>
            <p className="paragraph">
              <span className="title">??????</span>
              <span className="text">{puppy.sexCd === 'F' ? '???' : '???'}</span>
            </p>
            <p className="paragraph">
              <span className="title">??????</span>
              <span className="text">{puppy.age}</span>
            </p>
            <p className="paragraph">
              <span className="title">?????????</span>
              <span className="text">{puppy.weight}</span>
            </p>
            <p className="paragraph">
              <span className="title">???????????????</span>
              <span className="text">{neutered}</span>
            </p>
            <p className="paragraph">
              <span className="title">??????</span>
              <span className="text">{puppy.specialMark}</span>
            </p>
          </div>
          <Button
            onClick={() => window.open(`https://www.animal.go.kr/front/awtis/protection/protectionDtl.do?desertionNo=${puppy.desertionNo}`, '_blank')}
          >
            <span className="content">???????????? ????????????</span>
          </Button>
        </div>
      )}
    </StyledItem>
  );
}

export default AbandonedDetail;
