export default class health_Modal{
   #title;
   #content;
   #btnText;
   #login;
   #mypage;

  
   constructor(args){
      
      //속성들
      this.#title = args.title || "로그인하러 가기";
      this.#content = args.content || "";
      this.#btnText = args.btnText || "";
      this.#login = args.login;
     this.#mypage = args.mypage;

     this.root = this.createRootElement();
      
      this.host = document.createElement("div");
      document.body.append(this.host);
      
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(this.getStyleText());

      
      const shadow = this.host.attachShadow({ mode: "open" });
      shadow.adoptedStyleSheets = [sheet];
      
      shadow.appendChild(this.root);
      
/*      const loginButton = this.root.querySelector(".btn-product-login");
      loginButton.onclick = this.btnLoginlHandler.bind(this);*/
     
     } 

      btnLoginlHandler() {
         if(this.#login)
               this.#login();
               
          window.location.href = '/user/login';
      };
      
      btnMypageHandler() {
         if(this.#mypage)
               this.#mypage();
               
          window.location.href = '/member/inform';
      };
      
      set title(title) {
         this.#title = title;
         
         this.root.querySelector(".title").innerText = this.#title;
      }
      
     set content(content) {
         this.#content = content;
         
         this.root.querySelector(".content").innerText = this.#content;
      }
      
      set login(callback){
         this.#login = callback;
      }
      
    blur() {
       this.root.classList.add("blur");
     }
     
    close() {
       this.root.classList.add("close");
     }
     
   getStyleText() {
      return `     
      
   /*--------제품 상세 페이지 모달-----------------------------------*/
          .health-modal {
           position: absolute;
             left: 0;
             top: 550px;
             width: 100vw;
             height: 100vh;
             backdrop-filter: blur(0.75rem);
                
             display: flex;
             justify-content: center;
             align-items: center;
             
             z-index: 9; 
             
             opacity: 0;
             height: 0vh;
             
          }
          
          .health-modal.blur {
            opacity: 1;
            height: 120vh;
           }
           
           .health-modal.close {
              display: none;
           }
          
          .health-modal
             .frame {
            positon:absolute;
                border-radius: 20px;
                opcity:0.5;
            
            backdrop-filter: blur(0.75rem);
            
            width:380px;
               height: 1000px;
               
               display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

             }

                
          .health-modal
             .frame 
                .title{
                padding: 5px 10px;
                background-color: var(--color-accent-1);
                color: var(--color-base-0);
                border-radius: 10px 10px 0 0;
             }
          
          .health-modal
             .frame
                .content{
                padding: 10px 20px;
                
          }
             
          .health-modal
             .frame 
                .command{
                padding: 10px 20px;
                text-align: center;
          }
          
           .health-modal
             .frame 
                .command
                   button{
                cursor: pointer;
                   background-color: var(--color-main-1);
                border-radius: var(--radius-1);
                color: var(--color-base-0);
                font-weight: bold;
                border: none;
                padding: 16px 20px;
                font-size: var(--font-size-4);
                
               width: 312px;
                height: 52px;
          }
      
      
         @media (min-width: 700px) {
          .health-modal {
             display:flex;
             top:700px;
             left:10px;
             height:1000px;
          };
       }
       
        @media (min-width: 700px){
       .health-modal
          .blur{
       height: 110vh;
       }
    }
       @media (min-width: 700px) {
         .health-modal
            .frame {
            height: 1000px;
             };
             
         }
      `;
   }
   
    createRootElement() {
       let section = document.createElement("div");
       section.classList.add("health-modal"); // 클래스명 변경
   
       section.insertAdjacentHTML("beforeend", `
         <div class="frame">
           <h1 class="title">${this.#title}</h1>
           <div class="content">${this.#content}</div>
           <div class="command">
             <button class="btn btn-product-login">${this.#btnText}</button>
           </div>
         </div>
       `);
       
       const button = section.querySelector('.btn-product-login');
        // 여기서 bind를 사용하여 현재 인스턴스의 this를 이벤트 핸들러에 바인딩합니다.
        button.addEventListener('click', this.handleButtonClick.bind(this));
      
        return section;
      }
      
      // 이벤트 핸들러를 클래스의 메소드로 만듭니다.
      handleButtonClick(event) {
        const buttonText = event.target.textContent;
        if (buttonText.includes('마이 페이지 가기')) {
          window.location.href = '/member/inform';
        } else {
          window.location.href = '/user/login';
        }
      }
       
}