package kr.co.dangdang.web.controller.api;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.dangdang.web.entity.Email;
import kr.co.dangdang.web.entity.Member;
import kr.co.dangdang.web.service.EmailSendService;
import kr.co.dangdang.web.service.MemberService;

@RestController("memberApiController")
@RequestMapping("/api/members")
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	@Autowired
	private EmailSendService mailService;
	
	@PostMapping
	public String email(
					@RequestBody Member member) {
		
		System.out.println(member.getUserEmail());
		String emailAddress = member.getUserEmail();
		
		Email email = mailService.createMail(emailAddress);
		String key = mailService.getTempKey();
		System.out.println("key: " + key);
		mailService.mailSend(email);
		
		return key;
	}
	
	@GetMapping
	public List<Member> list(String userEmail) {

		List<Member> member = service.getList();
		
		return member;
	}
	
	@GetMapping("/email")
	public Member findId(
			@RequestParam(name = "email", required = false) String userEmail) {
		
		Member member = service.getListByEmail(userEmail);

		return member;
	}
	
	@GetMapping("{id}")
	public Member list(
					@PathVariable Long id) {
		
		Member member = service.getListById(id);
		
		return member;
	}
	
	@DeleteMapping("{id}")
	public Member delete(
					@PathVariable Long id) {

		Member member = service.delete(id);

		return member;
	}
	
	//비밀번호 찾기 후 새로운 비밀번호 설정
	@PutMapping(value = "email/{userEmail}", consumes = "application/json")	
	public Member passwordChange(
					@RequestBody Member member) {
		
		Member findNew = service.getListByEmail(member.getUserEmail());
		findNew.setUserPwd(member.getUserPwd());
		
		service.changePassword(findNew);
		
		return findNew;
	}
	
	//건강정보 수정
	@PutMapping(value = "{userId}", consumes = "application/json")
	public Member edit(
					@RequestBody Member member) {
		
		Member newOne = service.edit(member);
		System.out.println("변경완료");
		System.out.println(newOne);
		
		return newOne;
	}
	
	//회원정보 수정
	@PutMapping
	public Member edit(
					 HttpServletRequest request,
					 Member member,
					 MultipartFile imgFile) throws IllegalStateException, IOException {
		
		Long id = member.getId();
		Member findMember = service.getListById(id);

		String strPath = request.getServletContext().getRealPath("/image/member");
		File path = new File(strPath);
		if(!path.exists())
			path.mkdirs();
		
		if(imgFile != null) {
			File file = new File(strPath+File.separator+imgFile.getOriginalFilename());
			imgFile.transferTo(file);
			findMember.setUserImg(imgFile.getOriginalFilename());
		}
		
		findMember.setUserName(member.getUserName());
		
		Member newOne = service.edit(findMember);
		System.out.println("--구분자--");
		System.out.println(newOne);
		
		return newOne;
	}
	
	
}