package kr.co.dangdang.web.controller.api;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.dangdang.web.entity.Board;
import kr.co.dangdang.web.entity.BoardView;
import kr.co.dangdang.web.service.BoardService;

@RestController("boardApiController")
@RequestMapping("/api/boards")
public class BoardController {

	@Autowired private BoardService boardService; 

	@PostMapping
	public ResponseEntity<?> reg(Board board, MultipartFile imgFile, HttpServletRequest request) throws Exception, IOException {
	    // 이미지 파일이 없거나 비어 있는 경우 기본 이미지로 설정
	    if (imgFile == null || imgFile.isEmpty()) {
	        board.setImg("default.png");
	    } else {
	        // 이미지 저장 로직
	        System.out.println("저장전 :" + imgFile.getOriginalFilename());
	        String strPath = request.getServletContext().getRealPath("/image/posts");
	        File path = new File(strPath);
	        if (!path.exists())
	            path.mkdirs();
	        File file = new File(strPath + File.separator + imgFile.getOriginalFilename());
	        imgFile.transferTo(file);
	        board.setImg(imgFile.getOriginalFilename());
	        System.out.println("저장후 :" + board.getImg());
	    }
	    System.out.println(board);
	    int newOne = boardService.write(board);
	    return ResponseEntity.ok().body("/user/board/list");
	}
	  
}
