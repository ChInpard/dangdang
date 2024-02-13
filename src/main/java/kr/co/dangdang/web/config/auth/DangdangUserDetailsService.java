package kr.co.dangdang.web.config.auth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.dangdang.web.entity.Member;
import kr.co.dangdang.web.repository.MemberRepository;

@Service
public class DangdangUserDetailsService implements UserDetailsService {
	
	@Autowired
	private MemberRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Member member = repository.findByUserId(username);
		DangdangUserDetails userDetails = new DangdangUserDetails();

		userDetails.setUsername(username);
		userDetails.setId(member.getId());
		userDetails.setUserId(member.getUserId());
		userDetails.setPassword(member.getUserPwd());
		userDetails.setEmail(member.getUserEmail());
		userDetails.setNickname(member.getUserName());
		userDetails.setUserImg(member.getUserImg());
		userDetails.setRegDate(member.getRegDate());
		userDetails.setUserWeight(member.getUserWeight());
		userDetails.setUserHeight(member.getUserHeight());
		userDetails.setUserGender(member.getUserGender());
		userDetails.setUserYear(member.getUserYear());
		userDetails.setUserMonth(member.getUserMonth());
		userDetails.setUserDate(member.getUserDate());
		userDetails.setUserStatus(member.getUserStatus());
		System.out.println(member);

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));
		authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		
		userDetails.setAuthorities(authorities);
		
		return userDetails;
	}

}
