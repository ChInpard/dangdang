package kr.co.dangdang.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.dangdang.web.entity.BoardView;
import kr.co.dangdang.web.entity.Member;
import kr.co.dangdang.web.repository.MemberRepository;

@Service
public class MemberServiceImp implements MemberService {

	@Autowired
	private MemberRepository repository;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public Member reg(Member member) {
		String encodedPwd = encoder.encode(member.getUserPwd());
		member.setUserPwd(encodedPwd);
		
		repository.reg(member);
		Member newOne = repository.last();
		
		return newOne;
	}

	@Override
	public Member changePassword(Member member) {
		System.out.println("인코딩전 :" + member.getUserPwd());
		String encodedPwd = encoder.encode(member.getUserPwd());
		
		System.out.println("인코딩후 :" + encodedPwd);
		
		Member newOne = Member.builder()
								.userPwd(encodedPwd)
								.userId(member.getUserId())
								.build();
		
		repository.edit(newOne);
		
		return newOne;
	}

	@Override
	public List<Member> getList() {
		List<Member> member = repository.findAll();
		
		return member;
	}

	@Override
	public Member edit(Member member) {
		repository.edit(member);
		Member newOne = repository.findByUserId(member.getUserId());
		
		return newOne;
	}

	@Override
	public Member getListById(Long id) {
		Member member = repository.findById(id);

		return member;
	}

	@Override
	public Member getListByEmail(String userEmail) {
		Member member = repository.findByEmail(userEmail);
		
		return member;
	}

	@Override
	public Member delete(Long id) {
		repository.statusUpdate(id);
		Member mStatus = repository.findById(id);
		
		return mStatus;
	}

	@Override
	public List<BoardView> getListViewById(Long id) {

		List<BoardView> list = repository.findListViewById(id);

		return list;
	}

}
