window.addEventListener("load", function() {
	let listBtn = document.querySelector(".btn-list");
	let id = document.querySelector(".board-id").value;
	let page = document.querySelector(".board-page").value;
	let pageSize = document.querySelector(".board-pageSize").value;
	let removeBtn = document.querySelector(".btn-remove").value;
	let writeBtn = document.querySelector(".writeBtn");


	/*==================== 목록버튼==========================*/
	listBtn.onclick = (e) => {
		e.preventDefault();

		let url = "/board/list?page=" + page + "&pageSize=" + pageSize;
		location.href = url;
	}

	/*==============삭제버튼================*/
	removeBtn.onclick = (e) => {
		e.preventDefault();
		let form = document.querySelector(".board-form");
		form.action = "/board/remove?page=" + page + "&pageSize=" + pageSize;
		form.method = 'post';
		form.submit();
	}
	
	/* =============== 등록 버튼 ====================*/
	
	writeBtn.onclick = (e) => {
		let form = document.querySelector(".board-form");
		form.action = "/board/write";
		form.method = 'post';
		form.submit();
    }


});