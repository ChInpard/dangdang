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
public class BoardView {
	
	private Long id;
	private String title;
	private String content;
	private Date regDate;
	private Integer hit;
	private String img;
	private String userId;
	private String userImg;
	private String userName;
	private Long memberId;
	private Long boardCategoryId;
	private Long replyId;
}
