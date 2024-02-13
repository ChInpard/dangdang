document.addEventListener("DOMContentLoaded", function() {
    let menuButton = document.getElementById("menuButton");
    let navBar = document.getElementById("navBar");
    let xButton = document.querySelector(".x_button");


    // 화면 너비가 700px 이상인지 확인
    const mediaQuery = window.matchMedia("(min-width: 700px)");

    if (menuButton) {
        menuButton.addEventListener("click", function(e) {
            e.preventDefault();

            // 미디어 쿼리 조건이 충족되지 않을 경우에만 코드 실행
            if (!mediaQuery.matches) {
                // 콘텐츠를 동적으로 추가
                navBar.style.display = navBar.style.display === "flex";
                navBar.classList.toggle("show");
            }
        });
    } 
 
 	if (xButton) {
        xButton.addEventListener("click", function(e) {
            e.preventDefault();
            if (navBar.classList.contains("show")) {
                navBar.classList.remove("show");
            }
        });
	}
})