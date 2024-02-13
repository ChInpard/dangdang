package kr.co.dangdang.web.service;

import kr.co.dangdang.web.entity.Email;

public interface EmailSendService {

	Email createMail(String userEmail);

	void mailSend(Email email);

	String getTempKey();

}
