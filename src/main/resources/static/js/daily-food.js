document.addEventListener("DOMContentLoaded", function() {
    // 아이콘 클릭 시 펼치기/접기 토글 함수
    function toggleContent(e) {
        e.preventDefault();
        let mealSection = e.target.closest(".meal");
        if (mealSection) {
            let foodCards = mealSection.parentElement.querySelectorAll(".food-card");
            for (let card of foodCards) {
            card.classList.toggle("show");
            }
            
            let chevronIcon = e.target;
            chevronIcon.classList.toggle("rotate");
        }
    }
  
    // 아이콘 클릭 이벤트 리스너 등록
    let chevronIcons = document.querySelectorAll(".icon-chevron-bottom");
    for (let icon of chevronIcons) 
      icon.addEventListener("click", toggleContent);
    
        
});