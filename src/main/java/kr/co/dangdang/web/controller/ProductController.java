package kr.co.dangdang.web.controller;

import java.security.Principal;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.dangdang.web.config.auth.DangdangUserDetails;
import kr.co.dangdang.web.entity.Member;
import kr.co.dangdang.web.entity.Product;
import kr.co.dangdang.web.repository.MemberRepository;
import kr.co.dangdang.web.service.ProductService;

@Controller
@RequestMapping("/user/product")
public class ProductController {

   @Autowired
   private ProductService service;
   
   @Autowired
   private MemberRepository memberRepository;
   
   @GetMapping("/list")
   public String list() {

   return "user/product/list";
   
   }
   
   @GetMapping("/list-result")
   public String result(Model model, Principal principal) {
       Member member = null;
       if (principal != null) {
           // 로그인 한 경우에만 userDetails를 사용합니다.
           Authentication authentication = (Authentication) principal;
           if (authentication.getPrincipal() instanceof DangdangUserDetails) {
               DangdangUserDetails userDetails = (DangdangUserDetails) authentication.getPrincipal();
               member = memberRepository.findById(userDetails.getId());
               // ... 기존 로직 ...
           }
       }
       
       if (member == null) {
            member = new Member(); 
           member.setUserName("게스트");
       }

	    // 나머지 코드...
	    model.addAttribute("member", member);
	    return "user/product/list-result";
	}

   // 서버 사이드에서 BMR을 계산하는 메소드 
   private double calculateBMR(double weight, double height, int year, String gender) {
       double bmr = (10 * weight) + (6.25 * height) - (5 * year);
       if ("남성".equals(gender)) {
           bmr += 5;
       } else if ("여성".equals(gender)) {
           bmr -= 161;
       }
       return bmr;
   }

	
	// ...
	@GetMapping("/detail")
	public String detail(
	        @RequestParam Long id,
	        Model model,
	        Principal principal) {
	    Product product = service.getProductById(id);
	    Member member = null;
	    DangdangUserDetails userDetails = null;  // 여기서 userDetails를 선언합니다.

	    // 로그인 여부를 확인하고, UserDetails를 가져옵니다.
	    if (principal instanceof Authentication) {
	        Authentication authentication = (Authentication) principal;
	        Object principalDetails = authentication.getPrincipal();

           if (principalDetails instanceof DangdangUserDetails) {
               userDetails = (DangdangUserDetails) principalDetails;
               // 회원 정보를 가져옵니다.
               member = memberRepository.findMemberById(userDetails.getUsername()); 
           }
       }

       // 회원 정보가 없는 경우 기본값으로 새 Member 객체를 생성합니다.
       if (member == null) {
           member = new Member();
           member.setUserName("당당");
       }

	    // 모델에 userDetails 객체를 추가
	    if (userDetails != null) {
	        model.addAttribute("userDetails", userDetails);
	        int currentYear = LocalDate.now().getYear();	// 연도
	        
	        // 여기에서 사용자 상세 정보를 바탕으로 BMR을 계산합니다.
	        // 사용자 상세 정보가 null인지 확인하고, null이 아닐 경우에만 BMR 계산을 수행합니다.
	        Integer userWeight = userDetails.getUserWeight();
	        Integer userHeight = userDetails.getUserHeight();
	        Integer birthYear = userDetails.getUserYear(); // birthYear는 null일 수 있습니다.
	        String userGender = userDetails.getUserGender();

	        if (userWeight != null && userHeight != null && birthYear != null && userGender != null) {
	            int userYear = currentYear - birthYear;
	            double bmr = calculateBMR(userWeight, userHeight, userYear, userGender);
	            // 계산된 BMR 값을 모델에 추가합니다.
	            model.addAttribute("bmr", bmr);
	        }
	    }
	    
	    model.addAttribute("product", product);
	    model.addAttribute("member", member);
	    
	    return "user/product/detail";
	}
	// ...

	
}