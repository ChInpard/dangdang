package kr.co.dangdang.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.dangdang.web.config.auth.DangdangUserDetails;
import kr.co.dangdang.web.entity.Like;
import kr.co.dangdang.web.service.LikeService;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
   
   @Autowired
   private LikeService service;
   
   @GetMapping("{ids}") // /api/likes/2-menuid,3-memberid
   public Boolean delete(
         @PathVariable Long[] ids) {
      
      Long productId = ids[0];
      Long memberId = ids[1];
      
      boolean result = service.delete(productId, memberId);
      
      return result;
   }


    @PostMapping
   public Like reg(@RequestBody Like like) {
      
       // 현재 인증된 사용자의 Authentication 객체를 가져옴
       Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       
       // 현재 인증된 사용자의 세부 정보를 담고 있는 DangdangUserDetails 객체를 가져옴
       DangdangUserDetails userDetails = (DangdangUserDetails) authentication.getPrincipal();
       
       // userDetails 객체에서 memberId를 가져와서 Like 객체에 설정
       like.setMemberId(userDetails.getId());
       
       // Like 객체를 서비스에 전달하여 저장
       Like newOne = service.add(like);
       
       return newOne;
    }

   
}