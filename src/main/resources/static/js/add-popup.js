window.addEventListener("load", function(){
    let openPopupButton = document.querySelector(".open-popup-button");
    let popupContainer = document.querySelector(".popup-container");
    let scrollPosition = 0; // 스크롤 위치를 저장할 변수를 초기화

    let categoryUl = document.querySelector(".category-section .category-filter");
    let labels = categoryUl.querySelectorAll("label");
    let saveButton = document.querySelector(".add-popup .button button");
    
    let selectedProductId;
    let selectedMealCategoryId;
 
    
    openPopupButton.onclick = async function() {
        scrollPosition = window.scrollY;
		document.body.style.top = `-${scrollPosition}px`;
		document.body.style.overflow = 'hidden';
		document.body.style.padding = '0 17px 0 0';
        popupContainer.classList.remove("d:none");
    }

    window.addEventListener("click", function(e) {
        if (e.target === popupContainer) {
			document.body.style.top = 'auto';
			document.body.style.overflow = 'auto';
			document.body.style.padding = '';
            window.scrollTo(0, scrollPosition);
            popupContainer.classList.add("d:none");
            
            resetCategorySelection();
        }
    });
   
   
	let formSection = document.querySelector(".search-bar form");
	let queryInput = formSection.querySelector(".search-text");
	let searchButton = formSection.querySelector(".search-input");
	let productList = document.querySelector(".product-list");
	
	
	async function createCards() {
        let query = queryInput.value;
        let response = await fetch(`/api/products?q=${query}`);
        let list = await response.json();
        console.log(list);
        
        productList.innerHTML = "";
        
        for (let m of list) {
            let template = `
                <section class="card p:2 bg-color:base-0" data-id="${m.id}">
                    <h1 class="font-size:1 font-weight:bold">${m.name}</h1>
                    <div class="kcal-block">
                        <span class="font-size:0 font-weight:bold color:base-7">${m.kcal}</span>
                        <span class="font-size:0 font-weight:bold color:base-7">kcal</span>
                    </div>
                </section>
            `;
            productList.insertAdjacentHTML("beforeend", template);
        }
    }
    
    
    
    searchButton.onclick = async function(e) {
        e.preventDefault();
        
        // 기존 카드를 비동기로 생성
        await createCards();
        
        let cards = productList.querySelectorAll(".card");
        // 생성된 카드에 클릭 이벤트를 추가
        cards.forEach(card => {
            card.addEventListener("click", function () {
                // 클릭한 카드에 "clicked" 클래스 추가
                card.classList.add("clicked");
    
                // 나머지 카드에서 "clicked" 클래스 제거
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove("clicked");
                    }
                });
                
                let productId = card.getAttribute("data-id");
	            console.log("productId: ", productId);
	            
	            selectedProductId = productId;
            });
        });
        
    }
    
    categoryUl.onclick = async function(e) {
		e.preventDefault();
		
		let el = e.target;
		
    	labels.forEach((label) => {
			label.classList.remove("checked");
    	});
    	if (el.tagName === "LABEL") {
    		el.classList.add("checked");
    		let inputElement = el.querySelector("input[type='radio']");
    		
    		if (inputElement) {
      			let mealCategoryId = inputElement.value;
      			console.log("mealCategoryId:", mealCategoryId);
      			
      			selectedMealCategoryId = mealCategoryId;
    		}
  		}
  		
	};
	
	
	saveButton.onclick = async function() {
        
        console.log(selectedDate, selectedProductId, selectedMealCategoryId);
        
        let requestData = {
	        regDate: selectedDate,
	        productId: selectedProductId,
	        mealCategoryId: selectedMealCategoryId
	    };
	    console.log(JSON.stringify(requestData));
	    
        // HTTP POST 요청을 보냄
        let response = await fetch(`/api/eatings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });
        
        if(response.ok){
			document.body.style.top = 'auto';
			document.body.style.overflow = 'auto';
			document.body.style.padding = '';
            window.scrollTo(0, scrollPosition);
            popupContainer.classList.add("d:none");
		
        
        
        // 데이터 검색을 위해 엔드포인트 호출
	    let eatingDate = selectedDate;
	    let breakfastCategoryId = 1;
	    let lunchCategoryId = 2;
	    let dinnerCategoryId = 3;
	    let snackCategoryId = 4;
	    
	    
	    let breakfastResponse = 
	    	await fetch(`/api/eatings/mealCategory?eatingDate=${eatingDate}&mealCategoryId=${breakfastCategoryId}`);
	    let lunchResponse = 
	    	await fetch(`/api/eatings/mealCategory?eatingDate=${eatingDate}&mealCategoryId=${lunchCategoryId}`);
	    let dinnerResponse = 
	    	await fetch(`/api/eatings/mealCategory?eatingDate=${eatingDate}&mealCategoryId=${dinnerCategoryId}`);
	    let snackResponse = 
	    	await fetch(`/api/eatings/mealCategory?eatingDate=${eatingDate}&mealCategoryId=${snackCategoryId}`);
	    
	    
	    let breakfastListResponse = 
	    	await fetch(`/api/eatings/listByMealCategory?eatingDate=${eatingDate}&mealCategoryId=${breakfastCategoryId}`);
	    let lunchListResponse = 
	    	await fetch(`/api/eatings/listByMealCategory?eatingDate=${eatingDate}&mealCategoryId=${lunchCategoryId}`);
	    let dinnerListResponse = 
	    	await fetch(`/api/eatings/listByMealCategory?eatingDate=${eatingDate}&mealCategoryId=${dinnerCategoryId}`);
	    let snackListResponse = 
	    	await fetch(`/api/eatings/listByMealCategory?eatingDate=${eatingDate}&mealCategoryId=${snackCategoryId}`);		    						    
   				
		let breakfast = await breakfastResponse.json();
        let lunch = await lunchResponse.json();
        let dinner = await dinnerResponse.json();
        let snack = await snackResponse.json();
		
        let breakfastList = await breakfastListResponse.json();
        let lunchList = await lunchListResponse.json();
        let dinnerList = await dinnerListResponse.json();
        let snackList = await snackListResponse.json();
        
	    
	    let dailyFoodContainer = document.querySelector(".daily-food");
	  	let breakfastKcalBlock = dailyFoodContainer.querySelector(".breakfast-kcal");
	  	let lunchKcalBlock = dailyFoodContainer.querySelector(".lunch-kcal");
	  	let dinnerKcalBlock = dailyFoodContainer.querySelector(".dinner-kcal");
	  	let snackKcalBlock = dailyFoodContainer.querySelector(".snack-kcal");
	  	
		let breakfastCards = dailyFoodContainer.querySelector(".breakfast-list");
	  	let lunchCards = dailyFoodContainer.querySelector(".lunch-list");
	  	let dinnerCards = dailyFoodContainer.querySelector(".dinner-list");
	  	let snackCards = dailyFoodContainer.querySelector(".snack-list");
	  	
	  	
	    let breakfastKcal = createMealKcal(breakfast.sumKcal);
	    let lunchKcal = createMealKcal(lunch.sumKcal);
	    let dinnerKcal = createMealKcal(dinner.sumKcal);
	    let snackKcal = createMealKcal(snack.sumKcal);
	    
	    
	    breakfastKcalBlock.innerHTML = "";  
	    breakfastKcalBlock.insertAdjacentHTML("beforeend", breakfastKcal);
	    
	    lunchKcalBlock.innerHTML = "";  
	    lunchKcalBlock.insertAdjacentHTML("beforeend", lunchKcal);
	    
	    dinnerKcalBlock.innerHTML = "";  
	    dinnerKcalBlock.insertAdjacentHTML("beforeend", dinnerKcal);
	    
	    snackKcalBlock.innerHTML = "";  
	    snackKcalBlock.insertAdjacentHTML("beforeend", snackKcal);
	    
	    for(let m of breakfastList){
	    	let breakfastCardList = createFoodCard(m.productName, m.productKcal, m.id);
	    	breakfastCards.insertAdjacentHTML("beforeend", breakfastCardList);
    	}
    	for(let m of lunchList){
	    	let lunchCardList = createFoodCard(m.productName, m.productKcal, m.id);
	    	lunchCards.insertAdjacentHTML("beforeend", lunchCardList);
    	}
    	for(let m of dinnerList){
	    	let dinnerCardList = createFoodCard(m.productName, m.productKcal, m.id);
	    	dinnerCards.insertAdjacentHTML("beforeend", dinnerCardList);
    	}
    	for(let m of snackList){
	    	let dinnerCardList = createFoodCard(m.productName, m.productKcal, m.id);
	    	snackCards.insertAdjacentHTML("beforeend", dinnerCardList);
    	}
    	}
    	
    	// DELETE
    	let foodCards = document.querySelectorAll(".food-card");
    	let deleteButton = document.querySelectorAll(".delete");
		console.log(deleteButton);
		
		for(let i=0; i<foodCards.length; i++ ){
			deleteButton[i].onclick = async function() {
			    
			    let id = foodCards[i].getAttribute("data-id"); // data-id 속성에서 ID 값을 읽음
        		console.log("음식 카드 ID:", id);
			    await fetch(`/api/eatings/${id}`, {
						method : "DELETE"
					})
					// 삭제 요청이 성공한 경우 음식 카드를 동적으로 삭제
	            	foodCards[i].remove();

			};
		}
	}

    

	function createMealKcal(sumKcal) {
	    return `
	    	<span>${sumKcal}</span><span> 칼로리</span>  
	    `;
	}
	
	function createFoodCard(name, kcal, id) {
	    return `
	        <section class="food-card" data-id="${id}">
	            <h1 class="food-name">${name}</h1>
	            <div class="food-kcal-block">
	                <span>${kcal}</span><span> 칼로리</span>
	            </div>
	            <div class="delete position:absolute bg-color:accent-13-1">
					삭제
				</div>
	        </section>
	    `;
	}


    
    function resetCategorySelection() {
	    labels.forEach((label) => {
	      	label.classList.remove("checked");
    	});
  	}
    
    // 색상을 결정하는 함수
	function getColor(value, max) {
	    var ratio = value / max;
	    if (ratio < 0.2 || ratio > 1.3) {
	        return '#FF6B78';
	    } else if (ratio < 0.5 || ratio > 1.0) {
	        return '#FFAB47';
	    } else {
	        return '#585CE5';
	    }
	}
	
	// 일반 도넛 차트 생성 함수
	function createDoughnutChart(elementId, originalData, maxValue, cutout) {
	    var ctxElement = document.getElementById(elementId);
	    if (ctxElement === null) {
	        console.error(`Element with id ${elementId} not found`);
	        return;
	    }
	    var ctx = ctxElement.getContext('2d');
	    var remaining = maxValue - originalData;
	    var chartData = [originalData, remaining];
	
	    return new Chart(ctx, {
	        type: 'doughnut',
	        data: {
	            datasets: [{
	                data: chartData,
	                backgroundColor: [
	                    getColor(originalData, maxValue),
	                    '#F4F6FA'
	                ],
	                borderWidth: 0,
	                borderRadius: 100,
	            }]
	        },
	        options: {
	            cutout: cutout,
	            aspectRatio: 1,
	            plugins: {
	                tooltip: {
	                    enabled: false,
	                },
	            },
	        }
	    });
	}

	// health-chart 도넛 차트 생성 함수
	function createHealthChart(elementId, originalData, maxValue) {
	    var ctxElement = document.getElementById(elementId);
	    if (ctxElement === null) {
	        console.error(`Element with id ${elementId} not found`);
	        return;
	    }
	    var ctx = ctxElement.getContext('2d');
	    var remaining = maxValue - originalData;
	    var chartData = [originalData, remaining];
	
	    return new Chart(ctx, {
	        type: 'doughnut',
	        data: {
	            datasets: [{
	                data: chartData,
	                backgroundColor: [
	                    getColor(originalData, maxValue),
	                    '#F4F6FA'
	                ],
	                borderWidth: 0,
	                circumference: 260, // 도넛 자르기
	                rotation: 230, // 도넛 시작 위치
	                borderRadius: 100,
	            }]
	        },
	        options: {
	            cutout: '85%',
	            aspectRatio: 1,
	            plugins: {
	                tooltip: {
	                    enabled: false,
	                },
	            },
	        }
	    });
    }
	
});