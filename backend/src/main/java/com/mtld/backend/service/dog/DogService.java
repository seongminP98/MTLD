package com.mtld.backend.service.dog;

import com.mtld.backend.dto.dog.DogMainResponseDetailDto;
import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.dto.dog.DogUpdateRequestDto;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.repository.dog.DogRepository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


/**
 * created by myeongseok on 2022/09/16
 * updated by seongmin on 2022/10/30
 */
public interface DogService {

    Dog getDog(Long dogId);

    List<DogResponseDetailDto> getDogByUser(Long userId);

    List<DogMainResponseDetailDto> getMainDogByUser(Long userId);

    DogResponseDetailDto getDogById(Long uid, Long id);

    Long registerDog(Long userId, DogRequestDto dogRequestDto, MultipartFile file);

    Long updateDog(Long userId, DogUpdateRequestDto dogUpdateRequestDto, MultipartFile image);

    void deleteDog(Long userId, Long dogId);
}
