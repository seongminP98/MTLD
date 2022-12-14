package com.mtld.backend.dto.diary.walking;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * created by seongmin on 2022/09/08
 * updated by seongmin on 2022/09/13
 */

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class WalkingRequestDto {

    @NotBlank(message = "산책한 날짜는 필수 입력값입니다.")
    private String diaryDate;

    @NotNull(message = "산책한 시간은 필수 입력값입니다.")
    private Double walkingTime;

    @NotNull(message = "산책한 거리는 필수 입력값입니다.")
    private Double distance;

    @NotNull(message = "산책일지 쓸 반려견은 필수 입력값입니다.")
    private Long dogId;
}
