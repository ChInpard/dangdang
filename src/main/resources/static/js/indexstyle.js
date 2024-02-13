window.addEventListener("load", function() {
    let bannerSection = document.querySelector('.banner-container');
    let ul = bannerSection.querySelector('.banner-rolling');
    let firstItemClone = ul.firstElementChild.cloneNode(true);
    ul.appendChild(firstItemClone);
    let itemCount = ul.children.length - 1;
    let currentNum = bannerSection.querySelector('.start');
    let endNum = bannerSection.querySelector('.end');
    endNum.innerText = itemCount;
   let bannerItem = document.querySelector('.banner_item');
   bannerWidth = bannerItem.offsetWidth;

    window.addEventListener('resize', function() {
        bannerWidth = bannerItem.offsetWidth;
    });



    let curIndex = 1;
    let isAnimating = false;
    let autoInterval;

    function moveNext() {
        if (isAnimating) return;
        isAnimating = true;

        ul.style.transition = '2s';
        ul.style.transform = `translate3d(-${bannerWidth * (curIndex + 1)}px, 0px, 0px)`;


        curIndex++;
        currentNum.innerHTML = curIndex;


    if (curIndex === itemCount) {
        ul.addEventListener('transitionend', function resetPosition() {
            ul.style.transition = 'none';  // 'none'으로 변경
            ul.style.transform = 'translate3d(0px, 0px, 0px)';
            ul.removeEventListener('transitionend', resetPosition); // 이벤트 리스너 제거
        });
        curIndex = 0;
    }

        setTimeout(function () {
            isAnimating = false;
        }, 1000);

    }

    function movePrev() {
        if (isAnimating) return;
        isAnimating = true;

    if (curIndex === 0) {
            ul.style.transition = '0s';
            ul.style.transform = `translate3d(-${bannerWidth * itemCount}px, 0px, 0px)`;
            curIndex = itemCount;
        }

        setTimeout(function () {
            ul.style.transition = '2s';
            ul.style.transform = `translate3d(-${bannerWidth * (curIndex - 1)}px, 0px, 0px)`;

/*         console.log("감소전 :" + curIndex)*/
            curIndex--;
            if(curIndex == 0)
               curIndex = 4
            currentNum.innerText = curIndex;



            setTimeout(function () {
                isAnimating = false;
            }, 1000);
        }, 50);

    }

    function startAutoMove() {
        autoInterval = setInterval(moveNext, 3000);
    }

    function stopAutoMove() {
        clearInterval(autoInterval);
    }

    let leftArrow = document.querySelector('.icon-main-arrow-left');
    let rightArrow = document.querySelector('.icon-main-arrow-right');
    let isLeftArrowPressed = false;
    let isRightArrowPressed = false;

    leftArrow.addEventListener('mousedown', function () {
        isLeftArrowPressed = true;
        stopAutoMove();
    });

    leftArrow.addEventListener('mouseup', function () {
        isLeftArrowPressed = false;
        if (!isAnimating && !isRightArrowPressed) {
            movePrev();
            startAutoMove();
        }
    });

    rightArrow.addEventListener('mousedown', function () {
        isRightArrowPressed = true;
        stopAutoMove();
    });

    rightArrow.addEventListener('mouseup', function () {
        isRightArrowPressed = false;
        if (!isAnimating && !isLeftArrowPressed) {
            moveNext();
            startAutoMove();
        }
    });

    document.addEventListener('mouseup', function () {
        if (isLeftArrowPressed || isRightArrowPressed) {
            isLeftArrowPressed = false;
            isRightArrowPressed = false;
            if (!isAnimating) {
                startAutoMove();
            }
        }
    });

    startAutoMove();
});