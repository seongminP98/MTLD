package com.mtld.backend.config;

import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.medicine.Medicine;
import com.mtld.backend.entity.vaccine.Vaccine;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.medicine.MedicineRepository;
import com.mtld.backend.repository.vaccine.VaccineRepositpry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * created by seongmin on 2022/09/27
 */
@Component
@RequiredArgsConstructor
public class DataInit {
    private final BreedRepository breedRepository;

    private final MedicineRepository medicineRepository;

    private final VaccineRepositpry vaccineRepositpry;

    @PostConstruct
    public void init() {
        List<Breed> breeds = breedRepository.findAll();
        if (breeds.size() == 0) {
            breeds.add(new Breed("000054", "골든 리트리버"));
            breeds.add(new Breed("000056", "그레이 하운드"));
            breeds.add(new Breed("000055", "그레이트 덴"));
            breeds.add(new Breed("000118", "그레이트 피레니즈"));
            breeds.add(new Breed("000115", "기타"));
            breeds.add(new Breed("000037", "꼬똥 드 뚤레아"));
            breeds.add(new Breed("000081", "네오폴리탄 마스티프"));
            breeds.add(new Breed("000204", "노르포크 테리어"));
            breeds.add(new Breed("000083", "노리치 테리어"));
            breeds.add(new Breed("00216", "노퍽 테리어"));
            breeds.add(new Breed("000082", "뉴펀들랜드"));
            breeds.add(new Breed("000038", "닥스훈트"));
            breeds.add(new Breed("000039", "달마시안"));
            breeds.add(new Breed("000040", "댄디 딘몬트 테리어"));
            breeds.add(new Breed("000043", "도고 까니리오"));
            breeds.add(new Breed("000153", "도고 아르젠티노"));
            breeds.add(new Breed("000041", "도베르만"));
            breeds.add(new Breed("000120", "도사"));
            breeds.add(new Breed("000155", "동경견"));
            breeds.add(new Breed("000069", "라브라도 리트리버"));
            breeds.add(new Breed("000142", "라이카"));
            breeds.add(new Breed("000093", "래빗 닥스훈드"));
            breeds.add(new Breed("000167", "랫 테리어"));
            breeds.add(new Breed("000070", "레이크랜드 테리어"));
            breeds.add(new Breed("000166", "로디지안 리즈백"));
            breeds.add(new Breed("000121", "로트와일러"));
            breeds.add(new Breed("000152", "마리노이즈"));
            breeds.add(new Breed("000073", "마스티프"));
            breeds.add(new Breed("000146", "말라뮤트"));
            breeds.add(new Breed("000072", "말티즈"));
            breeds.add(new Breed("000159", "맨체스터테리어"));
            breeds.add(new Breed("000076", "미니어쳐 닥스훈트"));
            breeds.add(new Breed("000075", "미니어쳐 불 테리어"));
            breeds.add(new Breed("000079", "미니어쳐 슈나우저"));
            breeds.add(new Breed("000078", "미니어쳐 푸들"));
            breeds.add(new Breed("000077", "미니어쳐 핀셔"));
            breeds.add(new Breed("000074", "미디엄 푸들"));
            breeds.add(new Breed("000080", "미텔 스피츠"));
            breeds.add(new Breed("000114", "믹스견"));
            breeds.add(new Breed("000133", "바센지"));
            breeds.add(new Breed("000012", "바셋 하운드"));
            breeds.add(new Breed("000017", "버니즈 마운틴 독"));
            breeds.add(new Breed("000015", "베들링턴 테리어"));
            breeds.add(new Breed("000164", "벨기에 그로넨달"));
            breeds.add(new Breed("000157", "벨기에 쉽독"));
            breeds.add(new Breed("000148", "벨기에 테뷰런"));
            breeds.add(new Breed("000016", "벨지안 셰퍼드 독"));
            breeds.add(new Breed("000020", "보더 콜리"));
            breeds.add(new Breed("000021", "보르조이"));
            breeds.add(new Breed("000022", "보스턴 테리어"));
            breeds.add(new Breed("000024", "복서"));
            breeds.add(new Breed("000208", "볼로네즈"));
            breeds.add(new Breed("000023", "부비에 데 플랑드르"));
            breeds.add(new Breed("000026", "불 테리어"));
            breeds.add(new Breed("000027", "불독"));
            breeds.add(new Breed("000169", "브뤼셀그리펀"));
            breeds.add(new Breed("000025", "브리타니 스파니엘"));
            breeds.add(new Breed("000019", "블랙 테리어"));
            breeds.add(new Breed("000013", "비글"));
            breeds.add(new Breed("000018", "비숑 프리제"));
            breeds.add(new Breed("000014", "비어디드 콜리"));
            breeds.add(new Breed("000162", "비즐라"));
            breeds.add(new Breed("000085", "빠삐용"));
            breeds.add(new Breed("000096", "사모예드"));
            breeds.add(new Breed("000095", "살루키"));
            breeds.add(new Breed("000001", "삽살개"));
            breeds.add(new Breed("000034", "샤페이"));
            breeds.add(new Breed("000104", "세인트 버나드"));
            breeds.add(new Breed("000031", "센트럴 아시안 오브차카"));
            breeds.add(new Breed("000099", "셔틀랜드 쉽독"));
            breeds.add(new Breed("000123", "슈나우져"));
            breeds.add(new Breed("000024", "셰퍼드"));
            breeds.add(new Breed("000097", "스코티쉬 테리어"));
            breeds.add(new Breed("000132", "스코티시 디어하운드"));
            breeds.add(new Breed("000154", "스태퍼드셔 불 테리어"));
            breeds.add(new Breed("000105", "스탠다드 푸들"));
            breeds.add(new Breed("000124", "스피츠"));
            breeds.add(new Breed("000100", "시바"));
            breeds.add(new Breed("000103", "시베리안 허스키"));
            breeds.add(new Breed("000151", "시베리안라이카"));
            breeds.add(new Breed("000139", "시잉프랑세즈"));
            breeds.add(new Breed("000101", "시츄"));
            breeds.add(new Breed("000102", "시코쿠"));
            breeds.add(new Breed("000098", "실리햄 테리어"));
            breeds.add(new Breed("000136", "실키테리어"));
            breeds.add(new Breed("000202", "아나톨리안 셰퍼드"));
            breeds.add(new Breed("000160", "아메리칸 불독"));
            breeds.add(new Breed("000203", "아메리칸 스태퍼드셔 테리어"));
            breeds.add(new Breed("000008", "아메리칸 아키다"));
            breeds.add(new Breed("000131", "아메리칸 에스키모"));
            breeds.add(new Breed("000009", "아메리칸 코카 스파니엘"));
            breeds.add(new Breed("000119", "아메리칸 핏불 테리어"));
            breeds.add(new Breed("000150", "아메리칸불리"));
            breeds.add(new Breed("000210", "아이리쉬 레드 앤 화이트 세터"));
            breeds.add(new Breed("000057", "아이리쉬 세터"));
            breeds.add(new Breed("000058", "아이리쉬 울프 하운드"));
            breeds.add(new Breed("000059", "아이리쉬소프트코튼휘튼테리어"));
            breeds.add(new Breed("000006", "아키다"));
            breeds.add(new Breed("000004", "아프간 하운드"));
            breeds.add(new Breed("000007", "알라스칸 말라뮤트"));
            breeds.add(new Breed("000005", "에어델 테리어"));
            breeds.add(new Breed("000143", "오브차카"));
            breeds.add(new Breed("000011", "오스트랄리안 셰퍼드 독"));
            breeds.add(new Breed("000010", "오스트랄리안 캐틀 독"));
            breeds.add(new Breed("000137", "올드 잉글리쉬 불독"));
            breeds.add(new Breed("000084", "올드 잉글리쉬 쉽독"));
            breeds.add(new Breed("000163", "와이마라너"));
            breeds.add(new Breed("000112", "와이어 폭스 테리어"));
            breeds.add(new Breed("000113", "요크셔 테리어"));
            breeds.add(new Breed("000149", "울프독"));
            breeds.add(new Breed("211", "웨스트 시베리언 라이카"));
            breeds.add(new Breed("000110", "웨스트하이랜드화이트테리어"));
            breeds.add(new Breed("000205", "웰시 코기 카디건"));
            breeds.add(new Breed("000108", "웰시 코기 펨브로크"));
            breeds.add(new Breed("000109", "웰시 테리어"));
            breeds.add(new Breed("000060", "이탈리안 그레이 하운드"));
            breeds.add(new Breed("000046", "잉글리쉬 세터"));
            breeds.add(new Breed("000047", "잉글리쉬 스프링거 스파니엘"));
            breeds.add(new Breed("000044", "잉글리쉬 코카 스파니엘"));
            breeds.add(new Breed("000045", "잉글리쉬 포인터"));
            breeds.add(new Breed("000053", "자이언트 슈나우져"));
            breeds.add(new Breed("000062", "재패니즈 스피츠"));
            breeds.add(new Breed("000061", "잭 러셀 테리어"));
            breeds.add(new Breed("000052", "저먼 셰퍼드 독"));
            breeds.add(new Breed("000165", "저먼 와이어헤어드 포인터"));
            breeds.add(new Breed("000051", "저먼 포인터"));
            breeds.add(new Breed("215", "저먼 헌팅 테리어"));
            breeds.add(new Breed("000129", "제페니즈칭"));
            breeds.add(new Breed("000067", "진도견"));
            breeds.add(new Breed("000035", "차우차우"));
            breeds.add(new Breed("000033", "차이니즈 크레스티드 독"));
            breeds.add(new Breed("000032", "치와와"));
            breeds.add(new Breed("000158", "카레리안 베어독"));
            breeds.add(new Breed("000144", "카이훗"));
            breeds.add(new Breed("000030", "캐벌리어 킹 찰스 스파니엘"));
            breeds.add(new Breed("000029", "케니스펜더"));
            breeds.add(new Breed("000064", "케리 블루 테리어"));
            breeds.add(new Breed("000207", "케언 테리어"));
            breeds.add(new Breed("000028", "케인 코르소"));
            breeds.add(new Breed("000002", "코리아 트라이 하운드"));
            breeds.add(new Breed("000068", "코리안 마스티프"));
            breeds.add(new Breed("000125", "코카 스파니엘"));
            breeds.add(new Breed("000141", "코카 푸"));
            breeds.add(new Breed("000145", "코카시안오브차카"));
            breeds.add(new Breed("000036", "콜리"));
            breeds.add(new Breed("000066", "클라인스피츠"));
            breeds.add(new Breed("000065", "키슈"));
            breeds.add(new Breed("000063", "키스 훈드"));
            breeds.add(new Breed("000140", "토이 맨체스터 테리어"));
            breeds.add(new Breed("000107", "토이 푸들"));
            breeds.add(new Breed("000106", "티베탄 마스티프"));
            breeds.add(new Breed("000209", "파라오 하운드"));
            breeds.add(new Breed("000086", "파슨 러셀 테리어"));
            breeds.add(new Breed("000088", "팔렌"));
            breeds.add(new Breed("000090", "퍼그"));
            breeds.add(new Breed("000087", "페키니즈"));
            breeds.add(new Breed("000138", "페터데일테리어"));
            breeds.add(new Breed("000089", "포메라니안"));
            breeds.add(new Breed("000126", "포인터"));
            breeds.add(new Breed("000127", "폭스테리어"));
            breeds.add(new Breed("000128", "울프독"));
            breeds.add(new Breed("000149", "푸들"));
            breeds.add(new Breed("000091", "풀리"));
            breeds.add(new Breed("000003", "풍산견"));
            breeds.add(new Breed("000161", "프레사까나리오"));
            breeds.add(new Breed("000050", "프렌치 불독"));
            breeds.add(new Breed("000168", "프렌치 브리타니"));
            breeds.add(new Breed("000049", "플랫 코티드 리트리버"));
            breeds.add(new Breed("000147", "플롯하운드"));
            breeds.add(new Breed("000092", "피레니안 마운틴 독"));
            breeds.add(new Breed("000048", "필라 브라질레이로"));
            breeds.add(new Breed("000135", "핏불테리어"));
            breeds.add(new Breed("000206", "허배너스"));
            breeds.add(new Breed("000130", "화이트리트리버"));
            breeds.add(new Breed("000134", "화이트테리어"));
            breeds.add(new Breed("000111", "휘펫"));
            breedRepository.saveAll(breeds);
        }

        List<Medicine> medicines = medicineRepository.findAll();
        if (medicines.size() == 0) {
            medicines.add(new Medicine("심장사상충약"));
            medicines.add(new Medicine("진드기약"));
            medicines.add(new Medicine("구충제"));
            medicineRepository.saveAll(medicines);
        }
        List<Vaccine> vaccines = vaccineRepositpry.findAll();
        if (vaccines.size() == 0) {
            vaccines.add(new Vaccine("DHPPL"));
            vaccines.add(new Vaccine("코로나"));
            vaccines.add(new Vaccine("켄넬코프"));
            vaccines.add(new Vaccine("광견병"));
            vaccineRepositpry.saveAll(vaccines);
        }
    }
}
