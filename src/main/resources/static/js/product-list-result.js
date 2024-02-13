window.addEventListener("load", async function() {
let categorySection = document.querySelector(".category-section");
let categoryUl = categorySection.querySelector("ul");
let findButton = categorySection.querySelector(".search-find");
let queryInput = categorySection.querySelector(".input-query") //document에서 입력객체 얻기
let content = document.querySelector(".search-result .content");
let memberId = document.body.getAttribute('data-member-id');
console.log(memberId);


  // URL에서 쿼리 매개변수 추출하는 함수를 여기에 정의합니다.
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, " "));
            }
        }
        return null;
    }

    // 페이지 로드 시 'keyword' 쿼리 매개변수 값을 추출합니다.
    let keyword = getQueryVariable("keyword"); // 'keyword'는 서버에서 기대하는 쿼리 파라미터명입니다.
    if (keyword) {
        // keyword가 있을 경우, AJAX 요청을 통해 검색 결과를 가져옵니다.
        try {
            let response = await fetch(`/api/products?q=${encodeURIComponent(keyword)}`);
            if (response.ok) {
                let json = await response.json();
                bind(json); // 검색 결과를 페이지에 표시하는 함수를 호출합니다.
            } else {
                // 에러 처리...
                console.error('Error fetching search results:', response.statusText);
            }
        } catch (error) {
            // 에러 처리...
            console.error('Error:', error);
        }
    }

		// 좋아요를 추가하는 함수
		async function addLike(productId, memberId) {
		    if (!productId) {
		        console.error('Product ID is required for adding a like.');
		        return;
		    }
		    const url = `/api/likes/${productId}`; // productId를 URL에 포함
		    try {
		        const response = await fetch(url, {
		            method: 'POST',
		            headers: {
		                'Content-Type': 'application/json'
		            },
		            body: JSON.stringify({ memberId: memberId }) // memberId를 요청 본문에 포함
		        });
		        if (!response.ok) {
		            throw new Error('Server responded with ' + response.status);
		        }
		        // 좋아요가 성공적으로 추가되었을 때의 처리
		    } catch (error) {
		        console.error('Error while adding like:', error);
		    }
		}


// 좋아요 클릭 이벤트 처리
	content.addEventListener('click', async function(e) {
	    e.preventDefault();
	    let el = e.target;
    
      if (e.target.tagName === 'A' && e.target.href) {
        e.preventDefault();  // 기본 동작 방지
        window.location.href = e.target.href;  // href 속성의 URL로 이동
    }

    if (el.classList.contains('icon-heart-empty') || el.classList.contains('icon-heart-fill')) {
        const productId = el.dataset.productId;
        console.log(productId);

        const isLiked = el.classList.contains('icon-heart-fill');
               const method = isLiked ? 'DELETE' : 'POST';
        const url = `/api/likes/${productId}`;
        
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, memberId }),
            });

            if (response.ok) {
                e.target.classList.toggle('icon-heart-empty');
                e.target.classList.toggle('icon-heart-fill');
            } else {
                const errorText = await response.text();
                console.error(`Error during like toggle: ${errorText}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});




function bind(list) {
	
       content.innerHTML = ""; //건물 때려부수기
       //section을 위한 DOM 객체를 생성해서 append 한다
       for(let m of list) {

	   let iconHeartClass  = m.isLike ? "icon-heart-fill" : "icon-heart-empty";
	   let servingSize = m.serving_size;
	   let unit = m.unit;
	   console.log(iconHeartClass);
	       let template = `
	                <section class="card">
                        <div class="product-info">
	                    	<h1 class="name-block">
	                    	<a href="detail?id=${m.id}">${m.name}</a>
	                        </h1>
							<a href="javascript:void(0);" class="icon icon-size-2 ml:5 ${iconHeartClass}" data-product-id="${m.id}">좋아요</a>
	                    </div>
	                    <div class="d:flex flex:col gap:2 mt:3 ml:3">
	                        <div class="manufacturer">
	                            <span class="icon icon-manufacture icon-size-6"></span><span class="ml:2">${m.manufacturer}</span>
	                        </div>
	                        <div class="ml:1">
	                            <img src=/image/icon/product/list-result/kcal.svg><span class="ml:2">${m.kcal}</span><span>Kcal</span>
	                        </div>
	                        <div class="ml:1">
	                            <img src=/image/icon/product/list-result/itemtag.svg><span class="ml:2">${m.servingSize}${m.unit}</span>
	                        </div>
	                    </div>
	                </section>
	                `;
	              
         //떄려부순곳에 다시 꽂아넣기
         content.insertAdjacentHTML("beforeend", template);
          }

    }

    // 카테고리 클릭 이벤트 처리
    categoryUl.addEventListener('click', async function(e) {
        e.preventDefault();

        let el = e.target.closest("a"); // 가장 가까운 a 태그를 찾음
        if (!el) return; // a 태그가 없으면 함수 종료

        let currentCategory = document.querySelector(".current");
        if (currentCategory) {
            currentCategory.classList.remove("current");
        }
        el.classList.add("current");

        let response;
        if (el.dataset.id === undefined) {
            response = await fetch(`/api/products`);
        } else {
            response = await fetch(`/api/products?c=${el.dataset.id}`);
        }

        if (response.ok) {
            let json = await response.json();
            bind(json);
        } else {
            console.error('Error fetching products!');
        }
    });

		 findButton.addEventListener('click', async function(e) {
	    e.preventDefault();
	    let query = queryInput.value.trim(); // 공백 제거
	    if (!query) return; // 입력 값이 없으면 함수 종료
	
	    // 페이지 이동 대신 Ajax 요청으로 처리하고 결과를 현재 페이지에 바인딩
	    try {
	        let response = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
	        if (response.ok) {
	            let json = await response.json();
	            bind(json);
	        } else {
	            throw new Error('Error fetching search results!');
	        }
	    } catch (error) {
	        console.error('Error:', error);
	    }
	});

});