	//모달 import
	import Modal from '/js/lib/health_Modal.js'; 
	
	
	
		document.addEventListener("DOMContentLoaded", function() {
	  // 로그인 상태에 따라 모달을 표시하거나 숨깁니다.
	  const isLoggedIn = !!document.getElementById('sessionId');
	  const noLoginHealthModal = new Modal({
	    title: '건강 그래프는 가입한 회원만 이용할 수 있어요!',
	    content: '로그인 후 이용 가능한 서비스입니다',
	    btnText: '로그인 하러 가기'
	  })
		
		// 로그인 상태에 따라 모달에 'blur' 클래스를 추가하거나 제거
		if (!isLoggedIn) {
		    noLoginHealthModal.blur();
		  }
		 
  		
  		fetch('/api/user/details')
	  .then(response => {
	    if (!response.ok) {
	      throw new Error('Network response was not ok');
	    }
	    return response.json();
	  })
	  .then(userDetails => {
		  const userWeight = userDetails.userWeight 
		  const userHeight = userDetails.userHeight 
		  const userGender = userDetails.userGender 
		  const userYear = userDetails.userYear 
		  
		  
		  
		  // 사용자 정보가 누락되거나 null인 경우를 확인합니다.
		  const userDetailsMissing = [userWeight, userHeight, userGender, userYear].includes(null);
		  if (userDetailsMissing && isLoggedIn) {
		    const noInfoHealthModal = new Modal({
		        title: '누락된 건강 정보가 있습니다!', // 모달 제목
		        content: '마이페이지에서 건강 정보를 입력해주세요', // 모달 내용
		        btnText: '마이 페이지 가기'
		    });
		    noInfoHealthModal.blur();
		    noLoginHealthModal.close();
		}
		if (isLoggedIn && !userDetailsMissing) {
	      // 로그인되어 있고 모든 사용자 정보가 있는 경우 모달을 닫습니다.
			 noLoginHealthModal.close();
	    }
	})
    });
    
   
   // 차트 인스턴스를 저장할 객체
   const charts = {};
   
   //데이터 가져오기
   let carb = document.querySelector('.carb').getAttribute('data-carb');
   let pro = document.querySelector('.pro').getAttribute('data-pro');
   let sugar = document.querySelector('.sugar').getAttribute('data-sugar');
   let total = document.querySelector('.total').getAttribute('data-total');
   let fat = document.querySelector('.fat').getAttribute('data-fat');
   let na = document.querySelector('.na').getAttribute('data-na');
   let chol = document.querySelector('.chol').getAttribute('data-chol');
   let kcal = document.querySelector('.kcal').getAttribute('data-kcal');

   fetch('/api/user/details')
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(userDetails => {
       // 사용자 상세 정보를 사용하여 DOM을 업데이트하거나 다른 작업을 수행합니다.
      
                
         //회원 나이 계산을 위한 현재 년도 가져오기       
          var now = new Date();   // 현재 날짜 및 시간
         var nowYear = now.getFullYear();   // 연도
   
                
         const userWeight = userDetails.userWeight;
         const userHeight = userDetails.userHeight;
           const userGender = userDetails.userGender;   
         const userYear = nowYear-userDetails.userYear;
        
        // BMR 계산
        const bmr = calculateBMR(userWeight, userHeight, userYear, userGender);
      
      
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
                           circumference: 260, //도넛 자르기
                           rotation:230, //도넛 시작 위치
                           borderRadius:100,
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
        
        // health-chart 도넛 차트 생성
       createHealthChart('health-chart', kcal, bmr);

     })
     .catch(error => {
       console.error('Fetch error:', error);
     });
     
     // 사용자의 상세 정보를 이용하여 BMR을 계산하는 함수
   function calculateBMR(userWeight, userHeight, userYear, userGender) {
       let bmr = (10 * userWeight) + (6.25 * userHeight) - (5 * userYear);
         if (userGender === "남성") {
           bmr += 5;
       } else if (userGender === "여성") {
           bmr -= 161;
       }
       
     
       
       return bmr;
   }
   
   // 100g,100ml당 환산을 수행하는 함수
   function convertToPer100g(value, servingSize) {
       // servingSize가 0이면 나눗셈 오류를 방지하기 위해 0을 반환
       if (servingSize === 0) 
       return 0;
       // 100g 또는 100ml 당으로 환산
       return (value / servingSize) * 100;
       
       }

   // 크기를 계산하는 함수 추가
   function calculateSize(value, maxValue) {
       const ratio = value / maxValue;
       return `${Math.floor(ratio * 100)}%`;  // 비율을 퍼센트로 반환
   }

    // 차트들의 색상을 결정하는 함수
    function getColor(value, max) {
        var ratio = value / max;
        if (ratio > 0.7) {
            return '#FF6B78';
        } else if (ratio > 0.5) {
            return '#FFAB47';
        } else {
            return '#585CE5';
        }
    }
    
    // 현재 serving size 모드를 추적하는 변수 추가
   let currentServingSizeMode = 'serving'; // 초기 값은 'serving'으로 설정


   document.addEventListener("DOMContentLoaded", async function() {
   
    // '100g당' 버튼이 이미 클릭되었는지를 추적하는 플래그
   let isPer100gActive = false;
   
   
   // '100ml당' 버튼 클릭 시 색상 변경
   const nutriPer100mlBtn = document.querySelector('.btn-nutri_ml');
   const nutriPerServingBtn = document.querySelector('.btn-nutri_total');
   
   // '1회분' 버튼 클릭 시 색상 변경
   nutriPerServingBtn.addEventListener('click', function() {

      // 이미 'serving' 모드에 있으면 업데이트를 하지 않습니다.
        if (currentServingSizeMode === 'serving') return;
  
       // '1회분' 버튼에 'active' 클래스를 토글합니다.
       this.classList.add('nutri-btn-active');
       this.classList.remove('nutri-btn-inactive');
       // '100ml당' 버튼의 'inactive' 클래스를 제거합니다.
       nutriPer100mlBtn.classList.add('nutri-btn-inactive');
       
        if (isPer100gActive) {
      // 차트를 원래의 데이터로 업데이트합니다.
       updateDoughnutChart(charts.myChart, parseInt(carb), 2480);
       updateDoughnutChart(charts.myChart2, parseInt(pro), 100);
       updateDoughnutChart(charts.myChart3, parseInt(sugar), 50);
       updateDoughnutChart(charts.myChart4, parseInt(total), 100);
       updateDoughnutChart(charts.myChart5, parseInt(fat), 50);
       updateDoughnutChart(charts.myChart6, parseInt(na), 1000);
       updateDoughnutChart(charts.myChart7, parseInt(chol), 1000);
   
       // 페이지의 텍스트를 원래 데이터로 업데이트합니다.
       document.querySelector('.carb').textContent = carb;
       document.querySelector('.pro').textContent = pro;
       document.querySelector('.sugar').textContent = sugar;
       document.querySelector('.total').textContent = total;
       document.querySelector('.fat').textContent = fat;
       document.querySelector('.na').textContent = na;
       document.querySelector('.chol').textContent = chol;
   
       // '100ml당' 상태를 비활성화로 설정합니다.
       isPer100gActive = false;
       
       }
        currentServingSizeMode = 'serving';
   });
      
    // '100ml당' 버튼 클릭 시 차트 업데이트
    //100ml,100g당 버튼을 클릭하면 호출되는 이벤트리스너
    const nutriPerlBtn = document.querySelector('.btn-nutri_100ml');
    nutriPerlBtn.addEventListener('click', function() {
   
    // '100ml당' 버튼에 'active' 클래스를 토글합니다.
    this.classList.add('nutri-btn-active');
    this.classList.remove('nutri-btn-inactive');
    // '1회분' 버튼의 'inactive' 클래스를 제거합니다.
    nutriPerServingBtn.classList.add('nutri-btn-inactive');
   
   // 버튼이 이미 한 번 클릭되었다면 함수를 종료.
    if (isPer100gActive) return;
   
       // servingSize 가져오기 및 파싱
    let servingSize = parseFloat(document.querySelector('.btn-nutri_total').getAttribute('data-serving-size'));
    
    // 데이터 가져오기 (예시: 성분의 값과 serving_size를 가져옵니다.)
    let carbPer100g = convertToPer100g(parseInt(carb), servingSize);
    let proPer100g = convertToPer100g(parseInt(pro), servingSize);
    let sugarPer100g = convertToPer100g(parseInt(sugar), servingSize);
    let totalPer100g = convertToPer100g(parseInt(total), servingSize);
    let fatPer100g = convertToPer100g(parseInt(fat), servingSize);
    let naPer100g = convertToPer100g(parseInt(na), servingSize);
    let cholPer100g = convertToPer100g(parseInt(chol), servingSize);
    
    // 차트 업데이트 로직
    updateDoughnutChart(charts.myChart, carbPer100g, 2480);
    updateDoughnutChart(charts.myChart2, proPer100g, 100);
    updateDoughnutChart(charts.myChart3, sugarPer100g, 50);
    updateDoughnutChart(charts.myChart4, totalPer100g, 100);
    updateDoughnutChart(charts.myChart5, fatPer100g, 50);
    updateDoughnutChart(charts.myChart6, naPer100g, 1000);
    updateDoughnutChart(charts.myChart7, cholPer100g, 1000);
    
    // 페이지의 텍스트 업데이트 로직
    document.querySelector('.carb').textContent = carbPer100g.toFixed(0);
    document.querySelector('.pro').textContent = proPer100g.toFixed(0);
    document.querySelector('.sugar').textContent = sugarPer100g.toFixed(0);
    document.querySelector('.total').textContent = totalPer100g.toFixed(0);
    document.querySelector('.fat').textContent = fatPer100g.toFixed(0);
    document.querySelector('.na').textContent = naPer100g.toFixed(0);
    document.querySelector('.chol').textContent = cholPer100g.toFixed(0);
    
    // '100g당' 상태를 활성화로 설정합니다.
    isPer100gActive = true;
});
    
   
   // 차트 업데이트 함수
   function updateDoughnutChart(chart, newData, maxValue) {
    chart.data.datasets[0].data[0] = newData;
    chart.data.datasets[0].data[1] = maxValue - newData;
    chart.update();
   }

    // 일반 도넛 차트 생성 함수
    function createDoughnutChart(elementId, originalData, maxValue, cutout) {
        var ctxElement = document.getElementById(elementId);
        if (ctxElement === null) {
            console.error(`Element with id ${elementId} not found`);
            return;
        }
        
        var size = calculateSize(originalData, maxValue);
        
      
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
    

    // 바 차트 생성 함수
    function createBarChart(elementId, originalData, maxValue, label, xMax) {
        var ctxElement = document.getElementById(elementId);
        if (ctxElement === null) {
            console.error(`Element with id ${elementId} not found`);
            return;
        }
        var ctx = ctxElement.getContext('2d');
        var remaining = maxValue - originalData;
        var chartData = [originalData, remaining];

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [label],
                datasets: [{
                    data: chartData,
                    backgroundColor: getColor(originalData, maxValue),
                    borderWidth: 0,
                }]
            },
            options: {
                borderSkipped: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false,
                    },
                },
                scales: {
                    y: {
                        display: false
                    },
                    x: {
                        display: false,
                        min: 0,
                        max: xMax,
                    }
                },
                barThickness: 200,
            }
        });
    }

   // 도넛 차트 생성 및 저장 (초기 로드 시)
   charts.myChart = createDoughnutChart('myChart', parseInt(carb), 2480, '70%');
   charts.myChart2 = createDoughnutChart('myChart2', parseInt(pro), 100, '70%');
   charts.myChart3 = createDoughnutChart('myChart3', parseInt(sugar), 50, '70%');
   charts.myChart4 = createDoughnutChart('myChart4', parseInt(total), 100, '70%');
   charts.myChart5 = createDoughnutChart('myChart5', parseInt(fat), 50, '70%');
   charts.myChart6 = createDoughnutChart('myChart6', parseInt(na), 1000, '70%');
   charts.myChart7 = createDoughnutChart('myChart7', parseInt(chol), 1000, '70%');
   
   // 바 차트 생성
       createBarChart('bar-chart1', carb, 324, "탄수화물", 324);
       createBarChart('bar-chart2', sugar, 100, "당류", 100);
       createBarChart('bar-chart3', na, 2000, "나트륨", 2000);
       createBarChart('bar-chart4', fat, 54, "지방", 54);
       createBarChart('bar-chart5', pro, 55, "단백질", 55);
   
    // 차트 업데이트 함수
   function updateDoughnutChart(chart, newData) {
       // 데이터셋의 첫 번째 요소를 새로운 데이터로 업데이트
       chart.data.datasets[0].data[0] = newData;
       // 나머지 데이터셋은 총합에서 새 데이터를 뺀 값으로 설정
       chart.data.datasets[0].data[1] = chart.data.datasets[0].data[1] - newData;
       // 차트 갱신
       chart.update();
}
    
    });