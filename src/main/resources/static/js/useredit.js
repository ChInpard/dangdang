import Modal from '/js/lib/m-modal.js'

window.addEventListener("load", function () {
    let editBox = this.document.querySelector(".userModity-box")
    let nicknameInput = editBox.querySelector(".nickname-input")
    let success = editBox.querySelector(".successText")
    let error = editBox.querySelector(".errorText")
    let submitBtn = editBox.querySelector("button[type=submit]")
    
    async function data(){
        let response = await fetch(`/api/members`)
        let json = await response.json()

        return json
    }

    nicknameInput.onchange = async function () {
        let memberList = await data()

        if (memberList.find((m) => nicknameInput.value == m.userName)) {
            error.style.display = "block"
            success.style.display = "none"
            submitBtn.disabled = true;
        } else if (memberList.find((m) => nicknameInput.value != m.userName)) {
            error.style.display = "none"
            success.style.display = "block"
            submitBtn.disabled = false;
        }
        if (nicknameInput.value === "") {
            error.style.display = "none"
            success.style.display = "none"
        }
    }
    
    let fileInput = document.querySelector("input[type=file]")
    let btn = document.querySelector("button[type=submit")
	let reader = new FileReader()

	fileInput.oninput = function(e){ //창이 닫힌 뒤에 실행되는 이벤트
		console.log("입력완료")
		const files = e.target.files
		let text = ""
		
		for (const file of files)
			text += `${file.name}' : '${file.type || "알수없음"}\n`
			
		let f = files[0]
		
		
		if(f)
			reader.readAsDataURL(f)
		
		reader.addEventListener("load", () => {
			let img = fileInput.nextElementSibling
			img.src = reader.result
		})
		
		console.log(text)
	}
	
	btn.onclick = function(e){
		e.preventDefault()
		let form = document.querySelector(".member-edit-form")
		let userName = form.querySelector("input[name=userName]").value
		let id = form.querySelector("input[type=hidden]").value
		console.log(id)
		let imgFile = fileInput.files[0]
		
		let formData = new FormData()
		formData.append("userName", userName)
		formData.append("id", id)
		formData.append("imgFile", imgFile)
		
		let request = new XMLHttpRequest()
		request.onload = ()=>{
			if (request.status === 200) {
	            let modal = new Modal({
					content: "회원정보 수정이 완료되었습니다",
					btnText: "확인"
				})
				
				modal.updateImage("edit.svg")
				modal.show()
				return	            
	        }
		}
		request.open("PUT", "/api/members", true /*설정안하면 기본이 true*/)
		request.send(formData)
	}
	
	let cancleBtn = document.querySelector(".btn-cancel")
	cancleBtn.onclick = function(e){
		e.preventDefault()
		window.location.href = "/member/index";
	}


});