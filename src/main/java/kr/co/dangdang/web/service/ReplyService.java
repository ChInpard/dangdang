package kr.co.dangdang.web.service;

import java.util.List;

import kr.co.dangdang.web.entity.Reply;
import kr.co.dangdang.web.entity.ReplyView;

public interface ReplyService {

    List<Reply> getRepliesByReviewBoardId(Long reviewBoardId);
    
    Reply addReply(Reply reply);

	List<ReplyView> getListById(Integer id);

	int getTotalCnt(Integer id);
}