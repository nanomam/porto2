




  var swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 70,
     lazy: true,
    direction: 'horizontal',
    keyboard: {
      enabled: true,
    },
    loop: false,
    zoom: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
      renderBullet: function (index, className) {
        let icon = `icon${index + 1}.svg`;
        let slideName = document.getElementById(`slide${index + 1}`).getAttribute('data-name');
        return `<span class="${className}" style="background-image: url('${icon}');">${slideName}</span>`;
      }


    }
  });


  function applyScalingClasses() {
    const activeIndex = swiper.activeIndex;
    const paginationBullets = document.querySelectorAll('.swiper-pagination .swiper-pagination-bullet');
    paginationBullets.forEach((bullet, index) => {
      bullet.classList.remove('scaled-active', 'scaled-adjacent', 'scaled-further');
      if (index === activeIndex) {
        bullet.classList.add('scaled-active');
      } else if (index === activeIndex - 1 || index === activeIndex + 1) {
        bullet.classList.add('scaled-adjacent');
      } else if (index === activeIndex - 2 || index === activeIndex + 2) {
        bullet.classList.add('scaled-further');
      }
    });
  }
  applyScalingClasses();
  swiper.on('slideChange', () => {
    applyScalingClasses();
  });
const paginationElements = document.querySelectorAll('.swiper-pagination2 span');

paginationElements.forEach((spanElement, index) => {
  spanElement.id = `pagination-bullet`;
});




