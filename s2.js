const slides = document.querySelectorAll('.slide-content');

const files = [
  "p1/p1.html", // Path to content for slide 1
  "p2/p2.html", // Path to content for slide 2
  "p3/p3.html", // Path to content for slide 3
];

// Define an array to keep track of whether each slide's content has been loaded
const slideContentLoaded = [false, false, false];

// Flag to check if swiper has been initialized
let swiperInitialized = false;

// Load content for the first slide on page load
fetchContent(slides[0], files[0], 0);

function fetchContent(slideElement, fileName, index) {
  fetch(fileName)
    .then(response => response.text())
    .then(data => {
      slideElement.innerHTML = data;
      // Mark the slide's content as loaded
      slideContentLoaded[index] = true;

      // Check if content of slide 2 is loaded, then initialize swiper2
      if (index === 1 && !swiperInitialized) {
        initializeSwiper2();
        setTimeout(() => {
        const vvElements = document.querySelectorAll('.cc');
        vvElements.forEach(element => {
          element.classList.add('loaded');
        });
        }, 5000);
      } else if (index === 2) {
        // Add class "loaded" to elements with class "ff"
        const ffElements = document.querySelectorAll('.ff');
        ffElements.forEach(element => {
          element.classList.add('loaded');
        });
      }
    })
    .catch(error => {
      console.error(`Error loading content for ${fileName}:`, error);
    });
}

function initializeSwiper2() {
  swiper2 = new Swiper(".mySwiper2", {
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    direction: 'horizontal',
    loop: false,
    lazy: true,
    zoom: true,
    pagination: {
      el: ".swiper-pagination2",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });

  swiperInitialized = true; // Set the flag to true after initialization
}

// Load content for other slides when they become active
swiper.on('slideChange', function () {
  const currentSlideIndex = this.activeIndex;
  const currentSlide = slides[currentSlideIndex];
  const contentFileName = files[currentSlideIndex];

  // Check if content is already loaded, skip fetching if so
  if (!slideContentLoaded[currentSlideIndex]) {
    fetchContent(currentSlide, contentFileName, currentSlideIndex);
  }

  setTimeout(() => {
    // Re-initialize pagination elements after slide 2 content is loaded
    if (currentSlideIndex === 1 && slideContentLoaded[currentSlideIndex]) {
      const paginationElements = document.querySelectorAll('.swiper-pagination2 span');
      paginationElements.forEach((spanElement, index) => {
        spanElement.id = `pagination-bullet`;
      });
     

    }
  }, 5000); 

  
});
