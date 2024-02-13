window.addEventListener("load", function () {
    let bodyInformBox = this.document.querySelector(".body-inform_box")
    let heightInput = bodyInformBox.querySelector(".height-input");
    let weightInput = bodyInformBox.querySelector(".weight-input")
    let error = bodyInformBox.querySelectorAll(".errorText")
    let submitBtn = bodyInformBox.querySelector(".btn-second")

    const weightPattern = /^[0-9]+$/;
    
    heightInput.onchange = function () {
        let numValue = heightInput.value;
        
        if (weightPattern.test(numValue)) {
            // 유효한 형식일 경우
            error[0].style.display = "none"
            heightInput.classList.remove("error")
            submitBtn.disabled = false; // 제출 버튼 활성화
        } else if (heightInput.value == "") {
            error[0].style.display = "none"
            heightInput.classList.remove("error")
        } else {
            // 불일치할 경우
            heightInput.classList.add("error")
            error[0].style.display = "block"
            submitBtn.disabled = true;
        }
            
    };

    weightInput.onchange = function () {
        let numValue = weightInput.value;
        
        if (weightPattern.test(numValue)) {
            // 유효한 형식일 경우
            error[1].style.display = "none"
            weightInput.classList.remove("error")
            submitBtn.disabled = false; // 제출 버튼 활성화
        } else if (weightInput.value == "") {
            error[1].style.display = "none"
            weightInput.classList.remove("error")
        } else {
            // 불일치할 경우
            weightInput.classList.add("error")
            error[1].style.display = "block"
            submitBtn.disabled = true;
        }
        
    };

});