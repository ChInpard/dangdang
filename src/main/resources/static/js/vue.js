let sessionId = document.querySelector("#sessionId")

if(sessionId){
	let memberId = sessionId.value
	
	/* nav-bar profile img load */
	const { createApp } = Vue;
	const navbar = createApp({
	    data(){ // 모델을 두는 옵션공간
	        return { 
				list: [],
				userId: memberId,
				imgUrl: '/image/member/',
				userImg: ''
	        }
	    },
	    methods:{ // 함수를 두는 옵션 공간
	        async navbarHandler(){
	            let response = await fetch(`/api/members/${this.userId}`)
	            let list = await response.json()
	
	            this.list = list;
	            this.userImg = this.imgUrl + list.userImg

			}
	    },
		created() {
		    this.navbarHandler()
		}
	})
	navbar.mount("#app");	
	
	const inform = createApp({
	    data(){ // 모델을 두는 옵션공간
	        return { 
				list: {
					userGender: '',
					userYear: null,
					userMonth: null,
					userDate: null,
					userHeight: '',
					userWeight: '',
					userId: ''
				},
				userId: memberId,
				years: [],
				months: [],
				days: []
	        }
	    },
	    methods:{ // 함수를 두는 옵션 공간
	        async bodyInformHandler(){
	            let response = await fetch(`/api/members/${this.userId}`)
	            let list = await response.json()
	
	            this.list = list;
	            this.year = list.userYear
	            this.list.userId = list.userId

			},
			async saveData(){
				let response = await fetch(`/api/members/${this.list.userId}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(this.list)
				})
				window.location.href = '/member/index'
				if(response.ok)
					alert("저장되었습니다")
				else
					alert("저장에 실패했습니다")
			}
	    },
		created() {
		    this.bodyInformHandler()
	        const currentYear = new Date().getFullYear();
		    for (let year = currentYear; year >= currentYear - 80; year--) {
  				this.years.push(year.toString());
		    }
		    for (let month = 1; month <= 12; month++) {
  				this.months.push(month.toString());
		    }
		    for (let day = 1; day <= 31; day++) {
  				this.days.push(day.toString());
		    }
		}
	})
	inform.mount("#inform");
}