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
  
  // Event listeners untuk resize
  window.addEventListener('resize', handleResize);
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
 */
function autoPlay(interval = 5000) {
  setInterval(() => {
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
}

// ===========================
// POPUP FUNCTIONALITY
// ===========================

/**
 * Initialize popup
 */
function initPopup() {
  const showButtons = document.querySelectorAll(".social-icon-link");

  showButtons.forEach(btn => {
    btn.addEventListener("click", async e => {
      e.preventDefault();
      const popupName = btn.dataset.popup;
      
      if (!popupName) {
        console.warn("data-popup attribute tidak ditemukan");
        return;
      }

      try {
        const res = await fetch(`${popupName}.html`);
        if (!res.ok) throw new Error(`File ${popupName}.html tidak ditemukan`);
        const html = await res.text();

        // Buat wrapper popup
        const wrapper = document.createElement("div");
        wrapper.classList.add("popup-card");
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);

        // Tampilkan popup dengan delay untuk animasi
        setTimeout(() => {
          wrapper.style.display = "flex";
        }, 10);

        // Tombol tutup
        const closeBtn = wrapper.querySelector(".close-btn");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => closePopup(wrapper));
        }

        // Klik di luar popup
        wrapper.addEventListener("click", e => {
          if (e.target === wrapper) closePopup(wrapper);
        });

        // ESC key untuk tutup
        const escHandler = (e) => {
          if (e.key === 'Escape') {
            closePopup(wrapper);
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);

      } catch (err) {
        console.error("Gagal memuat popup:", err);
        alert(`Tidak dapat memuat popup: ${popupName}.html`);
      }
    });
  });
}

/**
 * Close popup dengan animasi
 * @param {HTMLElement} wrapper - Popup wrapper element
 */
function closePopup(wrapper) {
  wrapper.style.opacity = '0';
  setTimeout(() => {
    wrapper.remove();
  }, 300);
}

// ===========================
// EXPORT FUNCTIONS
// ===========================

// Export ke window agar bisa dipanggil dari HTML
window.slideCards = slideCards;
window.goToSlide = goToSlide;
window.autoPlay = autoPlay;