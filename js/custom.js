
(function ($) {
  "use strict";
  // MENU
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });
  // CUSTOM LINK
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - 0;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  });

  $('.owl-carousel').owlCarousel({
    center: true,
    loop: true,
    margin: 30,
    items: 3,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 700,
    responsiveClass: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      }
    }
  });
$('.owl-carousel').on('click', '.owl-item', function() {
  const owl = $('.owl-carousel').data('owl.carousel');
  const index = $(this).index(); // ambil posisi item yang diklik
  owl.to(index, 300); // pindahkan ke posisi index dengan animasi 300ms
});

})(window.jQuery);



document.addEventListener("DOMContentLoaded", function () {
 const container =
  document.querySelector(".podcast-container") ||
  document.getElementById("articleContainer");

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const cards = Array.from(container.querySelectorAll(".custom-block"));


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


// ===========================
// SLIDER ARTIKEL (FINAL VERSION)
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("articleContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const card = container.querySelector(".custom-block.custom-block-full");
  const cardWidth = card.offsetWidth + 35; // jarak antar card (me-3 ~ 35px)
  const visibleCards = 3;
  const totalCards = container.children.length;

  let index = 0;

  function updateButtons() {
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= totalCards - visibleCards;
  }

  nextBtn.addEventListener("click", () => {
    if (index < totalCards - visibleCards) {
      index++;
      container.style.transform = `translateX(-${index * cardWidth}px)`;
      updateButtons();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      container.style.transform = `translateX(-${index * cardWidth}px)`;
      updateButtons();
    }
  });

  updateButtons();
});







// ===========================
// UNTUK PRODUK
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".products-wrapper"); // elemen yang bisa discroll
  const container = document.getElementById("productsContainer"); // row berisi kartu
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cards = container.querySelectorAll(".custom-block.custom-block-overlay");
  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 992) return 3;
    return 4;
  }

  function updateButtons() {
    const cardsPerView = getCardsPerView();
    const totalCards = cards.length;
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
  const cardWidth = cards[0].offsetWidth;
  const gap = 1; // sesuaikan dengan CSS kamu (gap: 1px)
  const cardsPerView = getCardsPerView();
  const totalCards = cards.length;
  const maxIndex = totalCards - cardsPerView;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  // Hitung posisi scroll yang diinginkan
  let scrollAmount = (cardWidth + gap) * currentIndex;

  const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;

  // Tambahkan offset kecil agar pas di batas kanan & kiri
  if (direction > 0) {
    // Saat klik NEXT, maju sedikit agar tidak ada sisa di kanan
    scrollAmount += 25;
  } else if (direction < 0) {
    // Saat klik PREV, mundur sedikit biar tidak potong di kiri
    scrollAmount -= 20;
  }

  // Pastikan scroll tidak keluar batas
  const finalScroll = Math.max(0, Math.min(scrollAmount, maxScrollLeft));

  wrapper.scrollTo({
    left: finalScroll,
    behavior: "smooth",
  });

  updateButtons();
}


  // Event listeners
  prevBtn.addEventListener("click", () => move(-1));
  nextBtn.addEventListener("click", () => move(1));

  // Resize fix
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateButtons, 300);
  });

  updateButtons();
});


/////////////////////
//JS UNTUK ARTIKELL//
////////////////////
// Fungsi load popup HTML ke halaman
function loadArticlePopup(callback) {
  fetch('artikel-popup.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('articlePopupContainer').innerHTML = data;
      if (callback) callback();
    })
    .catch(error => console.error('Gagal memuat popup:', error));
}

// Jalankan setelah halaman siap
document.addEventListener('DOMContentLoaded', () => {
  // Muat popup HTML terlebih dahulu
  loadArticlePopup(() => {
    // Setelah popup dimuat, pasang event listener
    initArticlePopup();
  });
});

function initArticlePopup() {
  // Event untuk tombol "Read more"
  document.querySelectorAll('.custom-block-full .badge').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      const card = button.closest('.custom-block-full');
      const title = card.querySelector('h5 a').textContent;
      const author = card.querySelector('.profile-block p').innerHTML;
      const imageSrc = card.querySelector('.custom-block-image-wrap img').src;
      const fullText = card.querySelector('.custom-block-info p').textContent;

      const popup = document.getElementById('articlePopup');
      const popupContent = document.getElementById('popupContent');

      popupContent.innerHTML = `
        <h3>${title}</h3>
        <p><small>${author}</small></p>
        <img src="${imageSrc}" style="width:100%;border-radius:10px;margin:15px 0;">
        <p>${fullText}</p>
      `;

      popup.style.display = 'flex';
    });
  });


}






