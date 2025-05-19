document.addEventListener("DOMContentLoaded", function () {
  // Make sure Flickity runs on your slider
  var slideshow = document.querySelector('.Slideshow__Carousel');
  if (!slideshow) return;

  var flkty = new Flickity(slideshow, {
    prevNextButtons: false,
    setGallerySize: true,
    adaptiveHeight: true,
    wrapAround: true,
    dragThreshold: 15,
    pauseAutoPlayOnHover: false,
    autoPlay: 8000,
    pageDots: true
  });

  // Ensure first slide is visible
  var firstSlide = document.querySelector('.Slideshow__Slide');
  if (firstSlide) {
    firstSlide.style.visibility = 'visible';
    firstSlide.style.opacity = '1';
    firstSlide.style.position = 'relative';
  }

  // Optional: Re-trigger fade-up animation
  flkty.on('change', function(index) {
    const cells = document.querySelectorAll('.Carousel__Cell');
    cells.forEach((cell, i) => {
      if (i === index) {
        cell.classList.remove('is-selected');
        // Trigger reflow
        void cell.offsetWidth;
        cell.classList.add('is-selected');
      } else {
        cell.classList.remove('is-selected');
      }
    });
  });

  // Force lazy images to load (basic fix if lazy-loading isn't working)
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.setAttribute('src', img.getAttribute('data-src'));
  });
  document.querySelectorAll('img[data-srcset]').forEach(img => {
    img.setAttribute('srcset', img.getAttribute('data-srcset'));
  });
});

let index = 0;
const slide = document.getElementById("carousel");
const dots = document.getElementById("dots").children;
const total = slide.children.length;

function updateCarousel() {
  const slideWidth = slide.clientWidth / total; // Let change it too 400
  slide.style.transform = `translateX(${-slide.clientWidth * index}px)`;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[index].classList.add("active");
}

function moveSlide(direction) {
  index += direction;
  if (index < 0) index = total - 1;
  if (index >= total) index = 0;
  updateCarousel();
}

function goToSlide(i) {
  index = i;
  updateCarousel();
}

// // Auto slide every 3 seconds
// setInterval(() => {
//   moveSlide(1);
// }, 3000);

// Swipe support (finger or mouse)
let startX = 0;
const carouselContainer = document.getElementById("carousel-container");

carouselContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carouselContainer.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) moveSlide(1); // swipe left
  if (endX - startX > 50) moveSlide(-1); // swipe right
});

// (optional) mouse drag support
let isDragging = false;
carouselContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
});
carouselContainer.addEventListener("mouseup", (e) => {
  if (isDragging) {
    const endX = e.clientX;
    if (startX - endX > 50) moveSlide(1);
    if (endX - startX > 50) moveSlide(-1);
    isDragging = false;
  }
});

// Initialize
updateCarousel();






// Swiper JS
const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',  // Allows slides to size automatically
  loop: true, // 🔁 makes it loop
  grabCursor: true, // 👆 cursor changes
  centeredSlides: true, // center active card
  slidesPerView: "auto", // multiple cards on screen
  spaceBetween: 20, // space between cards
});


// Play and Stop Video
document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector('.player-botton');
  const videoId = button.getAttribute('data-id');
  const video = document.getElementById('video-' + videoId);

  const playIcon = button.querySelector('.play');
  const stopIcon = button.querySelector('.stop');

  // Initially show pause (stop) icon, hide play icon
  playIcon.style.display = 'none';
  stopIcon.style.display = 'block';

  button.addEventListener('click', function() {
      if (video.paused) {
          video.play();
          playIcon.style.display = 'none';
          stopIcon.style.display = 'block';
          button.setAttribute('data-status', 'false');
      } else {
          video.pause();
          playIcon.style.display = 'block';
          stopIcon.style.display = 'none';
          button.setAttribute('data-status', 'true');
      }
  });
});

//Flickity
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector('.TestimonialList');  // Or '.testimonials-lists-Carousel' if you changed HTML
  if (!carousel) return;

  const testimonialFlickity = new Flickity(carousel, {
    draggable: false, // Disable the built-in drag (since you're controlling swipe behavior with custom JS)
    prevNextButtons: false,
    wrapAround: true,
    pageDots: true,
    autoPlay: 4000,
    fade: true // Optional, to apply fade transition
  });

  let testimonialStartX = 0;
  let testimonialIsDown = false;
  let testimonialMoved = false;
  let delayTimer = null; // Timer for the delay

  // Mouse events
  carousel.addEventListener('mousedown', (e) => {
    testimonialIsDown = true;
    testimonialStartX = e.pageX;
    testimonialMoved = false;
  });

  carousel.addEventListener('mousemove', () => {
    if (testimonialIsDown) testimonialMoved = true;
  });

  carousel.addEventListener('mouseup', (e) => {
    if (!testimonialIsDown || !testimonialMoved) return;

    const deltaX = e.pageX - testimonialStartX;

    // Introduce a delay before changing the carousel
    if (delayTimer) clearTimeout(delayTimer);  // Clear any previous timeout

    delayTimer = setTimeout(() => {
      if (deltaX > 50) testimonialFlickity.previous();
      else if (deltaX < -50) testimonialFlickity.next();
    }, 300); // 300ms delay before changing the carousel (you can adjust this value)
    
    testimonialIsDown = false;
    testimonialMoved = false;
  });

  carousel.addEventListener('mouseleave', () => {
    testimonialIsDown = false;
    testimonialMoved = false;
  });

  // Touch events
  carousel.addEventListener('touchstart', (e) => {
    testimonialStartX = e.touches[0].pageX;
    testimonialMoved = false;
  });

  carousel.addEventListener('touchmove', () => {
    testimonialMoved = true;
  });

  carousel.addEventListener('touchend', (e) => {
    if (!testimonialMoved) return;
    
    const deltaX = e.changedTouches[0].pageX - testimonialStartX;

    // Introduce a delay before changing the carousel
    if (delayTimer) clearTimeout(delayTimer);  // Clear any previous timeout

    delayTimer = setTimeout(() => {
      if (deltaX > 50) testimonialFlickity.previous();
      else if (deltaX < -50) testimonialFlickity.next();
    }, 300); // 300ms delay before changing the carousel (you can adjust this value)

    testimonialMoved = false;
  });
});






document.querySelectorAll('.Footer_link__Title').forEach((title, index) => {
  const iconToggle = title.querySelector('.plus-minus-icon');
  const content = title.nextElementSibling;

  title.addEventListener('click', () => {
    content.classList.toggle('expanded');
    iconToggle.classList.toggle('active');
  });
});

function handleFooterExpansion() {
  document.querySelectorAll('.Footer__Content').forEach(content => {
    if (window.innerWidth >= 789) {
      content.classList.add('expanded');
    } else {
      content.classList.remove('expanded');
    }
  });
}

// Run on load
handleFooterExpansion();

// Run on resize
window.addEventListener('resize', handleFooterExpansion);

//Toggle details
if (window.innerWidth <= 788) {
  document.querySelectorAll('.Footer_link__Title').forEach((title, index) => {
    const iconToggle = title.querySelector('.plus-minus-icon');
    const content = title.nextElementSibling;

    title.addEventListener('click', () => {
      content.classList.toggle('expanded');
      iconToggle.classList.toggle('active');
    });
  });
} 
else {
  document.querySelectorAll('.Footer__Content').forEach(el => el.classList.remove('Footer__Content'));

}


//Toggle Drawer 
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('[data-action="open-drawer"]');
  const sidebar = document.getElementById('sidebar-menu');
  const closeBtn = document.querySelector('[data-action="close-drawer"]');
  const body = document.body;  // Accessing the body element
  const headerWrapper = document.querySelector('.Header__Wrapper'); // Target the nav bar
  const logoIcon = document.querySelector('.Header__FlexItem.Header__FlexItem--logo'); // Target the nav bar
  const burgerIcons = document.querySelectorAll('.burger-icon');
  const logoPrimary = document.querySelector('.Header__LogoImage--primary');
  const logoTransparent = document.querySelector('.Header__LogoImage--transparent');
  const cartIcon = document.querySelector('.Icon--cart');


  // Open sidebar
  hamburger.addEventListener('click', function () {
    sidebar.classList.toggle('Drawer--isOpen');
    sidebar.setAttribute('aria-hidden', 'false');
    hamburger.classList.toggle('is-active');

    // Disable body scroll when the sidebar is open
    if (sidebar.classList.contains('Drawer--isOpen')) {
      body.classList.add('body-no-scroll');  // Add the class to disable scroll
      headerWrapper.classList.add('header--dark'); // Add dark class to header


      burgerIcons.forEach(icon => icon.classList.add('header--white'));

      // Show white logo, hide black logo
      logoPrimary.classList.add('logo--hide');
      logoTransparent.classList.add('logo--show');

      cartIcon.classList.add('icon--white');
    } else {
      body.classList.remove('body-no-scroll');  // Remove the class to enable scroll again
      headerWrapper.classList.remove('header--dark'); // Remove dark class from header
      
      burgerIcons.forEach(icon => icon.classList.remove('header--white')); // Remove dark class from header

      // Show black logo, hide white logo
      logoPrimary.classList.remove('logo--hide');
      logoTransparent.classList.remove('logo--show');

      cartIcon.classList.remove('icon--white');
    }
  });

  // Close sidebar
  closeBtn.addEventListener('click', function () {
    sidebar.classList.remove('Drawer--isOpen');
    sidebar.setAttribute('aria-hidden', 'true');
    body.classList.remove('body-no-scroll');  // Ensure scroll is enabled when sidebar is closed
    headerWrapper.classList.remove('header--dark'); // Ensure the header returns to normal color
   
    burgerIcons.forEach(icon => icon.classList.remove('header--white'));
    cartIcon.classList.remove('icon--white');
 // Ensure the header returns to normal color
  });

  // Optional: click outside to close
  document.addEventListener('click', function (e) {
    if (
      sidebar.classList.contains('Drawer--isOpen') &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      sidebar.classList.remove('Drawer--isOpen');
      sidebar.setAttribute('aria-hidden', 'true');
      hamburger.classList.remove('is-active');
      body.classList.remove('body-no-scroll');  // Disable scroll when closing the sidebar
      headerWrapper.classList.remove('header--dark');
     
      burgerIcons.classList.remove('header--white');
      cartIcon.classList.remove('icon--white');
    }
  });
});
