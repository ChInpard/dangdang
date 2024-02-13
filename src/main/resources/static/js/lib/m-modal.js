export default class Modal{
	
	#image
	#content
	#btnText
	
	constructor(args){
		this.#content = args.content || "회원가입이 완료되었습니다"
		this.#btnText = args.btnText || "메인으로"
		
		//속성이 바뀌면 update 다시 해줘야된다/
		this.root = this.creatRootElement()
		
		this.host = document.createElement("div")
		document.body.append(this.host)
		
		const sheet = new CSSStyleSheet()
		sheet.replaceSync(this.getStyleText())
		
		const shadow = this.host.attachShadow({ mode: "open" })
		shadow.adoptedStyleSheets = [sheet]
		
		shadow.appendChild(this.root)
		
		if (this.#btnText === "메인으로") {
		    const btnMain = this.root.querySelector(".btn-main");
		    btnMain.onclick = this.btnMainHandler.bind(this);
		} else {
		    const btnOk = this.root.querySelector(".btn-ok");
		    btnOk.onclick = this.btnOkHandler.bind(this);
		}

	}
	
	set image(image){
		this.#image = image
		
		this.root.querySelector(".title").innerText = this.#image
	}
	
	set content(content){
		this.#content = content
		 
		this.root.querySelector(".content-box").innerText = this.#content
	}
	
	set btnText(btnText){
		this.#btnText = btnText

		this.root.querySelector(".btn-box").innerText = this.#btnText
	}
	
	show(){
		setTimeout(()=>{
			this.root.classList.add("show")
		}, 20)
	}

	close(){
		this.root.classList.remove("show")
		this.root.classList.add("close")
	}
	
	btnMainHandler(){
		window.location.href = "/index"
	}

	btnOkHandler(){
		window.location.href = "/member/index"
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
				
				z-index: 12000;
				
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
					width: 393px;
					height: 800px;
					border-radius: 32px;
			
					background-color: #fff;
				}

			.modal
				.frame
					.img-box{
						text-align: center;
						padding: 5px 10px;
						margin: 0;
						border-radius: 10px 10px 0 0;
					}

			.modal
				.frame
					.img-box
						img{
							margin-top: 90px;
						}

			.modal
				.frame
					.content-box{
						margin-top: 40px;
						text-align: center;
						color: #0F2851;
						font-size: 20px;
						padding: 10px 20px;
					}

			.modal
				.frame
					.btn-box{
						text-align: center;
						margin-top: 200px;
					}

			.modal
				.frame
					.btn-box
						button{
							border-radius: 8px;
							background-color: #3F46D6;
							color: #FFFFFF;
							font-size: 14px;
							width: 335px;
							height: 48px;
							border: 0px;
							cursor: pointer;
						}

			.modal
				.frame
					.btn-box
						.btn:hover{
							background-color: var(--color-accent-1);
							cursor: pointer;
						}
		`
	}

	updateImage(image) {
        this.#image = image;
        const imgElement = this.root.querySelector(".img-box img");
        imgElement.src = `/image/icon/modal/${this.#image}`;
    }
	
	creatRootElement(){
		let section = document.createElement("div")
		section.classList.add("modal")
		
		let buttonClass = this.#btnText === "메인으로" ? "btn-main" : "btn-ok";
		
		section.insertAdjacentHTML("beforeend", `
				<div class="frame">
					<div class="img-box">
						<img src="/image/icon/modal/welcome.svg" class="mt:90">
					</div>
					<div class="content-box mt:40 text-align:center">
						${this.#content}
					</div>
					<div class="btn-box">
						<button class="${buttonClass} btn">${this.#btnText}</button>
					</div>
				</div>
			 `)
				 
		return section
	}
	
}