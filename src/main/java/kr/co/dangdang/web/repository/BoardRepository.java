package kr.co.dangdang.web.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.dangdang.web.entity.Board;
import kr.co.dangdang.web.entity.BoardView;

@Mapper
public interface BoardRepository {
	List<BoardView> findAll();
	
	BoardView findById(Integer id);
	
	Board findByName(String name);
	
	List<BoardView> findPage(Map map);
	
	int count();
	
	int delete(Integer id);
	
	int save(Board board);
	
	int increaseViewCnt(Integer id);
	
	int modify(Board board);
	
	List<BoardView> findByTitle(String title);

	List<BoardView> findRecentPosts();

}
