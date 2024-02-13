package kr.co.dangdang.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.dangdang.web.domain.PageHandler;
import kr.co.dangdang.web.entity.Board;
import kr.co.dangdang.web.entity.BoardView;
import kr.co.dangdang.web.service.BoardService;
import kr.co.dangdang.web.service.ReplyService;

@Controller
@RequestMapping("/member")
public class BoardController {

	@Autowired
	private BoardService boardService;
	
	@Autowired
	private ReplyService replyService; // ReplyService를 주입해야 합니다.

	@GetMapping("/board/free-search")
	public String search(@RequestParam String title, Model model) {
		List<BoardView> searchResults = boardService.searchBoardList(title);
		System.out.println("===========searchResults=======" + searchResults);
		model.addAttribute("list", searchResults);
		return "member/board/free-list";
	}

	@GetMapping("board/update")
	public String update(Integer id, Integer page, Integer pageSize, Model model) {
		// 세션에서 아이디 불러서 board에 넣기
		
		BoardView board = boardService.getById(id);
		
		System.out.println("====== board ====" + board);
		System.out.println("===== page =====" + page);
		System.out.println("===== pageSize =====" + pageSize);
		
	    model.addAttribute("page", page);
	    model.addAttribute("pageSize", pageSize);
		model.addAttribute("board", board);


		return "member/board/free-rewrite";
	}

	@PostMapping("board/update")
	public String update(Board board) {

		boardService.update(board);

		return "redirect:list";
	}

	@GetMapping("board/write")
	public String write(Integer page, Integer pageSize, Model model) {
		int totalCnt = boardService.getCount();
		PageHandler pageHandler = new PageHandler(totalCnt, page, pageSize);

		Map map = new HashMap();
		map.put("offset", (page - 1) * pageSize);
		map.put("pageSize", pageSize);

//		List<BoardView> list = boardService.getPage(map);

//		System.out.println("==========list========="+list);
//		model.addAttribute("list", list);
//		model.addAttribute("ph", pageHandler);
		model.addAttribute("page", page);
		model.addAttribute("pageSize", pageSize);

		return "member/board/free-write";
	}
	
	@GetMapping("board/list")
	public String list(Integer page, Integer pageSize, Model model) {

	    if (page == null)
	        page = 1;
	    if (pageSize == null)
	        pageSize = 10;

	    try {

	        int totalCnt = boardService.getCount();
	        PageHandler pageHandler = new PageHandler(totalCnt, page, pageSize);

	        Map<String, Object> map = new HashMap<>(); // 변경된 부분: 타입을 명확하게 선언
	        map.put("offset", (page - 1) * pageSize);
	        map.put("pageSize", pageSize);

	        List<BoardView> list = boardService.getPage(map);
	        Map<Long, Integer> commentCountMap = new HashMap<>(); // 게시물 ID와 댓글 수를 매핑할 Map

	        // 댓글 수를 가져와서 Map에 저장
	        for (BoardView boardView : list) {
	            int commentCount = replyService.getTotalCnt(boardView.getId().intValue());
	            commentCountMap.put(boardView.getId(), commentCount);
	        }
	        
	        // 모델에 댓글 수 Map 추가
	        model.addAttribute("commentCounts", commentCountMap);
	        model.addAttribute("list", list);
	        model.addAttribute("ph", pageHandler);
	        model.addAttribute("page", page);
	        model.addAttribute("pageSize", pageSize);

	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    return "member/board/free-list"; // 변경된 부분: "/" 제거
	}


	@GetMapping("board/delete")
	public String remove(Integer id) {
		
		boardService.remove(id);
			
		return "redirect:/member/board/list";
	}
	
}
