package kr.co.dangdang.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.dangdang.web.entity.Reply;
import kr.co.dangdang.web.entity.ReplyView;

@Mapper
public interface ReplyRepository {
   
    List<Reply> getRepliesByReviewBoardId(Long reviewBoardId); 
    
    int addReply(Reply reply); 

    List<ReplyView> findReplyById(Integer id);

	Reply last(); 
	
	int findCnt(Integer id);
}