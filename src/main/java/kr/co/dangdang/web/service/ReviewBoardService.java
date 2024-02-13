package kr.co.dangdang.web.service;

import java.util.List;

import kr.co.dangdang.web.entity.ReViewBoard;
import kr.co.dangdang.web.entity.ReViewBoardView;

public interface ReviewBoardService {

	List<ReViewBoardView> getReviewBoardList();

//	List<ReViewBoardView> getViewList(Integer page, Long categoryId, String query);
	
    List<ReViewBoardView> searchReviewBoardList(String keyword); //검색 메소드

	ReViewBoard add(ReViewBoard reviewboard);

	ReViewBoard last();

	ReViewBoard findById(Long id);

}