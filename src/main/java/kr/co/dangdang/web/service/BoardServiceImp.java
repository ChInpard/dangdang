package kr.co.dangdang.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.dangdang.web.entity.Board;
import kr.co.dangdang.web.entity.BoardView;
import kr.co.dangdang.web.repository.BoardRepository;

@Service
public class BoardServiceImp implements BoardService {
	@Autowired
	private BoardRepository boardRepository;
	
//	@Autowired
//	private CategoryRepository categoryRepository;

	@Override
	public List<BoardView> getList() {
		return boardRepository.findAll();
	}
	
	@Override
	public List<BoardView> getPage(Map map) {
		// TODO Auto-generated method stub
		
		return boardRepository.findPage(map);
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return boardRepository.count();
	}

	@Override
	public BoardView read(Integer id) {
		// TODO Auto-generated method stub
		BoardView board = boardRepository.findById(id);
		
		return board;
	}
	
	@Override
	public void viewHit(Integer id) {
		// TODO Auto-generated method stub
		boardRepository.increaseViewCnt(id);
	}
	

	@Override
	public int remove(Integer id) {
		// TODO Auto-generated method stub
		return boardRepository.delete(id);
	}

	
	@Override
	public int write(Board board) {
		// TODO Auto-generated method stub
		return boardRepository.save(board);
	}

	@Override
	public int update(Board board) {
		// TODO Auto-generated method stub
		return boardRepository.modify(board);
	}

	@Override
	public BoardView getById(Integer id) {
		// TODO Auto-generated method stub
		return boardRepository.findById(id);
	}

	@Override
	public List<BoardView> searchBoardList(String title) {
		// TODO Auto-generated method stub
		return boardRepository.findByTitle(title);
	}


    @Override
    public List<BoardView> getRecentPosts() {
        return boardRepository.findRecentPosts();
    }
    
}
