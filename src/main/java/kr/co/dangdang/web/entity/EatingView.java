package kr.co.dangdang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EatingView {
	private Long id;
	private String regDate;
	private Long memberId;
	private Long productId;
	private String productName;
	private String productUnit;
	private Double productKcal;
	private Double sumKcal;
	private Integer sumPro;
	private Integer sumFat;
	private Integer sumCarb;
	private Double sumSugar;
	private Integer sumNa;
	private Integer sumChol;
	private Integer mealCategoryId;
	private Double etc;
}
