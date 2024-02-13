package kr.co.dangdang.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.dangdang.web.entity.ReViewBoard;
import kr.co.dangdang.web.entity.ReViewBoardView;
import kr.co.dangdang.web.entity.Reply;
import kr.co.dangdang.web.service.ReplyService;
import kr.co.dangdang.web.service.ReviewBoardService;

	@Controller
	@RequestMapping("/user")
	public class ReViewController {

	@Autowired
	private ReviewBoardService reviewBoardService;
	
    @Autowired
    private ReplyService replyService;
		
	@GetMapping("board/reviewindex")
	public String reviewboard(Model model) {
		model.addAttribute("reviewList",reviewBoardService.getReviewBoardList());
		return "user/board/reviewindex";  
	}
	
    @GetMapping("/board/search")
    public String search(@RequestParam String title, Model model) {
        List<ReViewBoardView> searchResults = reviewBoardService.searchReviewBoardList(title);

        System.out.println("==========searchResults======" + searchResults );

        model.addAttribute("reviewList", searchResults);
        return "user/board/reviewindex"; 
    }
	
	/*
	 * @GetMapping("board/postdetail/{id}") public String postdetail(
	 * 
	 * @PathVariable Long id, Model model) { return "user/board/postdetail"; }
	 */
    
    @GetMapping("board/list/{id}")
    public String postdetail(@PathVariable Long id, Model model) {
        ReViewBoard reviewBoard = reviewBoardService.findById(id);
        List<Reply> replies = replyService.getRepliesByReviewBoardId(id);
        
        // 댓글 수를 가져와서 모델에 추가
        int totalCommentCount = replyService.getTotalCnt(id.intValue());
        
        model.addAttribute("reviewBoard", reviewBoard);
        model.addAttribute("replies", replies);
        model.addAttribute("commentCount", totalCommentCount); 
        
        return "user/board/list";
    }

    
    @PostMapping("/reply/add")
    @ResponseBody
    public String addReply(@RequestBody Reply reply) {
        try {
            // 댓글을 데이터베이스에 저장합니다.
            replyService.addReply(reply);
            return "댓글이 등록되었습니다.";
        } catch (Exception e) {
            return "댓글 등록에 실패했습니다.";
        }
    

    }
}