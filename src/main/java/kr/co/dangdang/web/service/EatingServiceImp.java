package kr.co.dangdang.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.dangdang.web.entity.Eating;
import kr.co.dangdang.web.entity.EatingView;
import kr.co.dangdang.web.entity.MealCategoryView;
import kr.co.dangdang.web.repository.EatingRepository;
import kr.co.dangdang.web.repository.MealCategoryRepository;

@Service
public class EatingServiceImp implements EatingService {

	@Autowired
	private EatingRepository eatingRepository;

	@Autowired
	private MealCategoryRepository mealCategoryRepository;
	
	
	@Override
	public List<EatingView> getEatingDataByDate(Long memberId, String selectedDate) {
		// TODO Auto-generated method stub
		return eatingRepository.findBySelectedDate(memberId, selectedDate);
	}

	@Override
	public Eating reg(String selectedDate, Long memberId, Long productId, Integer mealCategoryId) {
		// TODO Auto-generated method stub
		return eatingRepository.save(selectedDate, memberId, productId, mealCategoryId);
	}

	@Override
	public List<EatingView> getProductListByMealCategory(Long memberId, String eatingDate, Integer mealCategoryId) {
		// TODO Auto-generated method stub
		return eatingRepository.findListByMealCategory(mealCategoryId, eatingDate, memberId);
	}

	@Override
	public MealCategoryView getByMealCategory(Long memberId, String eatingDate, Integer mealCategoryId) {
		// TODO Auto-generated method stub
		return mealCategoryRepository.findByMealCategory(mealCategoryId, eatingDate, memberId);
	}

	@Override
	public Eating deleteById(Long id) {
		// TODO Auto-generated method stub
		return eatingRepository.deleteById(id);
	}
	

}
