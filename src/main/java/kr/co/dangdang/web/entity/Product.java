package kr.co.dangdang.web.entity;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
	private Long id;
	private String name;
	private String manufacturer;
	private String category;
	private Integer servingSize;
	private String unit;
	private Integer amountG;
	private Integer amountMl;
	private Double kcal;
	private Integer pro;
	private Integer fat;
	private Integer carb;
	private Double sugar;
	private Integer na;
	private Integer chol;
}
