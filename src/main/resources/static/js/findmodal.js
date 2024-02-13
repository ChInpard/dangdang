window.addEventListener("load", function () {
	let findIdForm = document.querySelector(".find-id");
	let findIdBtn = findIdForm.querySelector(".btn-find")
	let modal = document.querySelector(".modal");
	let errorModal = document.querySelector(".error-modal");
	let findPwdBtn = document.querySelector(".pwd")
	let loginBtn = modal.querySelector(".btn-request")
	let signupBtn = errorModal.querySelector(".signup")
	
	findIdBtn.onclick = async (e) => {
		e.preventDefault();
		let userEmail = findIdForm.querySelector("input[name=user-email]").value
		let modalUserId = modal.querySelector(".user-id span")

		try {
			let response = await this.fetch(`/api/members/email?email=${userEmail}`)
			let member = await response.json()
			
			if(member){
				modal.classList.add("show")
				modalUserId.textContent = member.userId
				document.body.style.overflow = "hidden";
			}
		} catch (error) {
			errorModal.classList.add("show");
			document.body.style.overflow = "hidden";
		}
		
	window.addEventListener("click", closeModal);

	};

	function closeModal(e) {
		if (e.target === errorModal || e.target === modal) {
			errorModal.style.transition = "none";
			modal.style.transition = "none";
			document.body.style.overflow = "auto";
			errorModal.classList.remove("show");
			modal.classList.remove("show");
		}
	}
	
	loginBtn.onclick = function () {
		window.location.href="/user/login"
	}

	signupBtn.onclick = function () {
		window.location.href="/user/sign-up"
	}
	
	findPwdBtn.onclick = function (e) {
		e.preventDefault()
		let input = document.querySelector(".find-pwd input[type=text]")
		let userId = document.querySelector(".find-pwd input[type=text]").value
		
		if(userId === ""){
			input.focus()
		}else if(member){
			window.location.href="/user/findPwd"
		}
	}
	
});