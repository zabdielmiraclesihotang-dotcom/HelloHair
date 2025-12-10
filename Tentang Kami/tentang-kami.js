// Efek animasi muncul saat elemen masuk viewport
const items = document.querySelectorAll(".about-card, .about-image-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

items.forEach((item) => observer.observe(item));
