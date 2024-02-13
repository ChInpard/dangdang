package kr.co.dangdang.web.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.ui.Model;

import kr.co.dangdang.web.entity.Like;

@Mapper
public interface LikeRepository {

	void save(Like like);

	Like last();

	int delete(Long productId, Long memberId);

	 // 특정 사용자가 특정 상품에 '좋아요'를 눌렀는지 확인하는 메소드
    int countByProductIdAndMemberId(@Param("productId") Long productId, @Param("memberId") Long memberId);
	
	String addLike(Like like,Model model);


	Like findByProductIdAndMemberId(Long productId, Long memberId);
}
