/* Enhanced Portfolio JavaScript with Smooth Scrolling Navigation */

// Loading Screen Controller
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  
  // Enhanced mobile-optimized loading time - much longer for mobile to appreciate the animation
  const minLoadTime = isMobile ? (isSmallMobile ? 5000 : 4500) : 1500; // 5s for small mobile, 4.5s for mobile, 1.5s for desktop
  const startTime = Date.now();
  
  function hideLoadingScreen() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsedTime);
    
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      
      // Longer fade animation for mobile to see the transition
      const fadeTime = isMobile ? 800 : 300;
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        console.log('🚀 Portfolio loaded successfully!');
      }, fadeTime);
    }, remainingTime);
  }
  
  // Hide loading screen after everything is loaded
  hideLoadingScreen();
});

// Prevent scroll during loading
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen && !loadingScreen.classList.contains('fade-out')) {
    document.body.style.overflow = 'hidden';
  }
  
  // Re-enable scroll when loading is complete - much longer for mobile
  const scrollTimeout = isMobile ? (isSmallMobile ? 5800 : 5300) : 1800; // Increased timeouts for mobile
  setTimeout(() => {
    document.body.style.overflow = '';
  }, scrollTimeout);
});

// Mobile detection and optimizations
const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isSmallMobile = window.innerWidth <= 480;

// Mobile-specific settings
const mobileSettings = {
  starCount: isMobile ? (isSmallMobile ? 200 : 400) : 1600, // Reduced star count for better performance
  enableStarInteraction: !isMobile, // Enable star interaction on desktop, disable on mobile devices
  reducedAnimations: isMobile, // Reduce animations on mobile
  enableSolarSystemInteraction: !isMobile, // Disable solar system interaction on mobile
  scrollSensitivity: isMobile ? 0.5 : 1.0 // Reduced scroll sensitivity on mobile
};

console.log('📱 Mobile detection:', { isMobile, isSmallMobile, settings: mobileSettings });

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Enhanced Smooth Scrolling Navigation Functions with Mobile Optimizations
function scrollToSection(sectionName) {
  console.log('scrollToSection called with:', sectionName);
  
  // Clear all active states immediately for instant feedback
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Find and activate the target nav item immediately with enhanced feedback
  const targetNav = document.querySelector(`.${sectionName}-nav`);
  if (targetNav) {
    targetNav.classList.add('active');
    
    // Add enhanced mobile feedback
    if (isMobile) {
      // Add haptic feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate(50); // Short vibration
      }
      
      // Add visual feedback with scaling animation
      targetNav.style.transform = 'translateY(-4px) scale(1.02)';
      setTimeout(() => {
        targetNav.style.transform = '';
      }, 200);
    }
    
    console.log('Nav activated:', sectionName);
  }
  
  // Find and scroll to the target section
  const targetSection = document.querySelector(`.${sectionName}-section`);
  const mainContent = document.querySelector('.main-content');
  
  if (targetSection && mainContent) {
    const sectionTop = targetSection.offsetTop;
    
    // Enhanced smooth scrolling with mobile optimizations
    const scrollOptions = {
      top: sectionTop,
      behavior: 'smooth'
    };
    
    // Add momentum scrolling for iOS
    if (isMobile && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
      mainContent.style.webkitOverflowScrolling = 'touch';
    }
    
    mainContent.scrollTo(scrollOptions);
    
    console.log('Scrolled to section:', sectionName);
    
    // Ensure the active state remains after scroll completes
    setTimeout(() => {
      if (targetNav && !targetNav.classList.contains('active')) {
        targetNav.classList.add('active');
      }
    }, isMobile ? 600 : 800); // Faster feedback on mobile
  }
}

// Make functions globally available
window.scrollToSection = scrollToSection;

// Enhanced Mobile Touch Interactions
if (isMobile) {
  document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(navItem => {
      // Enhanced touch start for immediate feedback
      navItem.addEventListener('touchstart', function(e) {
        this.classList.add('touching');
        this.style.transform = 'translateY(-2px) scale(0.98)';
        
        // Prevent default to avoid double-tap zoom
        e.preventDefault();
      }, { passive: false });
      
      // Touch end cleanup
      navItem.addEventListener('touchend', function(e) {
        this.classList.remove('touching');
        this.style.transform = '';
        
        // Add ripple effect
        createRippleEffect(this, e);
        
        e.preventDefault();
      }, { passive: false });
      
      // Touch cancel cleanup
      navItem.addEventListener('touchcancel', function() {
        this.classList.remove('touching');
        this.style.transform = '';
      });
    });
  });
  
  // Ripple effect function for enhanced mobile feedback
  function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.changedTouches[0].clientX - rect.left - size / 2;
    const y = event.changedTouches[0].clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
      z-index: 1000;
    `;
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }
  
  // Add CSS for ripple animation and enhanced mobile styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
    .nav-item {
      position: relative;
      overflow: hidden;
    }
    .touching {
      transition: transform 0.1s ease-out !important;
    }
    
    /* Enhanced scroll performance for mobile */
    .main-content {
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
    
    /* Improved touch targets for mobile accessibility */
    @media (max-width: 768px) {
      .nav-item {
        min-height: 70px !important;
        touch-action: manipulation;
      }
      
      .nav-item:focus {
        outline: 2px solid rgba(254, 202, 87, 0.8);
        outline-offset: 2px;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Enhanced scroll performance with throttling
  let isScrolling = false;
  const mainContent = document.querySelector('.main-content');
  
  if (mainContent) {
    mainContent.addEventListener('scroll', function() {
      if (!isScrolling) {
        window.requestAnimationFrame(function() {
          handleScrollNavigation();
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true });
  }
}

// Message Button Bottom Scroll Handler
function handleMessageButtonVisibility() {
  const messageButton = document.getElementById('messageButtonBottom');
  const mainContent = document.querySelector('.main-content');
  
  if (!messageButton || !mainContent) return;
  
  const scrollTop = mainContent.scrollTop;
  const scrollThreshold = 300; // Show after scrolling 300px
  const contactSection = document.querySelector('.contact-section');
  
  // Hide button when in contact section to avoid overlap
  let inContactSection = false;
  if (contactSection) {
    const contactTop = contactSection.offsetTop - 200;
    const contactBottom = contactSection.offsetTop + contactSection.offsetHeight;
    inContactSection = scrollTop >= contactTop && scrollTop <= contactBottom;
  }
  
  if (scrollTop > scrollThreshold && !inContactSection) {
    messageButton.classList.add('show');
  } else {
    messageButton.classList.remove('show');
  }
}

// Initialize Message Button on page load
function initializeMessageButton() {
  const messageButton = document.getElementById('messageButtonBottom');
  if (messageButton) {
    // Ensure it starts hidden
    messageButton.classList.remove('show');
    
    // Add periodic pulse when visible to draw attention
    setInterval(() => {
      if (messageButton.classList.contains('show')) {
        messageButton.classList.add('pulse');
        setTimeout(() => {
          messageButton.classList.remove('pulse');
        }, 2000);
      }
    }, 5000); // Pulse every 5 seconds
    
    console.log('📧 Message Button initialized with pulse animation');
  }
}

// Scroll to contact form function
function scrollToContactForm() {
  const contactForm = document.querySelector('.contact-form');
  const mainContent = document.querySelector('.main-content');
  
  if (contactForm && mainContent) {
    const formPosition = contactForm.offsetTop - 80; // Add some offset for better view
    
    // Add haptic feedback on mobile
    if (isMobile && navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    mainContent.scrollTo({
      top: formPosition,
      behavior: 'smooth'
    });
    
    // Add visual feedback to the button
    const messageButton = document.getElementById('messageButtonBottom');
    if (messageButton) {
      messageButton.style.transform = 'translateY(-3px) scale(0.95)';
      setTimeout(() => {
        messageButton.style.transform = '';
      }, 200);
    }
    
    // Focus on the first input field after scrolling
    setTimeout(() => {
      const nameInput = document.getElementById('name');
      if (nameInput) {
        nameInput.focus();
        // Add a subtle highlight effect
        nameInput.style.boxShadow = '0 0 0 2px rgba(254, 202, 87, 0.5)';
        setTimeout(() => {
          nameInput.style.boxShadow = '';
        }, 2000);
      }
    }, 800);
    
    console.log('📧 Scrolled to contact form with enhanced feedback');
  }
}

// Make function globally available
window.scrollToContactForm = scrollToContactForm;

// Enhanced scroll-based navigation highlighting with real-time detection
function handleScrollNavigation() {
  const mainContent = document.querySelector('.main-content');
  const sections = document.querySelectorAll('.content-section');
  const navItems = document.querySelectorAll('.nav-item');
  
  if (!mainContent || !sections.length) return;
  
  const scrollTop = mainContent.scrollTop;
  const containerHeight = mainContent.clientHeight;
  
  // Handle message button visibility
  handleMessageButtonVisibility();
  
  let currentSection = null;
  let maxVisibility = 0;
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    
    // Calculate how much of the section is visible
    const viewportTop = scrollTop;
    const viewportBottom = scrollTop + containerHeight;
    
    // Calculate intersection
    const intersectionTop = Math.max(viewportTop, sectionTop);
    const intersectionBottom = Math.min(viewportBottom, sectionBottom);
    const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);
    
    // Calculate visibility percentage of the section
    const visibilityPercentage = intersectionHeight / Math.min(sectionHeight, containerHeight);
    
    // Consider a section "current" if it's more than 30% visible OR if we're near the top of it
    const isNearTop = (scrollTop >= sectionTop - 100) && (scrollTop < sectionTop + 200);
    const isSignificantlyVisible = visibilityPercentage > 0.3;
    
    if ((isSignificantlyVisible || isNearTop) && visibilityPercentage > maxVisibility) {
      maxVisibility = visibilityPercentage;
      currentSection = section;
    }
  });
  
  // Update navigation highlighting
  if (currentSection) {
    const sectionId = currentSection.id;
    updateActiveNavigation(sectionId);
  }
}

// Function to update active navigation state
function updateActiveNavigation(sectionId) {
  const navItems = document.querySelectorAll('.nav-item');
  
  // Remove active class from all nav items
  navItems.forEach(nav => nav.classList.remove('active'));
  
  // Add active class to the corresponding nav item
  const activeNav = document.querySelector(`.${sectionId}-nav`);
  if (activeNav) {
    activeNav.classList.add('active');
    console.log(`🎯 Navigation updated - Active section: ${sectionId}`);
  }
}

// Improved Intersection Observer for better scroll detection
function setupIntersectionObserver() {
  const sections = document.querySelectorAll('.content-section');
  
  const observerOptions = {
    root: document.querySelector('.main-content'),
    rootMargin: '-20% 0px -20% 0px', // Better detection area
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
  };
  
  const observer = new IntersectionObserver((entries) => {
    let mostVisibleSection = null;
    let maxIntersectionRatio = 0;
    
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
        maxIntersectionRatio = entry.intersectionRatio;
        mostVisibleSection = entry.target;
      }
    });
    
    if (mostVisibleSection && maxIntersectionRatio > 0.1) {
      const sectionId = mostVisibleSection.id;
      updateActiveNavigation(sectionId);
    }
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));
  return observer;
}

// Enhanced scroll listener and initialization for responsive navigation
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Message Button
  initializeMessageButton();
  
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    // Setup both detection systems for maximum reliability
    const observer = setupIntersectionObserver();
    
    // Enhanced scroll listener with immediate response
    let isScrolling = false;
    let scrollTimeout;
    
    mainContent.addEventListener('scroll', () => {
      if (!isScrolling) {
        // Immediate response for smooth navigation
        requestAnimationFrame(() => {
          handleScrollNavigation();
          isScrolling = false;
        });
        isScrolling = true;
      }
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to handle scroll end
      scrollTimeout = setTimeout(() => {
        handleScrollNavigation();
      }, 150);
    });
    
    // Add touch scroll support for mobile
    if (isMobile) {
      let startY = 0;
      let isScrollingTouch = false;
      
      mainContent.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        isScrollingTouch = false;
      }, { passive: true });
      
      mainContent.addEventListener('touchmove', (e) => {
        if (!isScrollingTouch) {
          isScrollingTouch = true;
          requestAnimationFrame(() => {
            handleScrollNavigation();
          });
        }
      }, { passive: true });
      
      mainContent.addEventListener('touchend', () => {
        setTimeout(() => {
          handleScrollNavigation();
        }, 100);
      }, { passive: true });
    }
    
    // Initial setup - set about section as active
    setTimeout(() => {
      // Clear any existing active states
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Set the first section (about) as active by default
      updateActiveNavigation('about');
      
      // Ensure main content starts at top
      mainContent.scrollTop = 0;
      
      console.log('✅ Navigation system initialized - About section active by default');
    }, 100);
    
    // Enhanced navigation click feedback - optimized for mobile
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(navItem => {
      // Only add hover effects on non-mobile devices
      if (!isMobile) {
        navItem.addEventListener('mouseenter', () => {
          if (!navItem.classList.contains('active')) {
            navItem.style.transform = 'translateX(3px) scale(1.02)';
          }
        });
        
        navItem.addEventListener('mouseleave', () => {
          if (!navItem.classList.contains('active')) {
            navItem.style.transform = '';
          }
        });
      }
      
      // Touch/click feedback for all devices
      navItem.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add click feedback with persistence
        if (!isMobile) {
          navItem.style.transform = 'translateX(8px) scale(1.08)';
        }
        
        // Mobile-specific feedback
        if (isMobile) {
          navItem.style.backgroundColor = 'rgba(254, 202, 87, 0.3)';
          setTimeout(() => {
            navItem.style.backgroundColor = '';
          }, 200);
        }
        
        // Ensure the active class persists
        setTimeout(() => {
          if (navItem.classList.contains('active')) {
            if (!isMobile) {
              navItem.style.transform = 'translateX(8px) scale(1.08)';
            }
          } else {
            navItem.style.transform = '';
          }
        }, 150);
        
        // Force active state to persist for clicked navigation
        setTimeout(() => {
          if (navItem.classList.contains('active')) {
            // Double-check active state is maintained
            const currentActiveNav = document.querySelector('.nav-item.active');
            if (!currentActiveNav || currentActiveNav !== navItem) {
              document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
              });
              navItem.classList.add('active');
            }
          }
        }, 800); // Check after scroll animation completes
      });
      
      // Add touch feedback for mobile
      if (isMobile) {
        navItem.addEventListener('touchstart', () => {
          navItem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }, { passive: true });
        
        navItem.addEventListener('touchend', () => {
          setTimeout(() => {
            navItem.style.backgroundColor = '';
          }, 150);
        }, { passive: true });
      }
    });
    
    // Add scroll position indicator (optional debug)
    let lastScrollPosition = 0;
    mainContent.addEventListener('scroll', () => {
      const currentScroll = mainContent.scrollTop;
      const scrollDirection = currentScroll > lastScrollPosition ? 'down' : 'up';
      lastScrollPosition = currentScroll;
      
      // Optional: Log scroll direction for debugging
      // console.log(`🔄 Scrolling ${scrollDirection} - Position: ${currentScroll}`);
    });
  }
});

// Function to show "Link coming soon" popup for projects
function showLinkComingSoon() {
  alert('Link will be added soon! 🚀');
}

// Make showLinkComingSoon globally available
window.showLinkComingSoon = showLinkComingSoon;

// Theme toggle functionality

// Theme toggle functionality (if theme toggle exists)
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme setup
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  }
  
  // Portfolio navigation setup
  console.log('=== Portfolio loaded ===');
  console.log('showPanel function available:', typeof window.showPanel);
  console.log('closePanel function available:', typeof window.closePanel);
  
  // Test panel detection
  const panels = document.querySelectorAll('.panel');
  const navItems = document.querySelectorAll('.nav-item');
  console.log('Found panels:', panels.length);
  console.log('Found nav items:', navItems.length);
  
  // Clear URL hash and force scroll to top
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
  
  initializeSpaceObjects();
  initializeCertificates();
});

window.addEventListener('load', () => {
  // Additional scroll to top after full page load to counter browser restore
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.scroll(0, 0);
    // Ensure hash is cleared again
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
  }, 0);
});

// Initialize space object interactions
function initializeSpaceObjects() {
  const asteroid = document.querySelector('.asteroid-1');
  const satellite = document.querySelector('.satellite-1');
  const nebula = document.querySelector('.nebula-1');
  
  // Asteroid clicks - show skills
  if (asteroid) {
    asteroid.addEventListener('click', () => {
      showPanel('skills');
      asteroid.style.animation = 'asteroidFloat 2s ease-in-out';
    });
  }
  
  // Satellite clicks - show projects
  if (satellite) {
    satellite.addEventListener('click', () => {
      showPanel('projects');
      satellite.style.transform = 'scale(1.3) rotate(360deg)';
      setTimeout(() => {
        satellite.style.transform = '';
      }, 600);
    });
  }
  
  // Nebula clicks - show education
  if (nebula) {
    nebula.addEventListener('click', () => {
      showPanel('education');
      nebula.style.filter = 'blur(0px) brightness(2)';
      setTimeout(() => {
        nebula.style.filter = '';
      }, 800);
    });
  }
}

// Certificate links management
function initializeCertificates() {
  // ===== UPDATE YOUR CERTIFICATE LINKS HERE =====
  // Replace the placeholder URLs with your actual certificate links
  const certificateLinks = {
    aws: 'https://www.credly.com/badges/4008130f-fbb8-4cbf-93e7-55618297c860/public_url',                    // AWS Academy Graduate - AWS Cloud Foundations
    'ccna-enterprise': 'https://www.credly.com/badges/90e84a07-fcf5-4acb-821c-c54420dc38c4/public_url',      // CCNA: Enterprise Networking, Security, and Automation
    'ccna-intro': 'https://www.credly.com/badges/032e7c0a-ed73-42d5-9664-1fad3711ba05/public_url',                // CCNA: Introduction to Networks
    'ccna-switching': 'https://www.credly.com/badges/33521f93-7a9e-48dd-8668-93c6e3171acc/public_url',        // CCNA: Switching, Routing, and Wireless Essentials
    cybersecurity: 'https://www.credly.com/badges/40d1bf10-033c-4222-acdc-646fd7ca7072/public_url',            // Introduction to Cybersecurity
    python1: 'https://www.credly.com/badges/b17b1744-bad7-4ea9-98ce-1e0889b55e0f/public_url',                        // Python Essentials 1
    python2: 'https://www.credly.com/badges/4bd8571a-6e1c-479f-a8f3-0952c730d6f6/public_url'                         // Python Essentials 2
  };
  // ===============================================
  
  // Add click handlers to certificate links
  document.querySelectorAll('.cert-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const certType = link.getAttribute('data-cert');
      const certUrl = certificateLinks[certType];
      
      // Certificate display names for user-friendly messages
      const certDisplayNames = {
        'aws': 'AWS ACADEMY GRADUATE',
        'ccna-enterprise': 'CCNA-ENTERPRISE',
        'ccna-intro': 'CCNA-INTRODUCTION',
        'ccna-switching': 'CCNA-SWITCHING',
        'cybersecurity': 'CYBERSECURITY',
        'python1': 'PYTHON-ESSENTIALS-1',
        'python2': 'PYTHON-ESSENTIALS-2'
      };
      
      if (certUrl && !certUrl.includes('your-')) {
        // Open actual certificate link
        window.open(certUrl, '_blank');
      } else {
        // Show placeholder message with proper certificate name
        const displayName = certDisplayNames[certType] || certType.toUpperCase();
        alert(`Certificate link for ${displayName} will be added soon!`);
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('=== Portfolio loaded ===');
  console.log('showPanel function available:', typeof window.showPanel);
  console.log('closePanel function available:', typeof window.closePanel);
  
  // Test panel detection
  const panels = document.querySelectorAll('.panel');
  const navItems = document.querySelectorAll('.nav-item');
  console.log('Found panels:', panels.length);
  console.log('Found nav items:', navItems.length);
  
  initializeSpaceObjects();
});

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  // Initialize EmailJS with your actual User ID
  emailjs.init('RD85aIMspEE5s7Gzb'); // Replace with your actual EmailJS User ID

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message'),
      to_email: 'whatsupayush@gmail.com', // Your email address
    };

    try {
      const response = await emailjs.send(
        'service_y0tr9c6', // Replace with your actual Service ID
        'template_8amzd8k', // Replace with your actual Template ID
        templateParams
      );

      console.log('SUCCESS!', response.status, response.text);
      
      formMessage.textContent = 'Message sent successfully!';
      formMessage.className = 'form-message success show';
      contactForm.reset();
      
    } catch (error) {
      console.error('FAILED...', error);
      
      formMessage.textContent = 'Failed to send message. Please try again.';
      formMessage.className = 'form-message error show';
    } finally {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove('show');
    }, 5000);
  });
}

const roleText = document.getElementById('role-text');
const roles = ['UI/UX Designer', 'Web Developer', 'Creative Coder', 'Graphic Designer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    roleText.textContent = currentRole.substring(0, charIndex);
    charIndex++;
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1500);
    } else {
      setTimeout(typeRole, 100);
    }
  } else {
    roleText.textContent = currentRole.substring(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
    } else {
      setTimeout(typeRole, 50);
    }
  }
}

typeRole();

// Scroll-triggered animations for Skills section
function animateSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach((item, index) => {
    const progressBar = item.querySelector('.skill-progress');
    const percentage = progressBar.getAttribute('data-width');
    
    // Delay each skill bar animation slightly for a cascade effect
    setTimeout(() => {
      progressBar.style.width = percentage + '%';
    }, index * 150); // 150ms delay between each bar
  });
}

function animateSkillTags() {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach((tag, index) => {
    // Reset animation
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    
    // Animate in with delay
    setTimeout(() => {
      tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      tag.style.opacity = '1';
      tag.style.transform = 'translateY(0)';
    }, index * 100 + 800); // Start after skill bars with staggered delay
  });
}

function animateStatsGrid() {
  const statItems = document.querySelectorAll('.stat-item');
  
  statItems.forEach((item, index) => {
    // Reset animation
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    
    // Animate in with delay
    setTimeout(() => {
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    }, index * 200);
  });
}

// Enhanced intersection observer that triggers animations
function setupAnimationObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionClass = entry.target.className;
        
        if (sectionClass.includes('skills-section')) {
          console.log('🎯 Skills section entered - triggering animations');
          // Trigger skill animations
          setTimeout(() => animateSkillBars(), 200);
          setTimeout(() => animateSkillTags(), 500);
        }
        
        if (sectionClass.includes('about-section')) {
          console.log('📊 About section entered - triggering stats animation');
          // Trigger stats animation
          setTimeout(() => animateStatsGrid(), 300);
        }
      }
    });
  }, observerOptions);
  
  // Observe sections that have animations
  const skillsSection = document.querySelector('.skills-section');
  const aboutSection = document.querySelector('.about-section');
  
  if (skillsSection) animationObserver.observe(skillsSection);
  if (aboutSection) animationObserver.observe(aboutSection);
}

// Initialize animation observer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupAnimationObserver();
});

// Also trigger animations when clicking navigation (for immediate response)
const originalScrollToSection = window.scrollToSection;
window.scrollToSection = function(sectionName) {
  // Call original function
  originalScrollToSection(sectionName);
  
  // Trigger animations based on section
  setTimeout(() => {
    if (sectionName === 'skills') {
      console.log('🎯 Skills navigation clicked - triggering animations');
      animateSkillBars();
      setTimeout(() => animateSkillTags(), 300);
    }
    
    if (sectionName === 'about') {
      console.log('📊 About navigation clicked - triggering stats animation');
      animateStatsGrid();
    }
  }, 800); // Wait for scroll animation to complete
};

// Interactive Solar System with Mouse Repulsion
class SolarSystemController {
  constructor() {
    this.elements = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.isActive = true;
    this.maxRepelDistance = 150;
    this.repelStrength = 0.5;
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    // Get all solar system elements
    const solarElements = document.querySelectorAll('.solar-element');
    
    solarElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const repelStrength = parseFloat(element.dataset.repelStrength) || 1;
      
      this.elements.push({
        element: element,
        originalX: rect.left + rect.width / 2,
        originalY: rect.top + rect.height / 2,
        currentX: 0,
        currentY: 0,
        repelStrength: repelStrength,
        isRepelled: false
      });
    });
    
    // Setup mouse tracking
    this.setupMouseTracking();
    
    // Start animation loop
    this.animate();
    
    console.log('🌌 Solar system initialized with', this.elements.length, 'elements');
  }
  
  setupMouseTracking() {
    // Only setup mouse tracking on desktop for better mobile performance
    if (mobileSettings.enableSolarSystemInteraction) {
      // Track mouse movement
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      });
      
      // Pause repulsion when mouse leaves window
      document.addEventListener('mouseleave', () => {
        this.isActive = false;
        this.resetAllElements();
      });
      
      document.addEventListener('mouseenter', () => {
        this.isActive = true;
      });
    } else {
      // Disable solar system interaction on mobile
      console.log('📱 Solar system interaction disabled on mobile for better performance');
      this.isActive = false;
    }
  }
  
  calculateRepulsion(elementData) {
    if (!this.isActive) return { x: 0, y: 0 };
    
    const deltaX = this.mouseX - elementData.originalX;
    const deltaY = this.mouseY - elementData.originalY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance > this.maxRepelDistance) {
      return { x: 0, y: 0 };
    }
    
    // Calculate repulsion force (stronger when closer)
    const force = (this.maxRepelDistance - distance) / this.maxRepelDistance;
    const repelX = -(deltaX / distance) * force * this.repelStrength * elementData.repelStrength * 50;
    const repelY = -(deltaY / distance) * force * this.repelStrength * elementData.repelStrength * 50;
    
    return { x: repelX, y: repelY };
  }
  
  animate() {
    this.elements.forEach(elementData => {
      const repulsion = this.calculateRepulsion(elementData);
      
      // Smooth transition to new position
      elementData.currentX += (repulsion.x - elementData.currentX) * 0.1;
      elementData.currentY += (repulsion.y - elementData.currentY) * 0.1;
      
      // Apply transform
      const transform = `translate(${elementData.currentX}px, ${elementData.currentY}px)`;
      elementData.element.style.transform = transform;
      
      // Update repelled state for visual feedback
      const isCurrentlyRepelled = Math.abs(elementData.currentX) > 5 || Math.abs(elementData.currentY) > 5;
      if (isCurrentlyRepelled !== elementData.isRepelled) {
        elementData.isRepelled = isCurrentlyRepelled;
        elementData.element.style.filter = isCurrentlyRepelled ? 'brightness(1.3) saturate(1.2)' : '';
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
  
  resetAllElements() {
    this.elements.forEach(elementData => {
      elementData.currentX = 0;
      elementData.currentY = 0;
      elementData.element.style.transform = 'translate(0px, 0px)';
      elementData.element.style.filter = '';
      elementData.isRepelled = false;
    });
  }
  
  // Public methods for interaction
  setRepelStrength(strength) {
    this.repelStrength = Math.max(0, Math.min(2, strength));
  }
  
  setMaxDistance(distance) {
    this.maxRepelDistance = Math.max(50, Math.min(300, distance));
  }
  
  toggle() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.resetAllElements();
    }
  }
}

// Initialize Solar System
let solarSystem;

document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure all elements are positioned
  setTimeout(() => {
    solarSystem = new SolarSystemController();
  }, 100);
});

// Expose solar system controls globally (for debugging/customization)
window.solarSystemControls = {
  setStrength: (strength) => solarSystem?.setRepelStrength(strength),
  setDistance: (distance) => solarSystem?.setMaxDistance(distance),
  toggle: () => solarSystem?.toggle(),
  reset: () => solarSystem?.resetAllElements()
};

// Interactive Stars with Mouse Repulsion
class InteractiveStarsController {
  constructor() {
    this.stars = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.isActive = true;
    this.maxRepelDistance = 150; // Increased from 100
    this.repelStrength = 0.8; // Increased from 0.3
    this.starCount = {
      small: 160,  // Doubled from 80
      medium: 100, // Doubled from 50  
      large: 60    // Doubled from 30
    };
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    // Clear existing CSS-based stars
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) {
      console.error('❌ Stars container not found!');
      return;
    }
    
    console.log('🌟 Setting up interactive stars...');
    
    // Clear existing stars and replace with interactive ones
    starsContainer.innerHTML = '';
    
    // Create individual star elements
    this.createStars(starsContainer);
    
    // Setup mouse tracking
    this.setupMouseTracking();
    
    // Start animation loop
    this.animate();
    
    console.log('✨ Interactive stars initialized with', this.stars.length, 'stars');
  }
  
  createStars(container) {
    // Create small stars
    for (let i = 0; i < this.starCount.small; i++) {
      this.createStar(container, 'small');
    }
    
    // Create medium stars
    for (let i = 0; i < this.starCount.medium; i++) {
      this.createStar(container, 'medium');
    }
    
    // Create large stars
    for (let i = 0; i < this.starCount.large; i++) {
      this.createStar(container, 'large');
    }
  }
  
  createStar(container, size) {
    const star = document.createElement('div');
    star.className = `interactive-star star-${size}`;
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Size and opacity based on star type
    let starSize, opacity, brightness;
    switch (size) {
      case 'small':
        starSize = Math.random() * 2 + 2; // Increased from 1-3px to 2-4px
        opacity = Math.random() * 0.4 + 0.4; // Increased from 0.2-0.6 to 0.4-0.8
        brightness = Math.random() * 0.3 + 0.7; // Increased from 0.5-1 to 0.7-1
        break;
      case 'medium':
        starSize = Math.random() * 2 + 3; // Increased from 2-4px to 3-5px
        opacity = Math.random() * 0.3 + 0.5; // Increased from 0.4-0.7 to 0.5-0.8
        brightness = Math.random() * 0.2 + 0.8; // Increased from 0.6-1 to 0.8-1
        break;
      case 'large':
        starSize = Math.random() * 3 + 4; // Increased from 3-5px to 4-7px
        opacity = Math.random() * 0.2 + 0.7; // Increased from 0.6-0.8 to 0.7-0.9
        brightness = Math.random() * 0.2 + 0.8; // Increased from 0.7-1 to 0.8-1
        break;
    }
    
    // Apply styles
    star.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${starSize}px;
      height: ${starSize}px;
      background: radial-gradient(circle, rgba(255,255,255,${brightness}) 0%, transparent 70%);
      border-radius: 50%;
      opacity: ${opacity};
      pointer-events: none;
      transition: all 0.1s ease-out;
      z-index: 1;
      box-shadow: 0 0 ${starSize}px rgba(255,255,255,0.3);
    `;
    
    container.appendChild(star);
    
    // Store star data
    this.stars.push({
      element: star,
      originalX: x,
      originalY: y,
      currentX: 0,
      currentY: 0,
      size: size,
      baseOpacity: opacity,
      baseBrightness: brightness,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.01
    });
  }
  
  setupMouseTracking() {
    console.log('🖱️ Setting up mouse tracking for stars...');
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    
    // Pause repulsion when mouse leaves window
    document.addEventListener('mouseleave', () => {
      console.log('🖱️ Mouse left window - pausing star repulsion');
      this.isActive = false;
      this.resetAllStars();
    });
    
    document.addEventListener('mouseenter', () => {
      console.log('🖱️ Mouse entered window - activating star repulsion');
      this.isActive = true;
    });
  }
  
  calculateRepulsion(starData) {
    if (!this.isActive) return { x: 0, y: 0 };
    
    const deltaX = this.mouseX - starData.originalX;
    const deltaY = this.mouseY - starData.originalY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance > this.maxRepelDistance) {
      return { x: 0, y: 0 };
    }
    
    // Calculate repulsion force (stronger when closer)
    const force = (this.maxRepelDistance - distance) / this.maxRepelDistance;
    const sizeMultiplier = starData.size === 'large' ? 1.5 : starData.size === 'medium' ? 1.2 : 1;
    const repelX = -(deltaX / distance) * force * this.repelStrength * sizeMultiplier * 60; // Increased from 30
    const repelY = -(deltaY / distance) * force * this.repelStrength * sizeMultiplier * 60; // Increased from 30
    
    return { x: repelX, y: repelY };
  }
  
  animate() {
    const time = Date.now() * 0.001;
    
    this.stars.forEach(starData => {
      const repulsion = this.calculateRepulsion(starData);
      
      // Smooth transition to new position (more responsive)
      starData.currentX += (repulsion.x - starData.currentX) * 0.15; // Increased from 0.08
      starData.currentY += (repulsion.y - starData.currentY) * 0.15; // Increased from 0.08
      
      // Calculate twinkle effect
      const twinkle = Math.sin(time * starData.twinkleSpeed + starData.twinklePhase) * 0.3 + 0.7;
      const currentOpacity = starData.baseOpacity * twinkle;
      
      // Apply transform and effects
      const transform = `translate(${starData.currentX}px, ${starData.currentY}px)`;
      starData.element.style.transform = transform;
      starData.element.style.opacity = currentOpacity;
      
      // Add slight brightness boost when repelled
      const isRepelled = Math.abs(starData.currentX) > 3 || Math.abs(starData.currentY) > 3;
      if (isRepelled) {
        starData.element.style.filter = 'brightness(1.5) saturate(1.2)';
        starData.element.style.boxShadow = `0 0 ${starData.size * 2}px rgba(255,255,255,0.5)`;
      } else {
        starData.element.style.filter = '';
        starData.element.style.boxShadow = '';
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
  
  resetAllStars() {
    this.stars.forEach(starData => {
      starData.currentX = 0;
      starData.currentY = 0;
      starData.element.style.transform = 'translate(0px, 0px)';
      starData.element.style.filter = '';
      starData.element.style.boxShadow = '';
    });
  }
  
  // Public methods for interaction
  setRepelStrength(strength) {
    this.repelStrength = Math.max(0, Math.min(2, strength));
  }
  
  setMaxDistance(distance) {
    this.maxRepelDistance = Math.max(50, Math.min(200, distance));
  }
  
  toggle() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.resetAllStars();
    }
  }
  
  // Handle window resize
  handleResize() {
    // Regenerate stars for new window size
    const starsContainer = document.querySelector('.stars-container');
    if (starsContainer) {
      this.stars = [];
      starsContainer.innerHTML = '';
      this.createStars(starsContainer);
    }
  }
}

// Initialize Interactive Stars - Simplified and Direct Approach
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM loaded, creating test stars...');
  
  // Wait a bit for everything to load
  setTimeout(() => {
    createInteractiveStars();
  }, 500);
});

function createInteractiveStars() {
  console.log('🌟 Creating interactive stars...');
  
  const starsContainer = document.querySelector('.stars-container');
  
  if (!starsContainer) {
    console.error('❌ Stars container not found!');
    return;
  }
  
  // Clear any existing content
  starsContainer.innerHTML = '';
  
  // Create stars array to track them
  const stars = [];
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  // Mobile-optimized star count for better performance
  const starCount = mobileSettings.starCount;
  console.log(`📱 Creating ${starCount} stars for mobile optimization`);
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'test-star';
    
    // Random position across full screen
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Mobile-optimized star distribution for better performance
    let starSize, opacity;
    const sizeRandom = Math.random();
    
    if (isMobile) {
      // Simplified star sizes for mobile performance
      if (sizeRandom < 0.8) {
        // 80% small stars
        starSize = Math.random() * 1.0 + 0.5;
        opacity = Math.random() * 0.3 + 0.2;
      } else if (sizeRandom < 0.95) {
        // 15% medium stars
        starSize = Math.random() * 1.5 + 1.0;
        opacity = Math.random() * 0.4 + 0.4;
      } else {
        // 5% bright stars
        starSize = Math.random() * 2.0 + 1.5;
        opacity = Math.random() * 0.3 + 0.6;
      }
    } else {
      // Desktop star distribution
      if (sizeRandom < 0.75) {
        starSize = Math.random() * 0.7 + 0.1;
        opacity = Math.random() * 0.15 + 0.05;
      } else if (sizeRandom < 0.90) {
        starSize = Math.random() * 0.9 + 0.6;
        opacity = Math.random() * 0.3 + 0.2;
      } else if (sizeRandom < 0.975) {
        starSize = Math.random() * 1.5 + 1.0;
        opacity = Math.random() * 0.4 + 0.4;
      } else if (sizeRandom < 0.995) {
        starSize = Math.random() * 1.5 + 2.0;
        opacity = Math.random() * 0.3 + 0.6;
      } else {
        starSize = Math.random() * 2.0 + 3.0;
        opacity = Math.random() * 0.2 + 0.75;
      }
    }
    
    // Simplified color for mobile
    const starColor = isMobile ? '#fff' : (Math.random() < 0.05 ? '#ffffcc' : (Math.random() < 0.08 ? '#ccddff' : '#fff'));
    
    // Mobile-optimized styling with reduced effects
    const glowIntensity = isMobile ? starSize * 1.5 : starSize * 2;
    const boxShadowMobile = isMobile 
      ? `0 0 ${glowIntensity}px rgba(255,255,255,${opacity * 0.4})`
      : `0 0 ${starSize * 2}px rgba(255,255,255,${opacity * 0.6}), 
         0 0 ${starSize * 4}px rgba(255,255,255,${opacity * 0.2}),
         0 0 ${starSize * 6}px rgba(255,255,255,${opacity * 0.1})`;
    
    star.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${starSize}px;
      height: ${starSize}px;
      background: ${starColor};
      border-radius: 50%;
      box-shadow: ${boxShadowMobile};
      z-index: 10;
      pointer-events: none;
      opacity: ${opacity};
      ${isMobile ? 'will-change: transform;' : ''}
    `;
    
    starsContainer.appendChild(star);
    
    stars.push({
      element: star,
      originalX: x,
      originalY: y,
      currentX: 0,
      currentY: 0,
      size: starSize,
      baseOpacity: opacity
    });
  }
  
  console.log(`✅ Created ${stars.length} mobile-optimized stars`);
  
  // Mouse and touch tracking (optimized for mobile)
  if (mobileSettings.enableStarInteraction) {
    console.log('🖱️ Setting up mouse tracking for star repelling...');
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Add touch support for tablets (but disabled on mobile for performance)
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0 && !isMobile) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    }, { passive: true });
    
    // Debug mouse position periodically
    setInterval(() => {
      console.log(`🖱️ Mouse position: ${mouseX}, ${mouseY}`);
    }, 5000);
  }
  
  // Desktop-optimized animation loop
  function animate() {
    // Only animate on desktop when star interaction is enabled
    if (!mobileSettings.enableStarInteraction) {
      return; // Static stars on mobile
    }
    
    let repelledStars = 0;
    
    stars.forEach(starData => {
      const deltaX = mouseX - starData.originalX;
      const deltaY = mouseY - starData.originalY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 150) {
        repelledStars++;
        const force = (150 - distance) / 150;
        const repelX = -(deltaX / distance) * force * 80; // Increased from 60
        const repelY = -(deltaY / distance) * force * 80; // Increased from 60
        
        starData.currentX += (repelX - starData.currentX) * 0.4; // Increased from 0.3
        starData.currentY += (repelY - starData.currentY) * 0.4; // Increased from 0.3
        
        starData.element.style.boxShadow = '0 0 25px rgba(255,255,255,1), 0 0 50px rgba(255,255,255,0.8)';
      } else {
        starData.currentX *= 0.88; // Slightly increased from 0.85
        starData.currentY *= 0.88; // Slightly increased from 0.85
        
        starData.element.style.boxShadow = '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.5)';
      }
      
      starData.element.style.transform = `translate(${starData.currentX}px, ${starData.currentY}px)`;
    });
    
    // Debug repelled stars count occasionally
    if (repelledStars > 0 && Math.random() < 0.01) {
      console.log(`⭐ ${repelledStars} stars being repelled`);
    }
    
    requestAnimationFrame(animate);
  }
  
  // Start animation based on device capabilities
  if (mobileSettings.enableStarInteraction) {
    animate();
    console.log('🎬 Desktop star animation started with repelling effect');
  } else {
    console.log('📱 Mobile: Static stars for better performance');
  }
  
  // Global controls for testing
  window.testStars = {
    stars: stars,
    mouseX: () => mouseX,
    mouseY: () => mouseY,
    starCount: () => stars.length,
    isMobile: isMobile,
    settings: mobileSettings
  };
}

// Mobile Swipe Carousel Functionality
function initializeSwipeCarousels() {
  // Force mobile behavior for testing or actual mobile detection
  const shouldShowCarousels = isMobile || window.innerWidth <= 768;
  if (!shouldShowCarousels) return; // Only run on mobile or small screens
  
  console.log('🎯 Initializing swipe carousels...', { isMobile, windowWidth: window.innerWidth });
  
  const carousels = [
    { container: '.projects-grid', itemSelector: '.project-item' },
    { container: '.timeline', itemSelector: '.timeline-item' },
    { container: '.certifications', itemSelector: '.cert-item' }
  ];
  
  carousels.forEach(carousel => {
    const container = document.querySelector(carousel.container);
    console.log(`🔍 Checking carousel: ${carousel.container}`, container);
    if (!container) return;
    
    const items = container.querySelectorAll(carousel.itemSelector);
    console.log(`📦 Found ${items.length} items in ${carousel.container}`);
    if (items.length <= 1) return; // No need for indicators if only one item
    
    // Remove existing indicators if any
    const existingIndicators = container.parentNode.querySelector('.swipe-indicators');
    if (existingIndicators) {
      existingIndicators.remove();
    }
    
    // Create indicators container
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'swipe-indicators';
    
    // Create dots
    for (let i = 0; i < items.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'swipe-dot';
      if (i === 0) dot.classList.add('active');
      indicatorsContainer.appendChild(dot);
    }
    
    // Insert indicators after the container
    container.parentNode.insertBefore(indicatorsContainer, container.nextSibling);
    console.log(`✅ Created ${items.length} dots for ${carousel.container}`);
    
    // Update active dot based on scroll position
    function updateActiveDot() {
      const scrollLeft = container.scrollLeft;
      const itemWidth = items[0].offsetWidth;
      const gap = parseInt(getComputedStyle(container).gap) || 20;
      const totalItemWidth = itemWidth + gap;
      
      // Calculate which item is most visible
      const activeIndex = Math.round(scrollLeft / totalItemWidth);
      const clampedIndex = Math.max(0, Math.min(activeIndex, items.length - 1));
      
      // Update dots
      const dots = indicatorsContainer.querySelectorAll('.swipe-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === clampedIndex);
      });
      
      console.log(`🎯 Updated active dot to index ${clampedIndex}`);
    }
    
    // Listen for scroll events with throttling
    let scrollTimeout;
    container.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveDot, 50);
    });
    
    // Optional: Click dots to scroll to item
    const dots = indicatorsContainer.querySelectorAll('.swipe-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const itemWidth = items[0].offsetWidth;
        const gap = parseInt(getComputedStyle(container).gap) || 20;
        const scrollPosition = index * (itemWidth + gap);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        
        console.log(`🎯 Clicked dot ${index}, scrolling to position ${scrollPosition}`);
      });
    });
  });
}

// Initialize swipe carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Delay initialization to ensure all elements are ready
  setTimeout(initializeSwipeCarousels, 1000);
});

// Re-initialize on window resize (orientation change)
window.addEventListener('resize', () => {
  // Clear existing indicators and reinitialize
  setTimeout(() => {
    const existingIndicators = document.querySelectorAll('.swipe-indicators');
    existingIndicators.forEach(indicator => indicator.remove());
    
    if (window.innerWidth <= 768) {
      initializeSwipeCarousels();
    }
  }, 200);
});
