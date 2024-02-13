// 컨트롤러
const { createApp } = Vue;

//let csrfToken = document.querySelector("#csrf").content;

export default({    
    data(){
        return {
            query: "",
            list: []
        };
    },
 
    template:`  
        <section class="card" v-for="(m, index) in list" :key="m.id">
            <div class="product-info">
                <h1 class="name-block">
                    <a :href="'detail?id=' + m.id">{{ m.name }}</a>
                </h1>
                <a href="#" 
                   :class="['icon', 'icon-size-2', 'ml:5', m.isLike ? 'icon-heart-fill' : 'icon-heart', 'vertical-align: middle']" 
                   @click.prevent="heartClickHandler(index)">
                   좋아요
                </a>
            </div>
            <div class="d:flex flex:col gap:2 mt:3 ml:3"> 
                <div class="manufacturer">
                    <span class="icon icon-manufacture icon-size-6"></span>
                    <span class="ml:2">{{ m.manufacturer }}</span>
                </div> 
                <div class="ml:1">
                    <img src="/image/icon/product/list-result/kcal.svg">
                    <span class="ml:2">{{ m.kcal }}</span><span>Kcal</span>
                </div>
                <div class="ml:1">
                    <img src="/image/icon/product/list-result/itemtag.svg">
                    <span class="ml:2">{{ m.category }}</span>
                </div>
            </div>
        </section>
    `,
    methods:{
        async bind() {
            let response = await fetch(`http://localhost:8080/api/menus?q=${this.query}`);
            let list = await response.json();
            this.list = list;
        },
        findHandler(){
            this.bind();
        },
        async heartClickHandler(index){
            let curMenu = this.list[index];
            let url = curMenu.isLike ? 
                `/api/likes/${curMenu.id}` : 
                `/api/likes`;

            let options = {
                method: curMenu.isLike ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken
                },
                body: !curMenu.isLike ? JSON.stringify({ menuId: curMenu.id, memberId: 1 }) : undefined
            };

            let response = await fetch(url, options);
            if (response.ok) {
                let result = await response.json();
                console.log(result);
                curMenu.isLike = !curMenu.isLike;
                curMenu.likeCount += curMenu.isLike ? 1 : -1;
            } else {
                console.error('Request failed:', response);
            }
        }
    }
});

