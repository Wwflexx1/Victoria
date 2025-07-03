// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const backToTopButton = document.getElementById('back-to-top');
const typingTextElement = document.getElementById('typing-text');

// Typing Animation
const phrases = [
    "Blogger - Artist - Photographer"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typePhrase() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting && charIndex < currentPhrase.length) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 40 : 120;
    setTimeout(typePhrase, typingSpeed);
}

// Initial call for typing animation
if (typingTextElement) {
    typePhrase();
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate Stats on Scroll
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.about .stats');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.85) {
        statNumbers.forEach(stat => {
            const target = +stat.dataset.target;
            const duration = 2000;
            const startValue = 0;
            const startTime = performance.now();
            
            const updateNumber = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentValue = Math.floor(progress * target);
                
                stat.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };
            
            requestAnimationFrame(updateNumber);
        });
        statsAnimated = true;
    }
};

// Animate Skill Bars on Scroll
const skillProgressBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.about-skills');
let skillsAnimated = false;

const animateSkills = () => {
    if (skillsAnimated) return;

    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
        skillProgressBars.forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
        skillsAnimated = true;
    }
};

// General Scroll Animations (Fade In, Slide In)
const animateOnScrollElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

const checkScrollAnimations = () => {
    animateOnScrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.85) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
};

// Initial check and event listener
window.addEventListener('scroll', () => {
    animateStats();
    animateSkills();
    checkScrollAnimations();
});

// Run on page load as well
window.addEventListener('load', () => {
    animateStats();
    animateSkills();
    checkScrollAnimations();
});