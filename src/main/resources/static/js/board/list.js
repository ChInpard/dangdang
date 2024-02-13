window.addEventListener("load", function() {
	let writeBtn = document.querySelector(".writeBtn");
	let id = document.querySelector(".board-id").value;
	
	/* =============== 글쓰기 버튼 ==================*/
	writeBtn.onclick = (e) => {
		e.preventDefault();

		let url = "/board/write?id="+ id;
		location.href = url;
	}
});