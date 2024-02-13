package kr.co.dangdang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MealCategoryView {
	private Integer id;
	private String name;
	private String eatingDate;
	private Long memberId;
	private Double sumKcal;
	
}
