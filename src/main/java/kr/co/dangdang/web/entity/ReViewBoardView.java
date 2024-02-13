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
public class ReViewBoardView {
	   private Long id;
	   private String title;
	   private String content;
	   private String img;
	   private Date reg_date;
	   private Long hit;
	   private Long board_category_id;
	   private Long memberId;
}

