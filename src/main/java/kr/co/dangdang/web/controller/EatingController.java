package kr.co.dangdang.web.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.dangdang.web.config.auth.DangdangUserDetails;
import kr.co.dangdang.web.entity.EatingView;
import kr.co.dangdang.web.entity.MealCategoryView;
import kr.co.dangdang.web.service.EatingService;

@Controller
@RequestMapping("/member")
public class EatingController {
	
	@Autowired
	private EatingService service;
	
	@RequestMapping("eating/daily-intake")
	public String dailyIntake(Model model){
		
		Long memberId = memberId();
		
		// 현재 날짜를 가져옵니다.
		LocalDate today = LocalDate.now();

		// 날짜를 원하는 형식으로 포맷합니다. 예를 들어 'yyyy-MM-dd' 형식으로 포맷하려면 다음과 같이 사용합니다.
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String todayDate = today.format(formatter);
		System.out.println(todayDate);
		
		List<EatingView> datas = service.getEatingDataByDate(memberId, todayDate);
		System.out.println(datas);
		
		model.addAttribute("datas", datas);
		
		return "member/eating/daily-intake";
	}

	@RequestMapping("eating/daily-diary")
	public String dailyDiary(
			Model model){
		
		Long memberId = memberId();
		
		// 현재 날짜를 가져옵니다.
		LocalDate today = LocalDate.now();

		// 날짜를 원하는 형식으로 포맷합니다. 예를 들어 'yyyy-MM-dd' 형식으로 포맷하려면 다음과 같이 사용합니다.
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String todayDate = today.format(formatter);
		
		List<EatingView> datas 
				= service.getEatingDataByDate(memberId, todayDate);
		
		model.addAttribute("datas", datas);
		
		
		Integer CategoryBreakfast = 1;
		Integer CategoryLunch = 2;
		Integer CategoryDinner = 3;
		Integer CategorySnack = 4;
		
		MealCategoryView breakfast 
				= service.getByMealCategory(memberId, todayDate, CategoryBreakfast);
		MealCategoryView lunch 
				= service.getByMealCategory(memberId, todayDate, CategoryLunch);
		MealCategoryView dinner 
				= service.getByMealCategory(memberId, todayDate, CategoryDinner);
		MealCategoryView snack 
				= service.getByMealCategory(memberId, todayDate, CategorySnack);
		
		
		model.addAttribute("breakfast", breakfast);
		model.addAttribute("lunch", lunch);
		model.addAttribute("dinner", dinner);
		model.addAttribute("snack", snack);
		
		// breakfast-list
	    List<EatingView> breakfastList = service.getProductListByMealCategory(memberId, todayDate, CategoryBreakfast);
	    model.addAttribute("breakfastList", breakfastList);

	    // lunch-list
	    List<EatingView> lunchList = service.getProductListByMealCategory(memberId, todayDate, CategoryLunch);
	    model.addAttribute("lunchList", lunchList);

	    // dinner-list
	    List<EatingView> dinnerList = service.getProductListByMealCategory(memberId, todayDate, CategoryDinner);
	    model.addAttribute("dinnerList", dinnerList);

	    // snack-list
	    List<EatingView> snackList = service.getProductListByMealCategory(memberId, todayDate, CategorySnack);
	    model.addAttribute("snackList", snackList);
	    
		return "member/eating/daily-diary";
	}

	@RequestMapping("eating/daily-detail")
	public String dailyDetail(Model model){
		
		Long memberId = memberId();
		
		LocalDate today = LocalDate.now();

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String todayDate = today.format(formatter);
		
		List<EatingView> datas = service.getEatingDataByDate(memberId, todayDate);
		System.out.println(datas);
		
		model.addAttribute("datas", datas);
		
		return "member/eating/daily-detail";
	}
	
	
	private Long memberId() {
		// TODO Auto-generated method stub
		DangdangUserDetails userDetails = 
				(DangdangUserDetails) SecurityContextHolder
											.getContext()
											.getAuthentication()
											.getPrincipal();

		Long memberId = userDetails.getId();
		
		return memberId;
	}		
	
}
