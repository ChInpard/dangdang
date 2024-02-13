document.addEventListener('DOMContentLoaded', function() {
  const productBox = document.querySelector('.product-box'); // 스크롤할 요소 선택
  let isDown = false;
  let startX;
  let scrollLeft;

  productBox.addEventListener('mousedown', (e) => {
    isDown = true;
    productBox.classList.add('active');
    startX = e.pageX - productBox.offsetLeft;
    scrollLeft = productBox.scrollLeft;
  });

  productBox.addEventListener('mouseleave', () => {
    isDown = false;
    productBox.classList.remove('active');
  });

  productBox.addEventListener('mouseup', () => {
    isDown = false;
    productBox.classList.remove('active');
  });

  productBox.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - productBox.offsetLeft;
    const walk = (x - startX) * 1.25; //스크롤 속도 조절을 위해 2를 곱하거나 조절할 수 있습니다.
    productBox.scrollLeft = scrollLeft - walk;
  });
  
  

});
