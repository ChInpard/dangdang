package kr.co.dangdang.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.dangdang.web.entity.Reply;
import kr.co.dangdang.web.service.ReplyService;

@RestController
@RequestMapping("/api/replies")
public class ReplyController {
	
	@Autowired
	private ReplyService replyService;
    
	@PostMapping
	public String reg(
			@RequestBody Reply reply) {
		
		
		System.out.println(reply.getContent());
		System.out.println(reply.getMemberId());
		System.out.println(reply.getBoardId());
		
		System.out.println(reply);
		replyService.addReply(reply);
		
		return "redirect";
	}
}