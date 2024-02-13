import Modal from '/js/lib/normal-modal.js'

window.addEventListener("load", async function () {
	let result
	let timerElement = document.querySelector(".timer");
	let emailInput = document.querySelector("input[type=text]") 
	let findBtn = document.querySelector(".btn-choice")
	let cancelBtn = document.querySelector(".btn-cancel")
	let requestBtn = document.querySelector(".btn-request")
	  
	let minutes = 3;
	let seconds = 0;
  
	requestBtn.classList.add("d:none")
  
	if(localStorage.getItem("key")){
		result = localStorage.getItem("key")
		console.log(result)
	}
  
	findBtn.onclick = function(e){
		e.preventDefault()
			  
		if(emailInput.value === ""){
			let modal = new Modal({
				content: "인증번호를 입력해주세요"
			})
			modal.show()
			return
		} else if(emailInput.value != result){
			let modal = new Modal({
				content: "인증번호가 일치하지 않습니다"
			})
			modal.show()
			return
		} else {
		window.location.href = "/user/newpwd"
		}
	}
  
	cancelBtn.onclick = function(){
		history.back()
	}

	let countdown = setInterval(function() {
		if (minutes <= 0 && seconds <= 0) {
			clearInterval(countdown);
			requestBtn.classList.remove("d:none")
			findBtn.disabled = true
			localStorage.removeItem("key")
		        
		} else {
		
			let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
			let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
					          
			timerElement.textContent = displayMinutes + ":" + displaySeconds;
			if (seconds === 0) {
				if (minutes > 0) {
					minutes--;
					seconds = 59;
				} else {
					seconds = 0;
				}
			} else {
				seconds--;
			}
			
		}
	}, 1000);
	
	requestBtn.onclick = function(e){
		e.preventDefault()
		window.location.href = "/user/findIdPwd"
	}
  
})