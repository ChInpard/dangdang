window.addEventListener("load", async function () {
	let result = localStorage.getItem("email")
	let error = document.querySelector(".errorBox .check")
	let patternError = document.querySelector(".errorBox .pattern")
    let submitBtn = document.querySelector(".btn-choice")
    let password = document.querySelector("input[name=user-pwd]")
    let checkPwd = document.querySelector("#pwd-check")
    let cancelBtn = document.querySelector(".btn-cancel")
    
	password.oninput = function () {
		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\(\)#^])[A-Za-z\d@$!%*?&\(\)#^]{8,}$/;
	
		if (!passwordPattern.test(password.value)) {
		    patternError.style.display = "block";
		    error.style.display = "none"; // 비밀번호 일치 에러 숨기기
		    submitBtn.disabled = true;
		} else {
		    patternError.style.display = "none";
		    checkPasswordMatch();
		}
	};
	
	checkPwd.onchange = function () {
		checkPasswordMatch();
	};
	
	function checkPasswordMatch() {
		const passwordValue = password.value;
		const checkPwdValue = checkPwd.value;
	
		if (passwordValue === checkPwdValue) {
		error.style.display = "none";
	    submitBtn.disabled = false;
	    } else if (!(passwordValue === checkPwdValue)) {
	    error.style.display = "block";
	    submitBtn.disabled = true;
		} else {
	    error.style.display = "none";
	    submitBtn.disabled = false;
	    }
	}
	
	submitBtn.onclick = async function(e){
		e.preventDefault()
		let userPwd = password.value
		let userEmail = result
		
		let response = await fetch (`/api/members/email/${userEmail}` , {
			method: "PUT",
			headers:{
					'content-type': 'application/json'
				},
				body: JSON.stringify({"userPwd": userPwd,
									"userEmail" : userEmail})
			})
			
		if(response.ok){
			alert("수정이 완료되었습니다 다시 로그인해주세요")
			window.location.href = "/user/login"
		}
		
	}
	
	cancelBtn.onclick = function(e){
		e.preventDefault()
		window.location.href = "/index"
	}
		
})