package kr.co.dangdang.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.dangdang.web.entity.BoardView;
import kr.co.dangdang.web.entity.Member;

@Mapper
public interface MemberRepository {
   int reg(Member member);

   Member last();

   List<Member> findAll();

   Member findByUserId(String userId);
   
   int edit(Member member);

   Member findById(Long id);

   Member findByEmail(String userEmail);

   int statusUpdate(Long id);

   List<BoardView> findListViewById(Long id);
   
   Member findMemberById(String userId);

}