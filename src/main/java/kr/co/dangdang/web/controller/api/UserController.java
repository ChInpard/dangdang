package kr.co.dangdang.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.dangdang.web.entity.Member;
import kr.co.dangdang.web.service.MemberService;

@RestController("userApiController")
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private MemberService service;
	
	@PostMapping
	public String signup(
					@RequestParam("user-id") String userId,
					@RequestParam("user-name") String userName,
					@RequestParam("user-email") String userEmail,
					@RequestParam("user-pwd") String userPwd) {

		//암호화는 서비스에서 하는것이 좋다
		//컨트롤러는 입출력을 담당하는 부분
		Member member = Member.builder()
						.userId(userId)
						.userName(userName)
						.userEmail(userEmail)
						.userPwd(userPwd)
						.build();
		
		System.out.println(member);
		service.reg(member);
		
		return "redirect:/index";
	}
	
}
