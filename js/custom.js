
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








