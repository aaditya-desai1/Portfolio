/**
 * Main JavaScript for Aaditya Desai's Portfolio
 * Author: Aaditya Desai
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navbar load animation
  setTimeout(() => {
    document.querySelector('.navbar').classList.add('loaded');
  }, 300);

  // Set default visibility for skill items and project cards
  document.querySelectorAll('.skill-item, .project-card').forEach(item => {
    item.style.opacity = "1";
    item.style.transform = "none";
  });

  // Check if AOS is available and initialize
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
      offset: 100,
      disable: 'mobile' // Enable on all devices
    });

    // Manually trigger AOS refresh for skills and projects sections
    const refreshAOS = () => {
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    };

    // Refresh AOS when scrolling to skills or projects section
    document.querySelector('#skills').addEventListener('mouseenter', refreshAOS);
    document.querySelector('#projects').addEventListener('mouseenter', refreshAOS);
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

  // Footer links smooth scroll
  const footerLinks = document.querySelectorAll('.footer-links a');
  footerLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    // Basic scroll class for box-shadow
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Handle slide up/down behavior
    if (window.scrollY > 150) {
      // Scrolling down
      if (window.scrollY > lastScrollY) {
        navbar.classList.add('scrolled-down');
        navbar.classList.remove('scrolled-up');
      } 
      // Scrolling up
      else if (window.scrollY < lastScrollY) {
        navbar.classList.remove('scrolled-down');
        navbar.classList.add('scrolled-up');
      }
    } else {
      navbar.classList.remove('scrolled-down');
      navbar.classList.add('scrolled-up');
    }
    
    lastScrollY = window.scrollY;
  });

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });

  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 100);
  });

  // Change cursor style on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .project-card, .skill-item');
  hoverables.forEach(hoverable => {
    hoverable.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    hoverable.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  // GSAP Animations
  // Hero section animations
  
  // Text animation for title
  const textElements = document.querySelectorAll('.text-animation');
  textElements.forEach((element, index) => {
    gsap.to(element, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      delay: 0.5 + (index * 0.3),
      ease: 'power4.out'
    });
  });
  
  // Text animation for subtitle - starts after the title animation
  const subtitleElements = document.querySelectorAll('.text-animation-subtitle');
  subtitleElements.forEach((element, index) => {
    gsap.to(element, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      delay: 2.2 + (index * 0.3), // Start after title animation (0.5 + 4*0.3 + 0.8)
      ease: 'power4.out'
    });
  });
  
  gsap.from('.text-content', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
  });

  gsap.from('.hero-image', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.7
  });

  gsap.from('.social-links', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 1
  });

  // ScrollTrigger animations for sections
  gsap.registerPlugin(ScrollTrigger);

  // About section animation
  gsap.from('.about-image', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.about-text', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // Skills animation with improved reliability
  const skillGroups = document.querySelectorAll('.skill-group');
  skillGroups.forEach((group, index) => {
    const items = group.querySelectorAll('.skill-item');
    gsap.from(items, {
      scrollTrigger: {
        trigger: group,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      onComplete: () => {
        items.forEach(item => item.style.opacity = 1);
      }
    });
  });

  // Tech cards pop-up animation in Skills section
  const techCards = document.querySelectorAll('.tech-card');
  
  // Ensure cards are initially hidden
  techCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "scale(0)";
  });
  
  // Create a consistent sequence animation
  const animateTechCards = () => {
    techCards.forEach((card, index) => {
      setTimeout(() => {
        gsap.to(card, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          onComplete: () => {
            card.style.transform = 'none';
          }
        });
      }, index * 200); // 200ms delay between each card
    });
  };
  
  // Create scroll trigger for the animation
  ScrollTrigger.create({
    trigger: '.skills',
    start: 'top 60%',
    onEnter: () => animateTechCards(),
    once: false
  });

  // Project cards animation with improved reliability
  const projectCards = document.querySelectorAll('.project-card');
  gsap.from(projectCards, {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    onComplete: () => {
      projectCards.forEach(card => card.style.opacity = 1);
    }
  });

  // Contact section animation
  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // Project modal functionality
  const projectDetailsButtons = document.querySelectorAll('.project-details-btn');
  const modal = document.getElementById('projectModal');
  const modalBody = document.querySelector('.modal-body');
  const closeModal = document.querySelector('.close-modal');

  // Project details data
  const projectDetails = [
    {
      title: 'ClothLoop',
      description: 'ClothLoop is a modern clothing rental platform that connects people looking to rent outfits with those offering garments for short-term use. Aiming to promote sustainability and reduce fashion waste, the platform features secure authentication, searchable product listings, location-based discovery, and direct buyer-seller communication.',
      features: [
        'Secure user authentication and profiles',
        'Searchable clothing inventory with filters',
        'Location-based outfit discovery',
        'Direct communication between renters and owners',
        'Secure payment processing',
        'Responsive design for all devices'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
      image: 'assets/project-clothloop.jpg'
    },
    {
      title: 'DataVizPro',
      description: 'A powerful web-based data visualization tool that automates the process of creating meaningful visualizations from your data. DataVizPro helps you transform raw data into insightful, interactive charts and graphs with AI-powered recommendations.',
      features: [
        'Smart file upload & storage (CSV, JSON, Excel)',
        'Automated data analysis',
        'Dynamic visualization generation',
        'Data filtering & customization',
        'AI-driven chart recommendations',
        'Real-time updates',
        'Responsive design',
        'Secure data handling'
      ],
      technologies: ['JavaScript', 'D3.js', 'Node.js', 'MongoDB'],
      image: 'assets/project-datavizpro.jpg'
    }
  ];

  projectDetailsButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const project = projectDetails[index];
      modalBody.innerHTML = `
        <div class="modal-project">
          <div class="modal-project-image">
            <img src="${project.image}" alt="${project.title}">
          </div>
          <div class="modal-project-content">
            <h2>${project.title}</h2>
            <p class="modal-project-description">${project.description}</p>
            
            <div class="modal-project-features">
              <h3>Key Features</h3>
              <ul>
                ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
              </ul>
            </div>
            
            <div class="modal-project-tech">
              <h3>Technologies Used</h3>
              <div class="tech-tags">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real application, you would send this data to a server
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // For demonstration, just log the data
      console.log('Form submitted:', formData);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
});

// Smooth scroll function
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetPosition = document.querySelector(targetId).offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition - 80;
  const duration = 1000;
  let start = null;
  
  window.requestAnimationFrame(step);
  
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

// Easing function
function easeInOutCubic(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t + 2) + b;
} 