document.addEventListener("DOMContentLoaded", function() {
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
	
	let request = new XMLHttpRequest();
    request.open("GET", "/api/eating", true);

    request.onload = function() {
        // 응답 데이터를 JSON으로 파싱
        let response = JSON.parse(request.responseText);
        console.log(response);
        
        if (response.length === 0) {
			    response = [{
			        sumKcal: 0,
			        sumCarb: 0,
			        sumPro: 0,
			        sumSugar: 0,
			        etc: 0,
			        sumFat: 0,
			        sumNa: 0,
			        sumChol: 0
			    }];
			}
        let sumKcal = response[0].sumKcal;
        let sumCarb = response[0].sumCarb;
        let sumPro = response[0].sumPro;
        let sumSugar = response[0].sumSugar;
        let sumFat = response[0].sumFat;
        let sumNa = response[0].sumNa;
        let sumChol = response[0].sumChol;
        
		// health-chart 도넛 차트 생성
		createHealthChart('kcal', sumKcal, 2480);
		
		// 바 차트 생성
		createBarChart('carb', sumCarb, 400, "탄수화물", 1000);
	    createBarChart('sugar', sumSugar, 50, "당류", 100);
	    createBarChart('pro', sumPro, 100, "단백질", 200);
	    createBarChart('fat', sumFat, 50, "지방", 50);
	    createBarChart('na', sumNa, 3000, "나트륨", 5000);
	    createBarChart('chol', sumChol, 3000, "콜레스테롤", 5000);
	};
    request.send();
	
});






