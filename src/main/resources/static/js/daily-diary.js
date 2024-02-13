
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

    // 일반 도넛 차트 생성 함수
    function createDoughnutChart(elementId, originalData, maxValue, cutout) {
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
                    circumference: 260, // 도넛 자르기
                    rotation: 230, // 도넛 시작 위치
                    borderRadius: 100,
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


window.onload = function () { buildCalendar(); }    // 웹 페이지가 로드되면 buildCalendar 실행
    
let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);

    let tbodyCalendar = document.querySelector(".calendar > tbody");
    document.getElementById("cal-year").innerText = nowMonth.getFullYear();
    document.getElementById("cal-month").innerText = nowMonth.toLocaleDateString('en-US', { month: 'short' });

    while (tbodyCalendar.rows.length > 0) {
        tbodyCalendar.deleteRow(tbodyCalendar.rows.length - 1);
    }

    let nowRow = tbodyCalendar.insertRow();

    for (let j = 0; j < firstDate.getDay(); j++) {
        let nowColumn = nowRow.insertCell();
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {
        let nowColumn = nowRow.insertCell();

        let newDIV = document.createElement("a");
        newDIV.innerHTML = leftPad(nowDay.getDate());
        nowColumn.appendChild(newDIV);

        if (nowDay.getDay() == 6) {
            nowRow = tbodyCalendar.insertRow();
        }

        if (nowDay < today) {
            newDIV.className = "past-day";
            newDIV.onclick = function () { choiceDate(this); }
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDIV.className = "today choice-day"; // 현재 날짜에 choice-day 클래스 추가
            newDIV.onclick = function () { choiceDate(this); }
        }
        else {
            newDIV.className = "future-day";
            newDIV.onclick = function () { choiceDate(this); }
        }
    }
    



// 날짜 선택
function choiceDate(newDIV) {
    if (document.getElementsByClassName("choice-day")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choice-day")[0].classList.remove("choice-day");  // 해당 날짜의 "choiceDay" class 제거
    }
    newDIV.classList.add("choice-day");           // 선택된 날짜에 "choiceDay" class 추가
	let selectedDay = newDIV.textContent;
	console.log(selectedDay);
	selectedDay = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
	let selectedYear = document.querySelector("#cal-year").textContent;
	let selectedMonthAbb = document.querySelector("#cal-month").textContent;
	let selectedMonth = monthAbbreviationToNumber(selectedMonthAbb);
	let selectedDate = selectedYear+"-"+selectedMonth+"-"+selectedDay;
	console.log(selectedDate);

	let popupCalendar = document.querySelector(".calendar-container"); 
	let calButton = document.querySelector(".calendar-section button")
	calButton.onclick = async function(e) {
		e.preventDefault();
		
	    let response = await fetch(`/api/eatings?selectedDate=${selectedDate}`);
	    let datas = await response.json();
	    console.log(datas);
	    console.log(datas[0].sumKcal);
	    
	    let graphSection = document.querySelector(".graph-section");
	    
	    graphSection.innerHTML = "";
	    
	    for (let m of datas) {
	    	console.log(m.sumKcal);
		    let template = `
		        <canvas id="kcal"></canvas>
	        	<div class="chart-inf">
	            <div class="font-size:1 font-weight:bold">
					<a href="/member/eating/daily-detail">하루 섭취 칼로리</a>
				</div>
		            <div>
						<a href="/member/eating/daily-detail">
			                <span class="d:inline-block font-size:8 font-weight:bold">${m.sumKcal}</span>
			                <span class="d:inline-block font-size:2 font-weight:bold color:text-6 ml:1"> kcal</span>
		            	</a>
		            </div>
	        	</div>
			
				<section class="nutri-info">
		        	<section class="nutri-chart">
			            <ul class="d:flex md:d:flex">
			                <li class="position:relative">
			                    <canvas id="carb"></canvas>
			                    <div class="mt:2">
			                        <span class="font-weight:bold">탄수화물</span>
			                    </div>
			                    <div class="nutri-detail position:relative">
			                        <a href="/member/eating/daily-detail">
				                        <span class="font-size:0 font-weight:bold">${m.sumCarb}</span>
				                        <span class="font-size:-1 font-weight:bold color:text-6">g</span>
			                    	</a>
			                    </div>
			                    
			                </li>
			                <li class="position:relative">
			                    <canvas id="pro"></canvas>
			                    <div class="mt:2">
			                        <div class="font-weight:bold">단백질</div>
			                        <div class="nutri-detail position:relative">
			                            <a href="/member/eating/daily-detail">
				                            <span class="font-size:0 font-weight:bold">${m.sumPro}</span>
				                            <span class="font-size:-1 font-weight:bold color:text-6">g</span>
			                        	</a>
			                        </div>  
			                    </div>    
			                </li>
			                <li class="position:relative">
			                    <canvas id="sugar"></canvas>
			                    <div class="mt:2">
			                        <div class="font-weight:bold">당</div>
			                        <div class="nutri-detail position:relative">
			                            <a href="/member/eating/daily-detail">
				                            <span class="font-size:0 font-weight:bold">${m.sumSugar}</span>
				                            <span class="font-size:-1 font-weight:bold color:text-6">g</span>
			                        	</a>
			                        </div>
			                    </div>
			                </li>
			                <li class="md:d:none position:relative">
			                    <canvas id="etc"></canvas>
			                    <div class="mt:2">
			                        <div class="font-weight:bold">기타</div>
			                        <div class="nutri-detail position:relative">
			                            <a href="/member/eating/daily-detail">
				                            <span class="font-size:0 font-weight:bold">${m.etc}</span>
				                            <span class="font-size:-1 font-weight:bold color:text-6">g</span>
			                        	</a>
			                        </div>
			                    </div>
			                </li>
				
		                    <li class="d:none md:d:inline-block position:relative">
		                        <canvas id="fat"></canvas>
		                        <div class="mt:2">
		                            <div class="font-weight:bold">지방</div>
		                            <div class="nutri-detail position:relative">
		                                <a href="/member/eating/daily-detail">
			                                <span class="font-size:0 font-weight:bold">${m.sumFat}</span>
			                                <span class="font-size:-1 font-weight:bold color:text-6">g</span>
		                            	</a>
		                            </div>
		                        </div>
		                    </li>
		                    <li class="d:none md:d:inline-block position:relative">
		                        <canvas id="na"></canvas>
		                        <div class="mt:2">
		                            <div class="font-weight:bold">나트륨</div>
		                            <div class="nutri-detail position:relative">
		                                <a href="/member/eating/daily-detail">
			                                <span class="font-size:0 font-weight:bold">${m.sumNa}</span>
			                                <span class="font-size:-1 font-weight:bold color:text-6">mg</span>
		                            	</a>
		                            </div>
		                        </div>
		                    </li>
		                    <li class="d:none md:d:inline-block position:relative">
		                        <canvas id="chol"></canvas>
		                        <div class="mt:2">
		                            <div class="font-weight:bold">콜레스테롤</div>
		                            <div class="nutri-detail position:relative">
		                                <a href="/member/eating/daily-detail">
			                                <span class="font-size:0 font-weight:bold">${m.sumChol}</span>
			                                <span class="font-size:-1 font-weight:bold color:text-6">mg</span>
		                            	</a>
		                            </div>
		                        </div>
		                    </li>
						</ul>
					</section>
				</section>
		    `;
	
	    	graphSection.insertAdjacentHTML("beforeend", template);
	    	
	    	// health-chart 도넛 차트 생성
		    createHealthChart('kcal', m.sumKcal, 2480);
		
		    // 도넛 차트 생성
		    createDoughnutChart('carb', m.sumCarb, 400, '75%');
		    createDoughnutChart('pro', m.sumPro, 100, '70%');
		    createDoughnutChart('sugar', m.sumSugar, 50, '70%');
		    createDoughnutChart('etc', etc, 100, '70%');
		    createDoughnutChart('fat', m.sumFat, 50, '70%');
		    createDoughnutChart('na', m.sumNa, 3000, '70%');
		    createDoughnutChart('chol', m.sumChol, 3000, '70%');
			
			document.body.style.top = 'auto';
			document.body.style.overflow = 'auto';
			document.body.style.padding = '';
	        popupCalendar.classList.add("d:none");
	    	}
		}
	}
}

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}


function leftPad(value) {
    
    return value;
}


function monthAbbreviationToNumber(month) {
    const monthMap = {
        "Jan": "1",
        "Feb": "2",
        "Mar": "3",
        "Apr": "4",
        "May": "5",
        "Jun": "6",
        "Jul": "7",
        "Aug": "8",
        "Sep": "9",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    };

    return monthMap[month] || null; // 해당 약어에 대한 숫자를 반환하거나, 약어가 일치하지 않을 경우 null을 반환
}

  