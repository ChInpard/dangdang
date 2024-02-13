package kr.co.dangdang.web.service;

import java.util.List;

import kr.co.dangdang.web.entity.BoardView;
import kr.co.dangdang.web.entity.Member;

public interface MemberService {
	Member reg(Member member);

	List<Member> getList();

	Member edit(Member member);

	Member getListById(Long id);

	Member getListByEmail(String userEmail);

	Member delete(Long id);

	Member changePassword(Member member);

	List<BoardView> getListViewById(Long id);
	
}