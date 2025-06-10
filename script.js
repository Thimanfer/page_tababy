// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu after clicking a link
      mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('problems-list') ||
          entry.target.classList.contains('choice-list') ||
          entry.target.classList.contains('products-list') ||
          entry.target.classList.contains('features-list') ||
          entry.target.classList.contains('testimonials-list') ||
          entry.target.classList.contains('benefits-list')) {
        // For lists, animate children with delay
        Array.from(entry.target.children).forEach((child, index) => {
          child.classList.add('is-visible');
          child.style.setProperty('--animation-delay', `${index * 0.15}s`);
        });
      } else {
        // Animate individual sections/items
        entry.target.classList.add('is-visible');
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section.animated-item, .problems-list, .choice-list, .products-list, .features-list, .testimonials-list, .benefits-list').forEach(el => {
  observer.observe(el);
});

// Countdown Timer
function startCountdown(durationInSeconds) {
  let timer = durationInSeconds;
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  const interval = setInterval(() => {
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
      clearInterval(interval);
      return; // Stop if elements are not found
    }

    const days = Math.floor(timer / (3600 * 24));
    const hours = Math.floor((timer % (3600 * 24)) / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = Math.floor(timer % 60);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;

    if (--timer < 0) {
      clearInterval(interval);
      // Optional: Display a message when countdown finishes
      // document.getElementById('countdown').innerHTML = 'HẾT THỜI GIAN ƯU ĐÃI!';
    }
  }, 1000);
}

// Initialize on window load
window.addEventListener('load', () => {
  // Start countdown for 2 days (2 * 24 * 3600 seconds)
  startCountdown(2 * 24 * 3600);

  // Handle form submission
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
      this.reset();
    });
  }

  // Manually trigger observer for elements already in view on load
  document.querySelectorAll('section.animated-item, .problems-list, .choice-list, .products-list, .features-list, .testimonials-list, .benefits-list').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      observer.observe(el);
    }
  });
});
