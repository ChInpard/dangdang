window.addEventListener("load", function() {
   let categorySection = document.querySelector(".category-section");
   let categoryUl = categorySection.querySelector("ul");
   let findButton = categorySection.querySelector(".btn-find");
   let queryInput = categorySection.querySelector(".input-query") //document에서 입력객체 얻기
   let searchInput = document.getElementById("searchInput");
   let content = document.querySelector(".search-result .content");
   
   function bind(list) {
        //데이터를 요청하고 응답을 기다리는 중...   
        //let list = JSON.parse(text);       
        //alert(request.responseType);
      
          content.innerHTML = ""; //건물 때려부수기
          //section을 위한 DOM 객체를 생성해서 append 한다        
          for(let m of list) {
          
      /*   let menuPrice = m.price.toLocaleString();
         let iconHeart = m.isLike?"icon-heart-fill":"icon-heart";*/
             let template = `                        
			<div class="post-container md">
			  <a href="/member/postdetail" class="post">
			
			    <img class="post-image" src="/image/review/dont.png" alt="revimg">
			    <h2 class="post-title">${m.title}</h2>
			    <span class="post-comments" ><img src="/image/icon/review/replyconunt.svg" alt="comments"> 20</span>
			    
			
			    <div class="post-info">
			        <span class="post-author">돈까스러버</span>
			        <span class="post-date">2023-09-22</span>
			        <span class="post-views">조회수 123</span>
			        <span class="post-like" ><img src="/image/icon/review/like.svg" alt="comments"> 50</span>
			    </div>
			  </a>
                      `;
                
            //떄려부순곳에 다시 꽂아넣기
            content.insertAdjacentHTML("beforeend", template);
                 
             }
      
       }
      
      categoryUl.onclick = async function(e){
       e.preventDefault();
       
       let el = e.target;
       //console.log(e.tagName);
       if(el.tagName != "A")
          return;
       
       console.log(el.className);
        currentCategory.classList.remove("current");
         el.classList.add("current");
         currentCategory = el;
          
       // 업무로직
       console.log(el.dataset.id);
    
      // /api/menus?c=
      let response;
    
       // 만약 "전체 메뉴"를 클릭한 경우, 데이터베이스에서 모든 메뉴를 검색하기 위해 URL을 수정합니다.
          if (el.dataset.id == undefined) {
              response = await fetch(`/api/reviewboard`);
          } else {
              response = await fetch(`/api/reviewboard?c=${el.dataset.id}`);
          }
      
          let json = await response.json();
          bind(json);
   }
          
         findButton.onclick = async function(e) {
          e.preventDefault();
          
          let query = queryInput.value;  // 입력 개체의 속성에서 입력 값을 얻어오기
          console.log(query);
          let response = await fetch(`/api/reviewboard?q=${query}`);
          console.log(response);
          let json = await response.json();
          bind(json);
          console.log("으아아아아");
       }
         
 });