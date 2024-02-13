package kr.co.dangdang.web.config.auth;

import java.util.Collection;
import java.util.Date;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import kr.co.dangdang.web.entity.Member;

public class DangdangUserDetails implements UserDetails {
	
	private Long id;
	private String userId;
	private String username;
	private String password;
	private String nickname;
	private String email;
	private Date regDate;
	private Integer userWeight;
	private Integer userHeight;
	private String userGender;
	private String userImg;
	private Integer userYear;
	private Integer userMonth;
	private Integer userDate;
	private Integer userStatus;

	private Collection<? extends GrantedAuthority> authorities;
	
	
	
	public Integer getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(Integer userStatus) {
		this.userStatus = userStatus;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public Integer getUserWeight() {
		return userWeight;
	}

	public void setUserWeight(Integer userWeight) {
		this.userWeight = userWeight;
	}

	public Integer getUserHeight() {
		return userHeight;
	}

	public void setUserHeight(Integer userHeight) {
		this.userHeight = userHeight;
	}

	public String getUserGender() {
		return userGender;
	}

	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}

	public String getUserImg() {
		return userImg;
	}

	public void setUserImg(String userImg) {
		this.userImg = userImg;
	}

	public Integer getUserYear() {
		return userYear;
	}

	public void setUserYear(Integer userYear) {
		this.userYear = userYear;
	}

	public Integer getUserMonth() {
		return userMonth;
	}

	public void setUserMonth(Integer userMonth) {
		this.userMonth = userMonth;
	}

	public Integer getUserDate() {
		return userDate;
	}

	public void setUserDate(Integer userDate) {
		this.userDate = userDate;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return userStatus == 1;
	}

}
