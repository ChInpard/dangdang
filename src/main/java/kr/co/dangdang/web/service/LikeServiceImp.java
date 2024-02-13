package kr.co.dangdang.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.dangdang.web.entity.Like;
import kr.co.dangdang.web.repository.LikeRepository;

@Service
public class LikeServiceImp implements LikeService {

   @Autowired
   private LikeRepository repository;
   
   @Override
   public Like add(Like like) {
      
      System.out.println("productId: " + like.getProductId());
        System.out.println("memberId: " + like.getMemberId());
        
      repository.save(like);
      Like newOne = repository.last();
      
      return newOne;
   }

	 @Override
	 public boolean delete(Long memberId, Long productId) {
	 	// TODO Auto-generated method stub
	 	int rowCount = repository.delete(memberId, productId);
		
	 	if(rowCount == 1)
	 		return true;
		
	 	return false;
		
	 }
	
	@Override
    public boolean existsByMenuIdAndMemberId(Long productId, Long memberId) {
        return repository.countByProductIdAndMemberId(productId, memberId) > 0;
    }

	@Override
	public void addLike(Long productId, Long userId) {
		// TODO Auto-generated method stub
		
	}


}