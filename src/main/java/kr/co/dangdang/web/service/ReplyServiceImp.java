package kr.co.dangdang.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.dangdang.web.entity.Reply;
import kr.co.dangdang.web.entity.ReplyView;
import kr.co.dangdang.web.repository.ReplyRepository;

@Service
public class ReplyServiceImp implements ReplyService {
	
	@Autowired
	private ReplyRepository replyRepository;

	@Override
	public List<Reply> getRepliesByReviewBoardId(Long reviewBoardId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Reply addReply(Reply reply) {
		replyRepository.addReply(reply);
		
		return reply;
	}

	@Override
	public List<ReplyView> getListById(Integer id) {
		// TODO Auto-generated method stub
		return replyRepository.findReplyById(id);
	}

	@Override
	public int getTotalCnt(Integer id) {
		// TODO Auto-generated method stub
		return replyRepository.findCnt(id);
	}

}