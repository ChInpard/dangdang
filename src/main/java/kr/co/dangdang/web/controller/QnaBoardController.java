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

@Controller
@RequestMapping("/member")
public class QnaBoardController {

	@Autowired
	private BoardService boardService;


	/*
	 * @GetMapping("board/qnaupdate") public String update(Integer id, Integer page,
	 * Integer pageSize, Model model) { // 세션에서 아이디 불러서 board에 넣기
	 * 
	 * BoardView board = boardService.getById(id);
	 * 
	 * System.out.println("====== board ====" + board);
	 * System.out.println("===== page =====" + page);
	 * System.out.println("===== pageSize =====" + pageSize);
	 * 
	 * model.addAttribute("page", page); model.addAttribute("pageSize", pageSize);
	 * model.addAttribute("board", board);
	 * 
	 * 
	 * return "member/board/qna-rewrite"; }
	 * 
	 * @PostMapping("board/update") public String update(Board board) {
	 * 
	 * boardService.update(board);
	 * 
	 * return "redirect:list"; }
	 * 
	 * @GetMapping("board/write") public String write(Integer page, Integer
	 * pageSize, Model model) { int totalCnt = boardService.getCount(); PageHandler
	 * pageHandler = new PageHandler(totalCnt, page, pageSize);
	 * 
	 * Map map = new HashMap(); map.put("offset", (page - 1) * pageSize);
	 * map.put("pageSize", pageSize);
	 * 
	 * // List<BoardView> list = boardService.getPage(map);
	 * 
	 * // System.out.println("==========list========="+list); //
	 * model.addAttribute("list", list); // model.addAttribute("ph", pageHandler);
	 * model.addAttribute("page", page); model.addAttribute("pageSize", pageSize);
	 * 
	 * return "member/board/free-write"; }
	 */

	@GetMapping("board/qna-list")
	public String list(Integer page, Integer pageSize, Model model) {

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
			System.out.println("================== 멤버아이디======" + list);
			model.addAttribute("list", list);
			model.addAttribute("ph", pageHandler);
			model.addAttribute("page", page);
			model.addAttribute("pageSize", pageSize);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "/member/board/qna-list";
	}


//	@GetMapping("board/delete")
//	public String remove(Integer id) {
//		// 회원 정보와 페이지 정보를 어떻게 넘겨줄 것 인가?
//		boardService.remove(id);
//			
//		return "redirect:/member/qnaboard/list";
//	}
//	
	
}
