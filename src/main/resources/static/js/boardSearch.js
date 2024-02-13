window.addEventListener("load", function() {
	let categorySection = document.querySelector(".category-section");
	let categoryUl = categorySection.querySelector("ul");
	let findButton = categorySection.querySelector(".btn-find");
	let queryInput = categorySection.querySelector(".input-query") //document에서 입력객체 얻기
	let searchInput = document.getElementById("searchInput");
	let content = document.querySelector(".search-result .content");


	findButton.onclick = async function(e) {
		e.preventDefault();

		let query = queryInput.value;  // 입력 개체의 속성에서 입력 값을 얻어오기
		console.log(query);
		console.log(response);
		let json = await response.json();
		bind(json);
		console.log("으아아아아");
	}
});