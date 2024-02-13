const optionMenu = document.querySelector(".board-select-menu"),
	selectBtn = optionMenu.querySelector(".board-select-btn"),
	options = optionMenu.querySelectorAll(".board-option"),
	Btn_text = optionMenu.querySelector(".board-btn-text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

/* options라는 것이 어떤 HTML 엘리먼트들의 배열인데, 각각의 엘리먼트는 버튼을 나타냅니다. forEach 메서드는 배열의 각 요소에 대해 주어진 함수를 실행합니다. */
options.forEach(option => {
	option.addEventListener("click", () => {
		/* 선택된 버튼에 있는 텍스트가 큰 제목으로 옮겨진다 */
		let selectedOption = option.querySelector(".board-option-text").innerText;
		Btn_text.innerText = selectedOption;
		console.log(selectedOption);
	});
});

window.addEventListener('load', function(e){

    let form = document.querySelector('.board-form');
    let submitBtn = document.querySelector('.board-writeBtn');
    let titleArea = form.querySelector('.board-title');
    let contentArea = form.querySelector('.board-content');
    let fileInput = form.querySelector('.fileInput');
    let boardCategoryId = form.querySelector('.category').value
    let sessionId = form.querySelector('#sessionId')

   async function submit(e) {
        e.preventDefault();
		if(sessionId){
			let memberId = sessionId.textContent
	        let title = titleArea.value;
	        let content = contentArea.value;
	        let img = fileInput.files[0]
	
	        let formData = new FormData(); 
	        formData.append('title', title);
	        formData.append('content', content);
	        if (img) {
            formData.append('imgFile', img); 
            }
	        formData.append('boardCategoryId', boardCategoryId);
	        formData.append('memberId', memberId);
			console.log(title)
			console.log(content)
			console.log(boardCategoryId)
			console.log(memberId)
						
	        let response = await fetch("/api/boards", {
	            method: "POST",
	            body: formData 
	        })
	       
            if (response.ok) {
                let redirectPath = await response.text();
                window.location.href = redirectPath;
            }
	    }
	}
    submitBtn.addEventListener('click', submit);
});
