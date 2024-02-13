package kr.co.dangdang.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.dangdang.web.entity.ReViewBoard;
import kr.co.dangdang.web.entity.ReViewBoardView;

@Mapper
public interface ReviewBoardRepository {
   

	List<ReViewBoardView> findAll();
	//List<ReViewBoardView> findViewAll(int offset, int size, Long categoryId, String query);

    void save(ReViewBoard reviewboard);

	ReViewBoard last();
	
	List<ReViewBoardView> findByTitle(String title);

	ReViewBoard findById(Long id);
   
   }