package kr.co.dangdang.web.controller.api;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.dangdang.web.entity.ReViewBoard;
import kr.co.dangdang.web.service.ReviewBoardService;

@RestController
@RequestMapping("/api/posts")
public class ReviewBoardController {

	
	  @Autowired private ReviewBoardService reviewboardservice; 

	  @PostMapping
	  public ResponseEntity<?> reg(
			  			ReViewBoard reviewboard, 
	  					MultipartFile imgFile, // 이미지 파일을 받기 위함
	  					HttpServletRequest request ) throws Exception, IOException {
	  
		    if (imgFile != null && !imgFile.isEmpty()) {
		        // 이미지 저장 로직 
		        System.out.println("저장전 :" + imgFile.getOriginalFilename());
		        String strPath = request.getServletContext().getRealPath("/image/posts"); 
		        File path = new File(strPath); 
		        if (!path.exists()) 
		            path.mkdirs(); 
		        File file = new File(strPath + File.separator + imgFile.getOriginalFilename());
		        imgFile.transferTo(file);
		        reviewboard.setImg(imgFile.getOriginalFilename());
		        System.out.println("저장후 :" + reviewboard.getImg());
		    } else {

		        reviewboard.setImg(null); 
		    }
			  System.out.println(reviewboard);
			  
			  ReViewBoard newOne = reviewboardservice.add(reviewboard);
		
		      return ResponseEntity.ok().body("/user/board/reviewindex");
	  }
}
