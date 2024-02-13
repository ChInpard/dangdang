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