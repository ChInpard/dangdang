package kr.co.dangdang.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import kr.co.dangdang.web.entity.BoardView;
import kr.co.dangdang.web.service.BoardService;


@Controller // 이 어노테이션을 추가합니다.
public class RecentPostsController { // 클래스 이름은 대문자로 시작하는 것이 관례입니다.
	
    @Autowired
    private BoardService boardService;

    @GetMapping("/index")
    public String index(Model model) {
        List<BoardView> recentPosts = boardService.getRecentPosts();
        model.addAttribute("list", recentPosts);
        return "index"; 
    }
}