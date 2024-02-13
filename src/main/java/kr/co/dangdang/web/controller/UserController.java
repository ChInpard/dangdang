package kr.co.dangdang.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.dangdang.web.domain.PageHandler;
import kr.co.dangdang.web.entity.BoardView;
import kr.co.dangdang.web.entity.ReplyView;
import kr.co.dangdang.web.service.BoardService;
import kr.co.dangdang.web.service.ReplyService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private BoardService boardService;

	@Autowired
	private ReplyService replyService;

	@GetMapping("login")
	public String login() {

		return "user/login";
	}

	@GetMapping("sign-up")
	public String signup() {

		return "user/sign-up";
	}

	@GetMapping("findIdPwd")
	public String findIdPwd() {

		return "user/findIdPwd";
	}

	@GetMapping("findPwd")
	public String findPwd() {

		return "user/findPwd";
	}
	
	@GetMapping("newpwd")
	public String newpwd() {
		
		return "user/newpwd";
	}

	@GetMapping("board/list")
	public String list(Integer page, Integer pageSize, Model model, HttpServletRequest request) {

	    if (page == null)
	        page = 1;
	    if (pageSize == null)
	        pageSize = 10;

	    try {
	        int totalCnt = boardService.getCount();
	        PageHandler pageHandler = new PageHandler(totalCnt, page, pageSize);

	        Map map = new HashMap();
	        map.put("offset", (page - 1) * pageSize);
	        map.put("pageSize", pageSize);

	        List<BoardView> list = boardService.getPage(map);
	        Map<Long, Integer> commentCountMap = new HashMap<>(); // 게시물 ID와 댓글 수를 매핑할 Map

	        for (BoardView boardView : list) {
	            int commentCount = replyService.getTotalCnt(boardView.getId().intValue()); // 댓글 수 조회
	            commentCountMap.put(boardView.getId(), commentCount); // Map에 추가
	        }
	        
	        model.addAttribute("list", list);
	        model.addAttribute("commentCounts", commentCountMap); // 댓글 수 Map을 모델에 추가
	        model.addAttribute("ph", pageHandler);
	        model.addAttribute("page", page);
	        model.addAttribute("pageSize", pageSize);

	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    return "user/board/free-list";
	}


	@GetMapping("board/detail")
	public String read(Integer id, Integer page, Integer pageSize, Model model) {
		boardService.viewHit(id);
		
		BoardView board = boardService.read(id);
		
		List<ReplyView> reply = replyService.getListById(id);
		
		int replyCnt = replyService.getTotalCnt(id);
		
		model.addAttribute("replyCnt", replyCnt);
		model.addAttribute("reply", reply);
		model.addAttribute("board", board);
		model.addAttribute("page", page);
		model.addAttribute("pageSize", pageSize);

		return "user/board/free-detail";
	}

	@GetMapping("/board/free-search")
	public String search(@RequestParam String title, Model model) {
		List<BoardView> searchResults = boardService.searchBoardList(title);
        Map<Long, Integer> commentCountMap = new HashMap<>(); // 게시물 ID와 댓글 수를 매핑할 Map

        for (BoardView boardView : searchResults) {
            int commentCount = replyService.getTotalCnt(boardView.getId().intValue()); // 댓글 수 조회
            commentCountMap.put(boardView.getId(), commentCount); // Map에 추가
        }
		
        model.addAttribute("commentCounts", commentCountMap);
		model.addAttribute("list", searchResults);
		return "user/board/free-list";
	}
}