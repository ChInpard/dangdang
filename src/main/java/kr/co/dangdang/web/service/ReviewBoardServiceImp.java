package kr.co.dangdang.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.dangdang.web.entity.ReViewBoard;
import kr.co.dangdang.web.entity.ReViewBoardView;
import kr.co.dangdang.web.repository.ReviewBoardRepository;

@Service
public class ReviewBoardServiceImp implements ReviewBoardService {
   

	
   @Autowired
   private ReviewBoardRepository repository;

//   @Override
//   public List<ReViewBoardView> getViewList(Integer page, Long categoryId, String query) {
//      int size = 9;
//      int offset = size * (page-1);
//      return repository.findViewAll(offset, size, categoryId, query);
//      
//   }

   @Override
   public List<ReViewBoardView> getReviewBoardList() {
	   return repository.findAll();
   }
   
   @Override
   public List<ReViewBoardView> searchReviewBoardList(String keyword) {
       if (keyword != null && !keyword.trim().isEmpty()) {
           return repository.findByTitle(keyword);
       } else {
           return getReviewBoardList();
       }
   }
   
	@Override
	public ReViewBoard add(ReViewBoard reviewboard) {
		repository.save(reviewboard);
		ReViewBoard newOne = repository.last();
		return newOne;
	}
	
	@Override
	public ReViewBoard last() {
		// TODO Auto-generated method stub
		return null;
	}
	
    @Override
    public ReViewBoard findById(Long id) {
        return repository.findById(id);
    }
    


   }