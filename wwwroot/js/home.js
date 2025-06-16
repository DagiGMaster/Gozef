// ========== Selectors ==========
const selectors = {
    header: '.site-header',
    heroButton: '.hero-button',
    contactForm: '#contact-form',
    clientsCarousel: '.clients-carousel',
    // Add future elements here
};

// ========== State ==========
const state = {
    carousel: {
        currentIndex: 0,
        slideWidth: 0,
        allowShift: true,
        intervalTime: 2000,
    }    
};

// ========== Utility Functions ==========
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

//// ========== Feature: Clients Carousel ==========
//function initClientsTicker() {
//    const imagesArr = [
//        "5stars.png",
//        "afcon-logo.svg",
//        "electra_logo.png",
//        "givatayim.png",
//        "haifa.svg",
//        "holon.png",
//        "netanya_logo.webp",
//    ];

//    const carousel = document.querySelector('.clients-carousel');
//    const maxVisible = 6;
//    let currentIndex = 0;

//    // First load - show 6 images
//    for (let i = 0; i < maxVisible; i++) {
//        const img = document.createElement('img');
//        img.src = `/img/our_clients/${imagesArr[(currentIndex + i) % imagesArr.length]}`;
//        carousel.appendChild(img);
//    }

//    setInterval(() => {
//        // Remove first image
//        carousel.removeChild(carousel.children[0]);

//        // Add next image
//        const img = document.createElement('img');
//        currentIndex = (currentIndex + 1) % imagesArr.length;
//        img.src = `/img/our_clients/${imagesArr[(currentIndex + maxVisible - 1) % imagesArr.length]}`;
//        carousel.appendChild(img);

//    }, 2000); // every 2 seconds
//}

//logo animation
function initLogoStripAnimation(selector = '.logo-strip') {
    //const strip = document.querySelector(selector);
    //if (!strip) return;

    //if (strip.dataset.cloned === "true") return; // prevent double cloning
    //strip.innerHTML += strip.innerHTML;
    //strip.dataset.cloned = "true";

    //let pos = 0;

    //function animate() {
    //    pos -= 1;
    //    if (Math.abs(pos) >= strip.scrollWidth / 2) pos = 0;
    //    strip.style.transform = `translateX(${pos}px)`;
    //    requestAnimationFrame(animate);
    //}

    //animate();
    
}




// ========== Feature: Hero Button Action ==========
function initHeroButton() {
    const heroButton = $(selectors.heroButton);
    if (!heroButton) return;

    heroButton.addEventListener('click', () => {
        console.log('Hero button clicked');
        // Scroll to contact form, open modal, etc.
    });
}

// ========== Master Init ==========
function initHomePage() {
    console.log('Initializing Home Page...');

    /*initClientsTicker();*/
    initHeroButton();
    initLogoStripAnimation();
}

// ========== Start ==========
document.addEventListener('DOMContentLoaded', initHomePage);
document.addEventListener('DOMContentLoaded', () => {
    const logos = [
        "/img/our_clients/HPI_logo.png",
        "/img/our_clients/kam_logo.png",
        "/img/our_clients/kam2_logo.png",
        "/img/our_clients/kiromic_logo.png",
        "/img/our_clients/lexpharma_logo.png",
        "/img/our_clients/Master_logo.png",
        "/img/our_clients/mati_Logo.png",
        "/img/our_clients/memgen_logo.png",
        "/img/our_clients/mob_logo.png",
        "/img/our_clients/mogas_logo.png",
        "/img/our_clients/OCIW_logo.png",
        "/img/our_clients/p_logo.png",
        "/img/our_clients/travardi_logo.png"
    ];

    const grid = document.getElementById('logoFadeGrid');
    let index = 0;

    function renderNextLogos() {
        // Clear current
        grid.classList.remove('show');

        setTimeout(() => {
            grid.innerHTML = ''; // remove current logos

            // Inject 4 logos
            for (let i = 0; i < 6; i++) {
                const img = document.createElement('img');
                img.src = logos[(index + i) % logos.length];
                grid.appendChild(img);
            }

            // Show new
            grid.classList.add('show');
            index = (index + 6) % logos.length;
        }, 800); // match fade out time
    }

    renderNextLogos(); // first call
    setInterval(renderNextLogos, 5000); // every 2.8 sec (fade out + pause)
});



document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('beadsCanvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.clients-carousel-wrapper');

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const colors = ['#ffffff', '#ff007f', '#00ffe5', '#ffcc00', '#ad2bff', '#00ff7f'];
    const particles = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticle() {
        const x = random(0, canvas.width);
        const y = random(0, canvas.height);
        const radius = random(2, 6);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speedX = random(-1, 1);
        const speedY = random(-2, -0.5);
        const life = 100;

        particles.push({ x, y, radius, color, speedX, speedY, life });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 100;
            ctx.fill();
            ctx.closePath();

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        });
        ctx.globalAlpha = 1;
    }

    function animate() {
        drawParticles();
        requestAnimationFrame(animate);
    }

    setInterval(() => {
        for (let i = 0; i < 5; i++) createParticle();
    }, 200);

    animate();

    // Resize with container
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.inner-text');
    const paragraphs = Array.from(container.querySelectorAll('p'));

    // Extract and clear text
    const paragraphTexts = paragraphs.map(p => p.textContent);
    paragraphs.forEach(p => p.textContent = '');

    let currentParagraph = 0;
    let currentChar = 0;

    function type() {
        if (currentParagraph >= paragraphTexts.length) return;

        const p = paragraphs[currentParagraph];
        const fullText = paragraphTexts[currentParagraph];

        p.textContent += fullText[currentChar];
        currentChar++;

        if (currentChar < fullText.length) {
            setTimeout(type, 25); // typing speed per character
        } else {
            currentParagraph++;
            currentChar = 0;
            setTimeout(type, 300); // pause before next paragraph
        }
    }

    type();
});



document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.home-area1-s1, .home-area1-s2');

    targets.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    targets.forEach(el => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".home-satisfaction-h2");
    let started = false;

    function formatNumber(num) {
        return num.toLocaleString();
    }

    function animateCountUp(el, endValue, suffix) {
        let startValue = 0;
        const duration = 5000;
        const increment = endValue / (duration / 16);

        const count = () => {
            startValue += increment;
            if (startValue < endValue) {
                el.textContent = formatNumber(Math.floor(startValue)) + suffix;
                requestAnimationFrame(count);
            } else {
                el.textContent = formatNumber(endValue) + suffix;
            }
        };

        requestAnimationFrame(count);
    }

    function isInViewport(elem) {
        const rect = elem.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    function startCounting() {
        if (!started) {
            counters.forEach(counter => {
                if (isInViewport(counter)) {
                    started = true;
                    counters.forEach(el => {
                        const text = el.textContent.trim();
                        const number = parseInt(text.replace(/[^0-9]/g, ""));
                        const suffix = text.match(/[+%]/g) ? text.match(/[+%]/g).join('') : '';
                        animateCountUp(el, number, suffix);
                    });
                }
            });
        }
    }

    window.addEventListener("scroll", startCounting);
    startCounting();
});


document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".fade-from-top, .fade-from-left, .fade-from-bottom");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target); // animate only once
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));
});


// Fade up elements
  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // only once
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  });

