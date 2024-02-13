package kr.co.dangdang.web.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
	
	private Long id;
	private String userId;
	private String userPwd;
	private String userEmail;
	private String userName;
	private Date banDate;
	private Date regDate;
	private Integer userWeight;
	private Integer userHeight;
	private String userGender;
	private String userImg;
	private Integer userYear;
	private Integer userMonth;
	private Integer userDate;
	private Integer role;
	private Integer userStatus;
	private String provider;
	private String providerId;
	
}
