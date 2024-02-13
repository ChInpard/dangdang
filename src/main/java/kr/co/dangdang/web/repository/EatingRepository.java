package kr.co.dangdang.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.dangdang.web.entity.Eating;
import kr.co.dangdang.web.entity.EatingView;

@Mapper
public interface EatingRepository {

	List<EatingView> findBySelectedDate(Long memberId, String selectedDate);

	Eating save(String selectedDate, Long memberId, Long productId, Integer mealCategoryId);

	List<EatingView> findListByMealCategory(Integer mealCategoryId, String eatingDate, Long memberId);

	Eating deleteById(Long id);

}
