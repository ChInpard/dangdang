export default class Modal{
	#title;
	#content;
	#onok;
	
	constructor(args){
		this.#title = args.title || "제목";
		this.#content = args.content || "";
		this.#onok = args.onok;
		
		this.root = this.createRootElement();
		
		this.host = document.createElement("div");
		document.body.append(this.host);
		
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(this.getStyleText());
		
		const shadow = this.host.attachShadow({ mode: "open" });
		shadow.adoptedStyleSheets = [sheet];
		shadow.appendChild(this.root);
		
		const updateButton = this.root.querySelector(".updateButton");
		const deleteButton = this.root.querySelector(".deleteButton");
		const cancelButton = this.root.querySelector(".cancelButton");
		
		updateButton.onclick = this.btnUpdateHandler.bind(this);
		deleteButton.onclick = this.btnDeleteHandler.bind(this);
		cancelButton.onclick = this.btnCancelHandler.bind(this);
	}
	
	set title(title){
		this.#title = title;
		
		this.root.querySelector(".title").innerText = this.#title;
	}
	set content(content){
		this.#content = content;
		
		this.root.querySelector(".content").innerText = this.#content;
	}
	
	set onok(callback){
		this.#onok = callback;
	}
	
	show(){
		console.log("show");
		
		setTimeout(()=>{
			this.root.classList.add("show");
		},20);
	}
	
	close(){
		this.root.classList.remove("show");
		this.root.classList.add("close");
	}
	
	// 수정 버튼
	btnUpdateHandler(e){
		e.preventDefault()
		let boardId = document.querySelector("#board-id")
		let page = document.querySelector(".page")
		let pageSize = document.querySelector(".pageSize")
		
		window.location.href =`/member/board/update?id=${boardId.value}&page=${page.value}&pageSize=${pageSize.value}`;
	}
	
	// 삭제 버튼
	btnDeleteHandler(e){
		e.preventDefault()
		let boardId = document.querySelector("#board-id")
		let page = document.querySelector(".page")
		let pageSize = document.querySelector(".pageSize")
		
		window.location.href =`/member/board/delete?id=${boardId.value}&page=${page.value}&pageSize=${pageSize.value}`
	}
	
	// 취소 버튼
	btnCancelHandler(e){
		e.preventDefault()
		console.log("취소버튼 테스트")
		this.close();
	}
		
	getStyleText(){
		return `
			.modal{
				 background-color: #0005;
				 position: fixed;
				 left: 0;
				 top: 0;
				 width: 100vw;
				 height: 0;

				 display: flex;
				 justify-content: center;
				 align-items: center;
				 
				 z-index: 1000;
				 
				 opacity: 0;
				 transition: opacity .5s;
			 }
			 .modal.show{
	 				 height: 100vh;
					 opacity: 1;
				 }
 			 .modal.close{
	 				 display: none;
				 }
			 .modal
			 	.frame{
					 background-color: #fff;
	 				 transform: translateY(-100px);
	 				 border-radius: 10px;
				 }
 			 .modal
 			 	.frame
 			 		.title{
						  text-align: center;
						  padding: 5px 10px;
						  background-color: #3F46D6;
						  color: #fff;
						  margin: 0;
						  border-radius: 10px 10px 0 0;
					  }
  			 .modal
 			 	.frame
 			 		.content{
						  margin-top: 10px;
						  padding: 10px 20px;
					  }
		 	.modal
 			 	.frame
 			 		.command{
						  padding: 20px 20px;
						  text-align: center;
					  }
	 		.modal
 			 	.frame
 			 		.command
 			 			button{
							  cursor: pointer;
						  }
		 `;
	}
	
	createRootElement(){
		let section = document.createElement("section");
		section.classList.add("modal");
		
		section.insertAdjacentHTML("beforeend", `
			<div class="frame">
				 <h1 class="title font-size:0">${this.#title}</h1>
				 <div class="content">
					 ${this.#content}
				 </div>
				 <div class="command">
					 <button class="updateButton btn btn-main pv:2 font-size:-1 cursor-pointer:pointer">수정</button>
					 <button class="deleteButton btn btn-base-2 pv:2 font-size:-1 cursor-pointer:pointer">삭제</button>
					 <button class="cancelButton btn btn-base-2 pv:2 font-size:-1 cursor-pointer:pointer">취소</button>
				 </div>
			 </div>
		`);
		
		return section;
	}
	
}