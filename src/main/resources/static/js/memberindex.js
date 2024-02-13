import Modal from '/js/lib/m-modal.js'

window.addEventListener("load", function () {
	let memberIndex = document.querySelector(".my-page_box")
	let logoutBtn = memberIndex.querySelector("button[type=submit]")
	let exitBtm = memberIndex.querySelector(".exit")
	let exitModal = document.querySelector(".exit-modal");
	let loginModal = document.querySelector(".login-modal")
	let idInput = loginModal.querySelector("input[name=user-id]")
	let emailInput = loginModal.querySelector("input[name=user-email")
	let okBtn = loginModal.querySelector(".btn-ok")
	let deleteBtn = exitModal.querySelector(".btn-exit")
	let cancelBtn = exitModal.querySelector(".btn-cancel")
	
	function closeModal(e) {
		if (e.target === loginModal) {
			loginModal.style.transition = "none";
			document.body.style.overflow = "auto";
			loginModal.classList.remove("show");
		}
	}
	
    async function data(){
        let response = await fetch(`/api/members`)
        let json = await response.json()

        return json
    }
	
	/* 로그아웃 버튼 눌렀을때 나오는 모달객체 활용 모달 */
	logoutBtn.addEventListener("click", function(e){
		e.preventDefault()
		fetch("/user/logout", { method: "POST" })
	    .then(function(response) {
	        if (response.ok) {
	            
	            let modal = new Modal({
					content: "로그아웃 되었습니다",
					btnText: "메인으로"
				})
				
			modal.updateImage("logout.svg")
			modal.show()
			return	  

	        }
	    });
	})
	
	/* memeber index 페이지에서 탈퇴하기 메뉴 눌렀을때 나오는 모달 */
	exitBtm.onclick = (e) => {
		e.preventDefault()

		exitModal.classList.add("show");
		document.body.style.overflow = "hidden";

	}
	
	cancelBtn.onclick = function() {
		exitModal.style.transition = "none";
		document.body.style.overflow = "auto";
		exitModal.classList.remove("show");
	}

	/* 탈퇴하기 메뉴에서 탈퇴버튼 눌렀을때 2차 로그인 입력창 나오는 모달 */
	deleteBtn.onclick = function(e){
		e.preventDefault()

		exitModal.style.transition = "none";
		document.body.style.overflow = "auto";
		exitModal.classList.remove("show");
		
		loginModal.classList.add("show");
		document.body.style.overflow = "hidden";
		
		window.addEventListener("click", closeModal);
	}
	
	/* 아이디,비밀번호 입력값 체크후 서버로 데이터 전송 */
	okBtn.onclick = async function(e){
		e.preventDefault()

		let memeberList = await data()
		console.log(memeberList)
		let foundMember = memeberList.find((m) => {
			return m.userId === idInput.value && m.userEmail === emailInput.value
		})
			
		if(foundMember){
			let id = foundMember.id
			let response = await fetch(`/api/members/${id}`, {
				method: "DELETE"
			})
				if(response.ok){
					window.location.href ="/member/exit"
				}
			
		} else {
			alert("일치하는 회원이 없습니다")
		}

	}

})