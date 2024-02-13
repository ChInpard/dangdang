window.addEventListener('load', function(e){

    let form = document.querySelector('.post-write');
    let submitBtn = form.querySelector('.write-icon');
    let titleArea = form.querySelector('.textarea');
    let contentArea = form.querySelector('.body-textarea');
    let fileInput = form.querySelector('#fileInput');
    let boardCategoryId = form.querySelector('#category').value
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
						
	        let response = await fetch("/api/posts", {
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
