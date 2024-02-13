package kr.co.dangdang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductView {
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
    private Integer likeCount;
    private Boolean isLike;


	//각 필드에 대한 getter와 setter 메소드
	public Long getId() {
	    return id;
	}
	
	public void setId(Long id) {
	    this.id = id;
	}
	
	public String getName() {
	    return name;
	}
	
	public void setName(String name) {
	    this.name = name;
	}
	
	public boolean getIsLike() {
	    return isLike;
	}
	
	public void setIsLike(boolean isLike) {
	    this.isLike = isLike;
	}
}