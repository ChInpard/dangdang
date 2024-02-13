window.addEventListener("load", function(){
    let openCalendarButton = document.querySelector(".open-calendar-button");
    let popupCalendar = document.querySelector(".calendar-container");
    let calendarPosition = 0; // 스크롤 위치를 저장할 변수를 초기화
    let closeCalendarButton = popupCalendar.querySelector("button");
    
    openCalendarButton.onclick = () => {
        scrollPosition = window.scrollY;
		document.body.style.top = `-${calendarPosition}px`;
		document.body.style.overflow = 'hidden';
		document.body.style.padding = '0 17px 0 0';
        popupCalendar.classList.remove("d:none");
    }

	closeCalendarButton.onclick = () => {
		document.body.style.top = 'auto';
		document.body.style.overflow = 'auto';
		document.body.style.padding = '';
        window.scrollTo(0, calendarPosition);
        popupCalendar.classList.add("d:none");
	}
	
    function closeCalendar(e) {
        if (e.target === popupCalendar) {
			document.body.style.top = 'auto';
			document.body.style.overflow = 'auto';
			document.body.style.padding = '';
            window.scrollTo(0, calendarPosition);
            popupCalendar.classList.add("d:none");
        }
    }

    window.addEventListener("click", closeCalendar);
});
