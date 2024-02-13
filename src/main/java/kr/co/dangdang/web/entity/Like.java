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
public class Like {
	
	private Long memberId;
	private Long productId;
	private Date regDate; 
}
