/**
 * ===========================
 * MAIN SCRIPT - WEBSITE BAHANKOE
 * ===========================
 */

// ===========================
// PODCAST SLIDER
// ===========================

// State management
let currentIndex = 0;

// DOM Elements
let container = null;
let prevBtn = null;
let nextBtn = null;

// Initialize saat DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  initSlider();
  initPopup();
  initPartnershipCarousel();
});

/**
 * Initialize slider
 */
function initSlider() {
  container = document.getElementById('podcastContainer');
  prevBtn = document.querySelector('.prev-btn');
  nextBtn = document.querySelector('.next-btn');
  
  if (!container) return;
  
  updateButtons();
  
  // Event listeners untuk resize (dengan debounce untuk performa)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });
}

/**
 * Cek jumlah cards yang ditampilkan per view
 * Desktop: 2 cards, Mobile: 1 card
 */
function getCardsPerView() {
  return window.innerWidth <= 768 ? 1 : 2;
}

/**
 * Get total cards
 */
function getTotalCards() {
  if (!container) return 0;
  return container.querySelectorAll('.custom-block').length;
}

/**
 * Slide cards ke arah tertentu
 * @param {string} direction - 'next' atau 'prev'
 */
function slideCards(direction) {
  if (!container) return;
  
  const cardsPerView = getCardsPerView();
  const totalCards = getTotalCards();
  const maxIndex = totalCards - cardsPerView;

  if (direction === 'next') {
    currentIndex = Math.min(currentIndex + 1, maxIndex);
  } else if (direction === 'prev') {
    currentIndex = Math.max(currentIndex - 1, 0);
  }

  updateSlider();
}

/**
 * Update posisi slider
 */
function updateSlider() {
  if (!container) return;
  
  const cards = container.querySelectorAll('.custom-block');
  if (cards.length === 0) return;

  const cardWidth = cards[0].offsetWidth;
  const gap = 20; // sesuai dengan gap di CSS
  const offset = currentIndex * (cardWidth + gap);
  
  container.style.transform = `translateX(-${offset}px)`;
  container.style.transition = 'transform 0.3s ease-in-out';
  
  updateButtons();
}

/**
 * Update state tombol navigasi
 */
function updateButtons() {
  if (!prevBtn || !nextBtn) return;

  const cardsPerView = getCardsPerView();
  const totalCards = getTotalCards();
  const maxIndex = totalCards - cardsPerView;
  
  // Disable/enable buttons
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;
  
  // Hide buttons jika total cards <= cards per view
  if (totalCards <= cardsPerView) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
  }
}

/**
 * Handle window resize
 */
function handleResize() {
  // Reset ke awal saat resize
  currentIndex = 0;
  updateSlider();
}

/**
 * Go to specific slide index
 * @param {number} index - Index slide tujuan
 */
function goToSlide(index) {
  const cardsPerView = getCardsPerView();
  const totalCards = getTotalCards();
  const maxIndex = totalCards - cardsPerView;
  
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  updateSlider();
}

/**
 * Auto play slider (optional)
 * @param {number} interval - Interval dalam ms (default 5000)
 * @returns {function} - Function untuk stop autoplay
 */
function autoPlay(interval = 5000) {
  const autoplayInterval = setInterval(() => {
    const cardsPerView = getCardsPerView();
    const totalCards = getTotalCards();
    const maxIndex = totalCards - cardsPerView;
    
    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    
    updateSlider();
  }, interval);

 
  return () => clearInterval(autoplayInterval);
}

// ===========================
// POPUP FUNCTIONALITY
// ===========================

/**
 * Initialize popup (berlaku untuk semua elemen yang punya data-popup)
 */
function initPopup() {
  const triggers = document.querySelectorAll("[data-popup]");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", async (e) => {
      e.preventDefault();

      const popupFile = trigger.dataset.popup; // contoh: "popup-promo"
      const itemId = trigger.dataset.id;       // contoh: "promo1"

      try {
        // Ambil isi popup dari file HTML
        const res = await fetch(`${popupFile}.html`);
        const html = await res.text();

        // Buat wrapper popup
        const wrapper = document.createElement("div");
        wrapper.classList.add("popup-card");
        wrapper.innerHTML = html;

        // Masukkan ke body
        document.body.appendChild(wrapper);

        // Tampilkan hanya konten sesuai ID
        const items = wrapper.querySelectorAll(".popup-item");
        items.forEach(i => i.style.display = "none");
        const selected = wrapper.querySelector(`#${itemId}`);
        if (selected) selected.style.display = "flex";

        // Tampilkan popup
        requestAnimationFrame(() => wrapper.classList.add("show"));

        // Tutup popup
        const closeBtn = wrapper.querySelector(".close-btn");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => closePopup(wrapper));
        }

        // Klik di luar popup
        wrapper.addEventListener("click", (ev) => {
          if (ev.target === wrapper) closePopup(wrapper);
        });

        // Tutup pakai ESC
        const escHandler = (ev) => {
          if (ev.key === "Escape") {
            closePopup(wrapper);
            document.removeEventListener("keydown", escHandler);
          }
        };
        document.addEventListener("keydown", escHandler);

      } catch (err) {
        console.error("Gagal memuat popup:", err);
      }
    });
  });
}

function closePopup(wrapper) {
  wrapper.classList.remove("show");
  setTimeout(() => wrapper.remove(), 300);
}

document.addEventListener("DOMContentLoaded", initPopup);

document.querySelectorAll('[data-popup]').forEach(trigger => {
  trigger.addEventListener('click', function(e) {
    e.preventDefault();
    const popupId = this.getAttribute('data-popup');
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = 'block';
    }
  });
});

document.querySelectorAll('.close-popup').forEach(button => {
  button.addEventListener('click', function() {
    this.closest('.popup-card').style.display = 'none';
  });
});



/**
 * Close popup dengan animasi
 * @param {HTMLElement} wrapper - Popup wrapper element
 */
function closePopup(wrapper) {
  if (!wrapper) return;
  
  wrapper.classList.remove("show");
  setTimeout(() => {
    wrapper.remove();
  }, 300);
}

// ===========================
// PARTNERSHIP CAROUSEL
// ===========================

/**
 * Initialize Partnership Carousel (Owl Carousel)
 */
function initPartnershipCarousel() {
  // Cek apakah jQuery dan Owl Carousel sudah loaded
  if (typeof jQuery === 'undefined' || typeof jQuery.fn.owlCarousel === 'undefined') {
    console.warn('jQuery atau Owl Carousel belum dimuat');
    return;
  }

  const carouselElement = $('.partnership-carousel');
  
  if (carouselElement.length === 0) {
    return;
  }

  carouselElement.owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    nav: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 }
    }
  });
}

// ===========================
// EXPORT FUNCTIONS
// ===========================

// Export ke window agar bisa dipanggil dari HTML
window.slideCards = slideCards;
window.goToSlide = goToSlide;
window.autoPlay = autoPlay;
window.closePopup = closePopup;



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
