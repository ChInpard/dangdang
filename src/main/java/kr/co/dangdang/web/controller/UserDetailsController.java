package kr.co.dangdang.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.dangdang.web.config.auth.DangdangUserDetails;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
public class UserDetailsController {

    @GetMapping("/api/user/details")
    public DangdangUserDetails getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof DangdangUserDetails) {
            return (DangdangUserDetails) authentication.getPrincipal();
        }
        // 인증된 사용자가 없으면 null이나 예외를 반환할 수 있습니다.
        return null; // or throw new UsernameNotFoundException("User not found");
    }
}
