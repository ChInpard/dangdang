package kr.co.dangdang.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import kr.co.dangdang.web.entity.Email;

@Service
public class EmailSendServiceImp implements EmailSendService {
	
	@Autowired
	private JavaMailSender mailSender;

	@Override
	public Email createMail(String userEmail) {
		String key = getTempKey();
		
		Email email = new Email();
		email.setAddress(userEmail);
		email.setTitle("비밀번호 찾기 이메일 인증 메일");
		email.setMessage("안녕하세요. 비밀번호찾기 관련 이메일 입니다. 인증번호는 "
		        + key + " 입니다.");

		return email;
	}

	public String getTempKey() {
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String key = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            key += charSet[idx];
        }
        return key;
	}

	@Override
	public void mailSend(Email email) {
		System.out.println("이메일 전송 완료!");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email.getAddress());
        message.setFrom("dangdang231110@gmail.com");
        message.setSubject(email.getTitle());
        message.setText(email.getMessage());
        System.out.println(message);

        mailSender.send(message);
		
	}


}
