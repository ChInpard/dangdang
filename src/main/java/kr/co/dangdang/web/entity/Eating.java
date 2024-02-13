package kr.co.dangdang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Eating {
	private Long id;
	private String regDate;
	private Long memberId;
	private Long productId;
	private Integer mealCategoryId;
}

