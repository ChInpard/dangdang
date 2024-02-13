window.addEventListener("load", function () {
	let findPwdForm = document.querySelector(".find-pwd")
	let findBtn = findPwdForm.querySelector("button[type=submit]")
	let errorModal = document.querySelector(".error-modal");
	
	findBtn.onclick = async function(e){
		e.preventDefault()
		let emailAddress = findPwdForm.querySelector("input[name=user-email]")
		let userEmail = emailAddress.value
		
		try{
			let res = await fetch(`/api/members/email?email=${userEmail}`)
			await res.json()
			
			let response = await fetch ('/api/members' , {
				method: "POST",
				headers:{
					'content-type': 'application/json'
				},
				body: JSON.stringify({"userEmail": userEmail})
			})
			
			if(response.ok){
				let key = await response.text()
				localStorage.setItem("key", key)
				localStorage.setItem("email", userEmail)
				window.location.href = "/user/findPwd"
			}
			
		} catch (error){
			errorModal.classList.add("show");
			document.body.style.overflow = "hidden";
		}
		
		window.addEventListener("click", closeModal);
		
	}
	
	function closeModal(e) {
		if (e.target === errorModal) {
			errorModal.style.transition = "none";
			document.body.style.overflow = "auto";
			errorModal.classList.remove("show");
		}
	}
	
});