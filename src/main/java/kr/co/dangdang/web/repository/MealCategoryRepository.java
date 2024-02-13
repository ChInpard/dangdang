package kr.co.dangdang.web.repository;

import org.apache.ibatis.annotations.Mapper;

import kr.co.dangdang.web.entity.MealCategoryView;

@Mapper
public interface MealCategoryRepository {

	MealCategoryView findByMealCategory(Integer mealCategoryId, String eatingDate, Long memberId);
	
}
