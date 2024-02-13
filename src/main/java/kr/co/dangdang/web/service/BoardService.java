package kr.co.dangdang.web.service;

import java.util.List;
import java.util.Map;

import kr.co.dangdang.web.entity.Board;
import kr.co.dangdang.web.entity.BoardView;

public interface BoardService {
	int update(Board board);
	
	List<BoardView> getList();
	
	List<BoardView> getPage(Map map);
	
	BoardView getById(Integer id);
	
	int getCount();
	
	BoardView read(Integer id);
	
	int remove(Integer id);
	
	int write(Board board);
	
	void viewHit(Integer id);

	List<BoardView> searchBoardList(String title);

    List<BoardView> getRecentPosts();
    
}
