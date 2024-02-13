document.addEventListener("DOMContentLoaded", function() {
  const fabMain = document.getElementById("fab-main");
  const fabContainer = document.querySelector(".fab-container");

	fabMain.addEventListener("click", function() {
	  fabContainer.classList.toggle("active");
	  fabMain.classList.toggle("rotate");
	});

});
