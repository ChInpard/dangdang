export default class Modal{
	
	#content
	
	constructor(args){
		this.#content = args.content || "회원가입이 완료되었습니다"
		
		//속성이 바뀌면 update 다시 해줘야된다/
		this.root = this.creatRootElement()
		
		this.host = document.createElement("div")
		document.body.append(this.host)
		
		const sheet = new CSSStyleSheet()
		sheet.replaceSync(this.getStyleText())
		
		const shadow = this.host.attachShadow({ mode: "open" })
		shadow.adoptedStyleSheets = [sheet]
		
		shadow.appendChild(this.root)
		
	    const okBtn = this.root.querySelector(".m-btn");
	    okBtn.onclick = this.btnOkHandler.bind(this);

	}
	
	set content(content){
		this.#content = content
		 
		this.root.querySelector(".content-box").innerText = this.#content
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

	btnOkHandler(){
		this.close()
	}
	
	getStyleText(){
		return `
			.modal {
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
			
			.modal.show {
			        height: 100vh;
			        opacity: 1;
			    }
			
			.modal
			    .close {
			        display: none;
			    }
			
			.modal 
			    .frame {
			        background-color: #fff;
			        transform: translateY(-100px);
			        border-radius: 10px;
			    }
			
			.modal 
			    .frame 
			        .title {
			            text-align: center;
			            padding: 11px 10px;
			            margin: 0;
			            border-radius: 10px 10px 0 0;
			            font-size: 20px;
			            color: #ED6358;
			        }
			
			.modal 
			    .frame 
			        .content {
			            font-size: 18px;
			            margin-top: 10px;
			            padding: 10px 20px;
			            text-align: center;
			            color: #0F2851;
			        }
			
			.modal 
			    .frame 
			        .command {
			            padding: 20px 20px;
			            text-align: center;
			        }
			
			.modal 
			    .frame 
			        .command 
			            button {
							border-radius: 8px;
							background-color: #3F46D6;
							color: #FFFFFF;
							font-size: 14px;
						    width: 104px;
						    height: 35px;
						    border: 0px;
			                cursor: pointer;
			            }
			.modal 
			    .frame 
			        .command 
			            button:hover {
							background-color: var(--color-accent-1);
							cursor: pointer;
						} 
		`
	}
	
	creatRootElement(){
		let section = document.createElement("div")
		section.classList.add("modal")
		
		section.insertAdjacentHTML("beforeend", `
				        <div class="frame">
				            <h1 class="title">알림</h1>
				            <div class="content">
				                ${this.#content}
				            </div>
				            <div class="command">
				                <button class="m-btn btn-request">확인</button>
				            </div>
				        </div>
			 `)
				 
		return section
	}
	
}