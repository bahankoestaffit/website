
  (function ($) {
  "use strict";
    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-0;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });

    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        items:3,
        autoplay: true,
         autoplayTimeout: 3000,
      smartSpeed: 700,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
            },
            768:{
                items: 2,
            },
            1200:{
                items: 3,
            }
        }
    });
  
  })(window.jQuery);


/////////////////////////
//TOMBOL KEMBALI KEATAS//
/////////////////////////  
document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    // Tampilkan tombol saat user scroll ke bawah
    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    });

   
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".podcast-container");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const cards = Array.from(document.querySelectorAll(".custom-block"));

  let index = 0;
  const visible = 2;
  const total = cards.length;

  function getCardWidth() {
    const style = window.getComputedStyle(container);
    const gap = parseInt(style.gap) || 0;
    // offsetWidth sudah termasuk padding + border
    return cards[0].offsetWidth + gap;
  }

  function updateSlide(animate = true) {
    const cardWidth = getCardWidth();
    const maxIndex = total - visible;

    // pastikan index tidak pernah melebihi batas logis
    if (index > maxIndex) index = 0;
    if (index < 0) index = maxIndex;

    container.style.transition = animate ? "transform 0.5s ease" : "none";
    container.style.transform = `translateX(-${index * getCardWidth()}px)`;
  }

  nextBtn.addEventListener("click", () => {
    const maxIndex = total - visible;
    index = index >= maxIndex ? 0 : index + 1;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    const maxIndex = total - visible;
    index = index <= 0 ? maxIndex : index - 1;
    updateSlide();
  });

  // Recalculate when resized
  window.addEventListener("resize", () => updateSlide(false));
  updateSlide(false);
});


function slideArticles(direction) {
  const container = document.getElementById('articleContainer');
  const scrollAmount = 350; // jarak geser per klik
  if (direction === 'next') {
    container.scrollLeft += scrollAmount;
  } else {
    container.scrollLeft -= scrollAmount;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector("#article-carousel .row");
  const nextBtn = document.querySelector("#next-article");
  const prevBtn = document.querySelector("#prev-article");

  let scrollAmount = 0;
  const scrollStep = 400; // jarak scroll per klik

  function updateButtons() {
    prevBtn.disabled = scrollAmount <= 0;
    nextBtn.disabled = scrollAmount >= container.scrollWidth - container.clientWidth - 10;
  }

  nextBtn.addEventListener("click", function () {
    container.scrollBy({ left: scrollStep, behavior: "smooth" });
    scrollAmount += scrollStep;
    updateButtons();
  });

  prevBtn.addEventListener("click", function () {
    container.scrollBy({ left: -scrollStep, behavior: "smooth" });
    scrollAmount -= scrollStep;
    updateButtons();
  });

  updateButtons();
});


// ===========================
// UNTUK PRODUK
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productsContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cards = container.querySelectorAll(".col-lg-3");
  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 992) return 3;
    return 4;
  }

  function getTotalCards() {
    return cards.length;
  }

  function updateButtons() {
    const cardsPerView = getCardsPerView();
    const totalCards = getTotalCards();
    const maxIndex = totalCards - cardsPerView;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    if (totalCards <= cardsPerView) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "flex";
      nextBtn.style.display = "flex";
    }
  }

  function move(direction) {
    const cardWidth = cards[0].offsetWidth + 24; // termasuk margin/gap
    const cardsPerView = getCardsPerView();
    const totalCards = getTotalCards();
    const maxIndex = totalCards - cardsPerView;

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    container.scrollTo({
      left: cardWidth * currentIndex,
      behavior: "smooth",
    });

    updateButtons();
  }

  prevBtn.addEventListener("click", () => move(-1));
  nextBtn.addEventListener("click", () => move(1));
  window.addEventListener("resize", updateButtons);

  updateButtons();
});






