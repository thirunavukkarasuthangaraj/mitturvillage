/**
 * மிட்டூர் பஞ்சாயத்து - Mittur Panchayat
 * JavaScript for Slider and Interactions
 */

// Language Toggle
let currentLanguage = 'ta'; // Default Tamil

function toggleLanguage() {
    const body = document.body;

    if (currentLanguage === 'ta') {
        currentLanguage = 'en';
        body.classList.add('lang-english');
        localStorage.setItem('lang', 'en');
    } else {
        currentLanguage = 'ta';
        body.classList.remove('lang-english');
        localStorage.setItem('lang', 'ta');
    }
}

// Check saved language preference on load
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en') {
        currentLanguage = 'en';
        document.body.classList.add('lang-english');
    }
});

// Slider Variables
let currentSlide = 0;
let slides;
let dots;
let slideInterval;
const SLIDE_DURATION = 3000; // 3 seconds auto-slide

// Hero Slider Variables
let heroCurrentSlide = 0;
let heroSlides;
let heroDots;
let heroSlideInterval;
const HERO_SLIDE_DURATION = 4000; // 4 seconds auto-slide

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initSlider();
    initScrollAnimations();
});

/**
 * Initialize Hero Banner Slider
 */
function initHeroSlider() {
    heroSlides = document.querySelectorAll('.hero-slide');
    const heroDotsContainer = document.getElementById('heroSliderDots');

    if (!heroSlides.length || !heroDotsContainer) return;

    // Create dots for hero slider
    heroSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('hero-slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToHeroSlide(index));
        heroDotsContainer.appendChild(dot);
    });

    heroDots = document.querySelectorAll('.hero-slider-dot');

    // Start auto-slide for hero
    startHeroAutoSlide();

    // Pause on hover
    const heroContainer = document.querySelector('.hero-slider-container');
    if (heroContainer) {
        heroContainer.addEventListener('mouseenter', stopHeroAutoSlide);
        heroContainer.addEventListener('mouseleave', startHeroAutoSlide);
    }

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleHeroSwipe();
        }, { passive: true });
    }

    function handleHeroSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeHeroSlide(1);
            } else {
                changeHeroSlide(-1);
            }
        }
    }
}

/**
 * Change hero slide by direction
 */
function changeHeroSlide(direction) {
    goToHeroSlide(heroCurrentSlide + direction);
}

/**
 * Go to specific hero slide
 */
function goToHeroSlide(index) {
    if (!heroSlides || !heroSlides.length) return;

    heroSlides[heroCurrentSlide].classList.remove('active');
    if (heroDots && heroDots[heroCurrentSlide]) {
        heroDots[heroCurrentSlide].classList.remove('active');
    }

    heroCurrentSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides[heroCurrentSlide].classList.add('active');
    if (heroDots && heroDots[heroCurrentSlide]) {
        heroDots[heroCurrentSlide].classList.add('active');
    }
}

/**
 * Start automatic hero slideshow
 */
function startHeroAutoSlide() {
    stopHeroAutoSlide();
    heroSlideInterval = setInterval(() => {
        changeHeroSlide(1);
    }, HERO_SLIDE_DURATION);
}

/**
 * Stop automatic hero slideshow
 */
function stopHeroAutoSlide() {
    if (heroSlideInterval) {
        clearInterval(heroSlideInterval);
        heroSlideInterval = null;
    }
}

/**
 * Initialize the Image Slider
 */
function initSlider() {
    slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!slides.length || !dotsContainer) return;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    dots = document.querySelectorAll('.dot');

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1); // Swipe left - next
            } else {
                changeSlide(-1); // Swipe right - prev
            }
        }
    }
}

/**
 * Change slide by direction
 * @param {number} direction - 1 for next, -1 for previous
 */
function changeSlide(direction) {
    goToSlide(currentSlide + direction);
}

/**
 * Go to specific slide
 * @param {number} index - Slide index
 */
function goToSlide(index) {
    if (!slides || !slides.length) return;

    // Remove active class from current
    slides[currentSlide].classList.remove('active');
    if (dots && dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
    }

    // Calculate new index with wrap-around
    currentSlide = (index + slides.length) % slides.length;

    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    if (dots && dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

/**
 * Start automatic slideshow
 */
function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, SLIDE_DURATION);
}

/**
 * Stop automatic slideshow
 */
function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe work cards
    document.querySelectorAll('.work-card').forEach(card => {
        observer.observe(card);
    });

    // Observe video cards
    document.querySelectorAll('.video-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Smooth scroll to section
 * @param {string} sectionId - ID of section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

/**
 * Toggle Members Expandable Section
 */
function toggleMembersSection() {
    const expandable = document.querySelector('.members-expandable');
    if (expandable) {
        expandable.classList.toggle('expanded');
    }
}

/**
 * ========================================
 * VILLAGE ACTIVITIES DATA
 * ========================================
 * Add activities for each village here
 * Format: villageId: { completed: [...], pending: [...] }
 *
 * Each activity object:
 * {
 *   name: 'பணி பெயர்',
 *   fund: '₹5,00,000',
 *   images: ['image1.jpg', 'image2.jpg'],  // Multiple images
 *   audio: 'audio/explanation.mp3',         // Optional audio file
 *   description: 'பணி விளக்கம்...'          // Description text
 * }
 */
const villageActivities = {
    // Village 1 - சுண்ணாம்புகாரன் வட்டம்
    1: {
        completed: [
            {
                name: 'சாலை மேம்பாடு - முதல் தெரு',
                fund: '₹5,50,000',
                images: ['images/road.jpg', 'images/construction.jpg'],
                audio: '',
                description: 'புதிய தார் சாலை அமைக்கப்பட்டது. 350 மீட்டர் நீளம், 4 மீட்டர் அகலம். மழைக்காலத்தில் சேறும் சகதியும் இல்லாமல் மக்கள் எளிதாக பயணம் செய்கிறார்கள்.'
            },
            {
                name: 'தெரு விளக்கு அமைப்பு',
                fund: '₹1,80,000',
                images: ['images/streetlight.jpg'],
                audio: '',
                description: '15 LED தெரு விளக்குகள் நிறுவப்பட்டன. இரவு நேரங்களில் பாதுகாப்பு அதிகரித்துள்ளது.'
            }
        ],
        pending: [
            {
                name: 'வடிகால் அமைப்பு',
                fund: '₹3,20,000',
                images: ['images/drainage.jpg'],
                audio: '',
                description: 'மழைநீர் வடிகால் அமைக்கத் திட்டமிடப்பட்டுள்ளது. 200 மீட்டர் நீளம். விரைவில் பணிகள் தொடங்கும்.'
            }
        ]
    },
    // Village 2 - விட்டல்ராவ் வட்டம்
    2: {
        completed: [
            {
                name: 'குடிநீர் குழாய் இணைப்பு',
                fund: '₹2,75,000',
                images: ['images/water.jpg'],
                audio: '',
                description: '45 வீடுகளுக்கு புதிய குடிநீர் இணைப்பு வழங்கப்பட்டது. சுத்தமான குடிநீர் அனைவருக்கும் கிடைக்கிறது.'
            }
        ],
        pending: [
            {
                name: 'சாலை போடுதல்',
                fund: '₹4,50,000',
                images: ['images/road.jpg'],
                audio: '',
                description: 'இரண்டாம் தெருவில் புதிய தார் சாலை அமைக்கத் திட்டமிடப்பட்டுள்ளது.'
            }
        ]
    },
    // Village 3 - பெட்ராம்பூர் வட்டம்
    3: { completed: [], pending: [] },
    // Village 4 - ஜொல்லன் வட்டம்
    4: { completed: [], pending: [] },
    // Village 5 - குரம்பட்டி
    5: { completed: [], pending: [] },
    // Village 6 - மல்லாண்டியூர்
    6: { completed: [], pending: [] },
    // Village 7 - மேற்கத்தியான் வட்டம்
    7: { completed: [], pending: [] },
    // Village 8 - பேயப்பன் வட்டம்
    8: { completed: [], pending: [] },
    // Village 9 - நாச்சியார்குப்பம் காலனி
    9: { completed: [], pending: [] },
    // Village 10 - பெத்தபல்லி மாரியம்மன் கோயில்
    10: { completed: [], pending: [] },
    // Village 11 - காந்தி நகர்
    11: { completed: [], pending: [] },
    // Village 12 - குண்டுரெட்டியூர் கூட்ரோடு
    12: { completed: [], pending: [] },
    // Village 13 - ஜல்தி அண்ணா நகர்
    13: { completed: [], pending: [] },
    // Village 14 - நாச்சியார்குப்பம்
    14: { completed: [], pending: [] },
    // Village 15 - ரெட்டிவலசை
    15: { completed: [], pending: [] },
    // Village 16 - திம்மராயவலசை
    16: { completed: [], pending: [] },
    // Village 17 - விளாங்குப்பம்
    17: { completed: [], pending: [] },
    // Village 18 - மிட்டூர்
    18: {
        completed: [
            {
                name: 'பஞ்சாயத்து அலுவலகம் புனரமைப்பு',
                fund: '₹8,50,000',
                images: ['images/communityhall.jpg', 'images/construction.jpg'],
                audio: '',
                description: 'பஞ்சாயத்து அலுவலக கட்டடம் முழுமையாக புனரமைக்கப்பட்டது. புதிய சுவர்கள், மேற்கூரை, மின் வசதி மற்றும் கழிவறை வசதிகள் அமைக்கப்பட்டன.'
            },
            {
                name: 'கோவில் திருப்பணி',
                fund: '₹3,25,000',
                images: ['images/temple.jpg'],
                audio: '',
                description: 'மிட்டூர் மாரியம்மன் கோவில் கோபுரம் வர்ணம் தீட்டப்பட்டது. மண்டபம் சீரமைக்கப்பட்டது.'
            }
        ],
        pending: [
            {
                name: 'விளையாட்டு மைதானம்',
                fund: '₹6,00,000',
                images: ['images/construction.jpg'],
                audio: '',
                description: 'இளைஞர்களுக்கான கிரிக்கெட் மற்றும் கால்பந்து விளையாட்டு மைதானம் அமைக்கத் திட்டமிடப்பட்டுள்ளது.'
            }
        ]
    },
    // Village 19 - கோவிந்தன் வட்டம்
    19: { completed: [], pending: [] }
};

/**
 * Toggle village accordion
 */
function toggleVillage(villageId) {
    const item = document.querySelector(`.village-accordion-item[data-village="${villageId}"]`);
    const wasActive = item.classList.contains('active');

    // Close all other accordions
    document.querySelectorAll('.village-accordion-item').forEach(el => {
        el.classList.remove('active');
    });

    // Toggle current accordion
    if (!wasActive) {
        item.classList.add('active');
        loadVillageActivities(villageId);
    }
}

/**
 * Load activities for a village
 */
function loadVillageActivities(villageId) {
    const data = villageActivities[villageId];
    if (!data) return;

    const completedContainer = document.getElementById(`completed-${villageId}`);
    const pendingContainer = document.getElementById(`pending-${villageId}`);
    const completedCount = document.getElementById(`completed-count-${villageId}`);
    const pendingCount = document.getElementById(`pending-count-${villageId}`);

    // Update counts
    completedCount.textContent = data.completed.length;
    pendingCount.textContent = data.pending.length;

    // Render completed activities
    if (data.completed.length > 0) {
        completedContainer.innerHTML = data.completed.map((activity, index) =>
            createActivityCard(activity, 'completed', index)
        ).join('');
    } else {
        completedContainer.innerHTML = '<p class="no-activities">முடிந்த பணிகள் இல்லை</p>';
    }

    // Render pending activities
    if (data.pending.length > 0) {
        pendingContainer.innerHTML = data.pending.map((activity, index) =>
            createActivityCard(activity, 'pending', index)
        ).join('');
    } else {
        pendingContainer.innerHTML = '<p class="no-activities">நிலுவை பணிகள் இல்லை</p>';
    }
}

// Exchange rate: 1 USD = 83 INR (approximate)
const USD_EXCHANGE_RATE = 83;

/**
 * Convert INR to USD
 */
function convertToUSD(inrAmount) {
    // Extract numeric value from string like "₹5,50,000"
    const numericValue = parseInt(inrAmount.replace(/[₹,]/g, ''));
    const usdValue = Math.round(numericValue / USD_EXCHANGE_RATE);
    return usdValue.toLocaleString('en-US');
}

/**
 * Create activity card HTML - List View with Images, Audio, Description
 */
function createActivityCard(activity, status, index) {
    const statusText = status === 'completed' ? 'முடிந்தது' : 'நிலுவையில்';
    const uniqueId = `${status}-${Date.now()}-${index}`;

    // Convert fund to both currencies
    const usdAmount = convertToUSD(activity.fund);

    // Handle multiple images
    const images = activity.images || [activity.image];
    const imagesHTML = images.map((img, i) => `
        <div class="activity-img-item ${i === 0 ? 'active' : ''}" onclick="openImageModal('${img}')">
            <img src="${img}" alt="${activity.name} - படம் ${i + 1}" loading="lazy">
        </div>
    `).join('');

    // Image navigation (if multiple images)
    const imageNavHTML = images.length > 1 ? `
        <div class="activity-img-nav">
            <button class="img-nav-btn prev" onclick="changeActivityImage('${uniqueId}', -1)">&#10094;</button>
            <span class="img-counter"><span id="img-current-${uniqueId}">1</span> / ${images.length}</span>
            <button class="img-nav-btn next" onclick="changeActivityImage('${uniqueId}', 1)">&#10095;</button>
        </div>
    ` : '';

    // Audio player (if audio exists)
    const audioHTML = activity.audio ? `
        <div class="activity-audio">
            <div class="audio-label">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
                ஒலிக்குறிப்பு
            </div>
            <audio controls class="audio-player">
                <source src="${activity.audio}" type="audio/mpeg">
                Your browser does not support audio.
            </audio>
        </div>
    ` : '';

    // Description
    const descriptionHTML = activity.description ? `
        <div class="activity-description">
            <p>${activity.description}</p>
        </div>
    ` : '';

    return `
        <div class="activity-list-item ${status}" data-id="${uniqueId}">
            <div class="activity-list-header">
                <div class="activity-title-section">
                    <span class="activity-status-badge ${status}">${statusText}</span>
                    <h5 class="activity-name">${activity.name}</h5>
                </div>
                <div class="activity-fund-container">
                    <div class="activity-fund-badge inr">
                        <span class="currency-symbol">₹</span>
                        <span class="fund-amount">${activity.fund.replace('₹', '')}</span>
                    </div>
                </div>
            </div>

            <div class="activity-list-body">
                <div class="activity-images-gallery" id="gallery-${uniqueId}">
                    ${imagesHTML}
                    ${imageNavHTML}
                </div>

                <div class="activity-details">
                    ${descriptionHTML}
                    ${audioHTML}
                </div>
            </div>
        </div>
    `;
}

/**
 * Change activity image in gallery
 */
function changeActivityImage(uniqueId, direction) {
    const gallery = document.getElementById(`gallery-${uniqueId}`);
    if (!gallery) return;

    const images = gallery.querySelectorAll('.activity-img-item');
    const counter = document.getElementById(`img-current-${uniqueId}`);
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));

    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + images.length) % images.length;
    images[currentIndex].classList.add('active');

    if (counter) counter.textContent = currentIndex + 1;
}

/**
 * Open image in modal
 */
function openImageModal(imageSrc) {
    // Create modal if not exists
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <span class="image-modal-close" onclick="closeImageModal()">&times;</span>
            <img src="" alt="Activity Image" id="modalImage">
        `;
        document.body.appendChild(modal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeImageModal();
        });
    }

    document.getElementById('modalImage').src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close image modal
 */
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeImageModal();
});
