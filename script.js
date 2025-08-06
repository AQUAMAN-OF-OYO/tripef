import { Analytics } from '@vercel/analytics/next';
const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    // Hero Slider
    let index = 0;
    const slides = document.getElementById("slides");
    const total = slides.children.length;

    setInterval(() => {
      index = (index + 1) % total;
      slides.style.transform = `translateX(-${index * 100}vw)`;
    }, 7000);

            <Analytics />