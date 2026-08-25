/**
 * RAMIT BATRA | Sticky Navigation & Mobile Menu Controller
 */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // 1. Sticky Navigation Scroll Observer
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Active Link Highlighting
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. Mobile Navigation Drawer Toggle
  if (navToggle && navDrawer) {
    const toggleMenu = (open) => {
      const shouldOpen = open !== undefined ? open : !navDrawer.classList.contains('open');
      if (shouldOpen) {
        navDrawer.classList.add('open');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        navDrawer.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close mobile menu on link click
    const mobileLinks = navDrawer.querySelectorAll('a');
    mobileLinks.forEach(l => {
      l.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }
});
