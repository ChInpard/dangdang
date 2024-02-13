package kr.co.dangdang.web.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ReplyView {
	private Integer id;
	private String content;
	private Date regDate;
	private Long boardId;
	private String userName;
	private String userImg;
	private Long memberId;
}