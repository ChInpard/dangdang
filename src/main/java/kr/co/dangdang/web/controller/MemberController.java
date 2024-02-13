package kr.co.dangdang.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.dangdang.web.config.auth.DangdangUserDetails;
import kr.co.dangdang.web.entity.BoardView;
import kr.co.dangdang.web.entity.Member;
import kr.co.dangdang.web.service.MemberService;

@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	@GetMapping("exit")
	public String exit() {
		
		return "member/exit";
	}
	
	@GetMapping("write")
	public String write(Model model) {
		DangdangUserDetails userDetails = (DangdangUserDetails) SecurityContextHolder
																.getContext()
																.getAuthentication()
																.getPrincipal();
		Long id = userDetails.getId();
		System.out.println(id);
		List<BoardView> list = service.getListViewById(id);
		
		model.addAttribute("list", list);
		System.out.println(list);
		
		return "member/write";
	}

	@GetMapping("index")
	public String mypage(Model model) {
		DangdangUserDetails userDetails = (DangdangUserDetails) SecurityContextHolder
																.getContext()
																.getAuthentication()
																.getPrincipal();
		Long id = userDetails.getId();
		Member member = service.getListById(id);
		
		model.addAttribute("m", member);
		
		return "member/index";
	}
	
	@GetMapping("inform")
	public String inform() {
		
		return "member/body-inform";
	}
	
	@GetMapping("useredit")
	public String edit(Model model) {
		DangdangUserDetails userDetails = (DangdangUserDetails) SecurityContextHolder
																.getContext()
																.getAuthentication()
																.getPrincipal();
		Long id = userDetails.getId();
		Member member = service.getListById(id);
		
		model.addAttribute("m", member);
		
		return "member/useredit";
	}
	
}
