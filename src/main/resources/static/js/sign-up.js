import Modal from '/js/lib/m-modal.js'

window.addEventListener("load", function () {
    let signUpBox = this.document.querySelector(".sign_up-box")
    let signForm = signUpBox.querySelector("form")
    let inputBoxs = signUpBox.querySelectorAll("input")
    let idInput = signUpBox.querySelector(".id-input")
    let nicknameInput = signUpBox.querySelector(".sign_up-data .nickname-input")
    let emailInput = signUpBox.querySelector(".email-input")
    let pwdInput = signUpBox.querySelector(".pwd-input")
    let pwdCheckInput = signUpBox.querySelector(".pwd-check-input")
    let pwdCheck = signUpBox.querySelector(".pwd-check")
    let success = signUpBox.querySelectorAll(".successText")
    let error = signUpBox.querySelectorAll(".errorText")
    let submitBtn = signUpBox.querySelector("input[type=submit]")
    
    async function data(){
        let response = await fetch(`/api/members`)
        let json = await response.json()

        return json
    }

    inputBoxs[0].onchange = async function () {
        let memberList = await data()

		if (idInput.value !== "") {
		    idInput.classList.remove("error")
		    idInput.classList.remove("success")
		    error[0].style.display = "none"
		    success[0].style.display = "none"
		    
		    // 사용자가 입력한 아이디가 이미 가입된 아이디인 경우
		    if (memberList.find((m) => idInput.value == m.userId)) {
		        idInput.classList.add("error")
		        error[0].style.display = "block"
	            error[0].innerHTML = "중복된 아이디입니다";
		        submitBtn.disabled = true;
		
		        // 만약 해당 아이디가 탈퇴 회원인 경우
		        const isWithdrawnMember = memberList.find((m) => m.userId === idInput.value && m.userStatus === 0);
		        if (isWithdrawnMember) {
		            error[0].innerHTML = "사용할 수 없는 아이디입니다";
		        }
		    } else {
		        // 아이디가 존재하지 않는 경우
		        idInput.classList.add("success")
		        success[0].style.display = "block"
		        submitBtn.disabled = false;
		    }
		} else {
		    // 아이디 입력이 없을 경우
		    idInput.classList.remove("error")
		    idInput.classList.remove("success")
		    error[0].style.display = "none"
		    success[0].style.display = "none"
		}
    }

    inputBoxs[1].onchange = async function () {
        let memberList = await data()

        if (memberList.find((m) => nicknameInput.value == m.userName)) {
            nicknameInput.classList.add("error")
            nicknameInput.classList.remove("success")
            error[1].style.display = "block"
            success[1].style.display = "none"
            submitBtn.disabled = true;
        } else if (memberList.find((m) => nicknameInput.value != m.userName)) {
            nicknameInput.classList.add("success")
            nicknameInput.classList.remove("error")
            error[1].style.display = "none"
            success[1].style.display = "block"
            submitBtn.disabled = false;
        }
        if (nicknameInput.value === "") {
            nicknameInput.classList.remove("error")
            nicknameInput.classList.remove("success")
            error[1].style.display = "none"
            success[1].style.display = "none"
        }
    }

    inputBoxs[2].onchange = async function () {
        let memberList = await data()
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        if (memberList.find((m) => emailInput.value == m.userEmail)) {
            emailInput.classList.add("error")
            emailInput.classList.remove("success")
            error[2].innerHTML = "이미 사용중인 이메일주소 입니다"
            error[2].style.display = "block"
            success[2].style.display = "none"
            submitBtn.disabled = true;
        } else if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add("error")
            emailInput.classList.remove("success")
            error[2].innerHTML = "지원되지 않는 이메일 형식입니다"
            error[2].style.display = "block"
            success[2].style.display = "none"
            submitBtn.disabled = true;
        } else {
            emailInput.classList.add("success")
            emailInput.classList.remove("error")
            error[2].style.display = "none"
            success[2].style.display = "block"
            submitBtn.disabled = false;
        }
        if (emailInput.value === "") {
            emailInput.classList.remove("error")
            emailInput.classList.remove("success")
            error[2].style.display = "none"
            success[2].style.display = "none"
            submitBtn.disabled = false;
        }
    }

    inputBoxs[3].onchange = function () {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\(\)#^])[A-Za-z\d@$!%*?&\(\)#^]{8,}$/;

        if (!passwordPattern.test(pwdInput.value)) {
            pwdInput.classList.add("error")
            pwdInput.classList.remove("success")
            error[3].style.display = "block"
            success[3].style.display = "none"
            submitBtn.disabled = true;
        } else {
            pwdInput.classList.add("success")
            pwdInput.classList.remove("error")
            error[3].style.display = "none"
            success[3].style.display = "block"
            submitBtn.disabled = false;
        }
        if (pwdInput.value === "") {
            pwdInput.classList.remove("error")
            pwdInput.classList.remove("success")
            error[3].style.display = "none"
            success[3].style.display = "none"
            submitBtn.disabled = false;
        }
    }

    inputBoxs[4].onchange = function () {
        if (pwdInput.value != pwdCheck.value) {
            pwdCheckInput.classList.add("error")
            pwdCheckInput.classList.remove("success")
            error[4].style.display = "block"
            success[4].style.display = "none"
            submitBtn.disabled = true;
        } else {
            pwdCheckInput.classList.add("success")
            pwdCheckInput.classList.remove("error")
            error[4].style.display = "none"
            success[4].style.display = "block"
            submitBtn.disabled = false;
        }
        if (pwdCheck.value === "") {
            pwdCheckInput.classList.remove("error")
            pwdCheckInput.classList.remove("success")
            error[4].style.display = "none"
            success[4].style.display = "none"
            submitBtn.disabled = false;
        }
    }
    
    signForm.addEventListener("submit", async (e) => {
		e.preventDefault()
		
		let userId = idInput.value
		let userName = nicknameInput.value
		let userEmail = emailInput.value
		let userPwd = pwdInput.value
		
		console.log(userId)
		console.log(userName)
		console.log(userEmail)
		console.log(userPwd)
		
		let formData = new FormData()
		formData.append("user-id", userId)
		formData.append("user-name", userName)
		formData.append("user-email", userEmail)
		formData.append("user-pwd", userPwd)
		
		let response = await fetch ('/api/users', {
			method: "POST",
			body: formData
		})
		
		if(response.ok) {
			let modal = new Modal({
				content: ""
			})
			
			modal.show()
			return
		}

		
	})

});