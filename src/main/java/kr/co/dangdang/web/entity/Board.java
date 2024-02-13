package kr.co.dangdang.web.entity;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Board {
	private Long id;
	private String title;
	private String content;
	private Date regDate;
	private Integer hit;
	private String img;
	private Long memberId;
	private Long boardCategoryId;
}
