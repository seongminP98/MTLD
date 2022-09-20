/* global kakao */
import React, { useRef, useEffect, useState } from 'react';

function KakaoMap({ searchPlace, flag }) {
  const [map, setMap] = useState(null);
  let lat;
  let long;
  useEffect(() => {
    console.log(searchPlace);
    console.log(flag);
    // geoloaction으로 사용할 수 있다면
    if (navigator.geolocation) {
    // GeoLocation을 이용해 접속 위치 얻어오기
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude; // 위도
          long = position.coords.longitude; // 경도
          console.log(lat, long);
          // 검색하지 않았거나 flag가 true === 현재위치설정 버튼을 눌렀다면
          if (searchPlace === '' || flag === true) {
            const options = {
            // 지도를 생성할 때 필요한 기본 옵션
              center: new window.kakao.maps.LatLng(lat, long),
              // 지도의 중심좌표: 제주도 카카오 -> 현위치로 바꿔야함
              level: 3, // 지도의 레벨(확대, 축소 정도)
            };
            const container = document.getElementById('map');
            const kakaoMap = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 얘 뭔데
            setMap(kakaoMap);
          } else {
            const ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
            ps.keywordSearch(searchPlace, placeSearchCB);
            function placeSearchCB(data, status, _pagination) {
              if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                for (let i = 0; i < data.length; i += 1) {
                  displayMarker(data[i]);
                  // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                  // LatLngBounds 객체에 좌표를 추가
                  bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                map.setBounds(bounds); // 검색된 장소 위치를 기준으로 지도 범위를 재설정
              }
            }
            function displayMarker(place) {
              const marker = new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(place.y, place.x),
              });
            }
          }
        },
        // (error) => {
        //   lat = false;
        //   long = false;

        //   throw new Error(error);
        // },

      );
    } else {
      lat = false;
      long = false;
    }

    return () => {};
  }, [searchPlace, flag]);

  return (
    <div>
      <div
        id="map"
        style={{ width: '500px', height: '500px' }}
      />
    </div>
  );
}

export default KakaoMap;
