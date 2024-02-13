package kr.co.dangdang.web.service;

import kr.co.dangdang.web.entity.Like;

public interface LikeService {

	Like add(Like like);
	
    // 특정 사용자가 특정 상품에 '좋아요'를 눌렀는지 확인하는 메소드
    boolean existsByMenuIdAndMemberId(Long productId, Long memberId);

	boolean delete(Long memberId, Long productId);

	void addLike(Long productId, Long userId);

}
