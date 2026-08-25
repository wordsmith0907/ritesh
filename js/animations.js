/**
 * RAMIT BATRA | Animation & GSAP Motion Controller
 */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll-triggered reveal animation (Vanilla / GSAP hybrid)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.02, rootMargin: '120px 0px 120px 0px' });

      revealElements.forEach(el => observer.observe(el));
      
      // Safety fallback: reveal all elements after 1.2 seconds if observer didn't trigger
      setTimeout(() => {
        revealElements.forEach(el => el.classList.add('is-visible'));
      }, 1200);
    } else {
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  }

  // 2. Parallax Scroll Effect for Hero Background Video & Typography
  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    const heroSection = document.querySelector('.hero-fullscreen');
    const heroVideo = document.querySelector('.hero-video-bg');
    const heroTitle = document.querySelector('.hero-bottom-left');
    const heroSub = document.querySelector('.hero-bottom-right');

    if (heroSection && heroVideo) {
      gsap.to(heroVideo, {
        yPercent: 30,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    if (heroSection && (heroTitle || heroSub)) {
      const heroTextElements = [heroTitle, heroSub].filter(Boolean);
      gsap.to(heroTextElements, {
        yPercent: -50,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '75% top',
          scrub: true
        }
      });
    }
  }

  // 3. FAQ Accordion Toggle Behavior (Single-Open Accordion)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other active FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        // Toggle current FAQ item
        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // 4. Portfolio & Lightbox Controller
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightboxModal && lightboxImg) {
    document.querySelectorAll('[data-lightbox]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const src = trigger.getAttribute('data-lightbox') || trigger.getAttribute('src');
        if (src) {
          lightboxImg.setAttribute('src', src);
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 5. Responsive Scroll-Driven Grid Animations (gsap.matchMedia)
  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    const mm = gsap.matchMedia();

    // Desktop (>= 769px): Exact 5x5 Pyramid Catch-Up & 3-Column Portfolio Animations
    mm.add("(min-width: 769px)", () => {
      // 5a. Home Page 5x5 Grid Pyramid Animation
      const gridContainer = document.querySelector('.grid-5');
      if (gridContainer) {
        const cards = Array.from(gridContainer.querySelectorAll('.gallery-card'));
        if (cards.length > 0) {
          const colCenter = [];
          const colInner = [];
          const colOuter = [];

          cards.forEach((card, index) => {
            const col = index % 5;
            if (col === 2) {
              colCenter.push(card);
            } else if (col === 1 || col === 3) {
              colInner.push(card);
            } else {
              colOuter.push(card);
            }
          });

          gsap.set(colCenter, { yPercent: 0, opacity: 0.85 });
          gsap.set(colInner,  { yPercent: 150, opacity: 0.35 });
          gsap.set(colOuter,  { yPercent: 200, opacity: 0.20 });

          const pyramidTl = gsap.timeline({
            scrollTrigger: {
              trigger: gridContainer,
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: 1.0,
              invalidateOnRefresh: true
            }
          });

          pyramidTl.to(colCenter, { yPercent: 0, opacity: 1, duration: 20, ease: 'power2.inOut' }, 0);
          pyramidTl.to(colInner,  { yPercent: 0, opacity: 1, duration: 70, ease: 'power2.inOut' }, 10);
          pyramidTl.to(colOuter,  { yPercent: 0, opacity: 1, duration: 60, ease: 'power2.inOut' }, 20);
        }
      }

      // 5b. Portfolio Page 3-Column Pyramid Catch-Up Animation
      const portfolioGrid = document.querySelector('.portfolio-grid');
      if (portfolioGrid) {
        const pCards = Array.from(portfolioGrid.querySelectorAll('.story-card'));
        if (pCards.length > 0) {
          const colLeft = [];
          const colCenter = [];
          const colRight = [];

          pCards.forEach((card, index) => {
            const col = index % 3;
            if (col === 1) {
              colCenter.push(card);
            } else if (col === 0) {
              colLeft.push(card);
            } else {
              colRight.push(card);
            }
          });

          gsap.set(colCenter, { yPercent: 0, opacity: 1, scale: 0.98 });
          gsap.set([colLeft, colRight], { yPercent: 90, opacity: 1, scale: 0.95 });

          const pTl = gsap.timeline({
            scrollTrigger: {
              trigger: portfolioGrid,
              start: 'top 80%',
              end: 'bottom 45%',
              scrub: 1.0,
              invalidateOnRefresh: true
            }
          });

          pTl.to(colCenter, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 25,
            ease: 'power2.out'
          }, 0);

          pTl.to([colLeft, colRight], {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 70,
            ease: 'power2.inOut'
          }, 15);
        }
      }
    });

    // Mobile & Tablet (<= 768px): Smooth Staggered Scroll-Reveals Tailored for 1-Col / 2-Col
    mm.add("(max-width: 768px)", () => {
      const gridContainer = document.querySelector('.grid-5');
      if (gridContainer) {
        const cards = Array.from(gridContainer.querySelectorAll('.gallery-card'));
        if (cards.length > 0) {
          gsap.set(cards, { yPercent: 0, y: 30, opacity: 0.15, scale: 0.96 });
          cards.forEach((card) => {
            gsap.to(card, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 60%',
                toggleActions: 'play none none none'
              }
            });
          });
        }
      }

      const portfolioGrid = document.querySelector('.portfolio-grid');
      if (portfolioGrid) {
        const pCards = Array.from(portfolioGrid.querySelectorAll('.story-card'));
        if (pCards.length > 0) {
          gsap.set(pCards, { yPercent: 0, y: 35, opacity: 0.2, scale: 0.96 });
          pCards.forEach((card) => {
            gsap.to(card, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'top 55%',
                toggleActions: 'play none none none'
              }
            });
          });
        }
      }
    });
  }

  // 6a. Scroll-Triggered Background Color Transition 1: Light Cream -> Dark Black (Quote -> Selected Work Gallery)
  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    const quoteSection = document.querySelector('.section-quote-block');
    const selectedWorkSection = document.getElementById('selected-work-section') || document.querySelector('.section-warm-dark');

    if (quoteSection && selectedWorkSection) {
      // Set starting state: Light Cream #FAF5EA
      gsap.set([quoteSection, selectedWorkSection], { backgroundColor: '#FAF5EA' });

      // Animate Quote & Selected Work together from Light Cream (#FAF5EA) -> Dark Black (#050505)
      gsap.to([quoteSection, selectedWorkSection], {
        backgroundColor: '#050505',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: selectedWorkSection,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });
    }

    // 6b. Scroll-Triggered Background Color Transition 2: Dark Black -> Light Cream (Our Weddings -> The Ritesh Story)
    const weddingsSection = document.getElementById('our-weddings-section');
    const riteshStorySection = document.getElementById('guided-by-emotion-section');

    if (weddingsSection && riteshStorySection) {
      // Set starting state: Dark Black #050505
      gsap.set([weddingsSection, riteshStorySection], { backgroundColor: '#050505' });

      // Animate Our Weddings & The Ritesh Story together from Dark Black (#050505) -> Light Cream (#FAF5EA)
      gsap.to([weddingsSection, riteshStorySection], {
        backgroundColor: '#FAF5EA',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: riteshStorySection,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });
    }

    // 6c. Scroll-Triggered Background Color Transition for Portfolio Page: Dark Black (#050505) -> White (#FFFFFF)
    const portfolioGallery = document.getElementById('portfolio-gallery-section');
    const portfolioContact = document.querySelector('.portfolio-dark-page #contact-studio-section');

    if (portfolioGallery && portfolioContact) {
      // Set starting state: Dark Black #050505
      gsap.set(portfolioContact, { backgroundColor: '#050505' });

      // Animate Portfolio Gallery & Contact Section from Dark Black (#050505) -> White (#FFFFFF)
      gsap.to([portfolioGallery, portfolioContact], {
        backgroundColor: '#FFFFFF',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: portfolioContact,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });
    }
  }

  // Ensure ScrollTrigger recalculates after images finish loading
  window.addEventListener('load', () => {
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  });

  // 7. Our Weddings Continuous Auto-Scrolling Carousel
  // Infinite seamless loop from right to left, running independently of page scroll.
  // Hover & touch interaction: smoothly reduces speed by 20-50% on hover/touch, eases back to 100%.
  if (window.gsap && !prefersReducedMotion) {
    const carouselTrack = document.querySelector('.weddings-carousel-track');
    const carouselWrapper = document.querySelector('.weddings-carousel-wrapper');

    if (carouselTrack && carouselWrapper) {
      // Animate track leftward by 50% (the width of the first set of 4 cards)
      const carouselTween = gsap.to(carouselTrack, {
        xPercent: -50,
        duration: 32,
        ease: 'none',
        repeat: -1
      });

      // Hover interaction
      carouselWrapper.addEventListener('mouseenter', () => {
        gsap.to(carouselTween, { timeScale: 0.8, duration: 0.5, ease: 'power1.out' });
      });

      carouselWrapper.addEventListener('mouseleave', () => {
        gsap.to(carouselTween, { timeScale: 1.0, duration: 0.5, ease: 'power1.out' });
      });

      // Mobile Touch Interaction
      carouselWrapper.addEventListener('touchstart', () => {
        gsap.to(carouselTween, { timeScale: 0.5, duration: 0.3, ease: 'power1.out' });
      }, { passive: true });

      carouselWrapper.addEventListener('touchend', () => {
        gsap.to(carouselTween, { timeScale: 1.0, duration: 0.5, ease: 'power1.out' });
      }, { passive: true });
    }
  }

  // 8. Clean layout initialization for Guided by Emotion section
  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    const guidedSection = document.querySelector('#guided-by-emotion-section');
    if (guidedSection) {
      gsap.set(guidedSection, { backgroundColor: 'var(--color-bg-secondary)' });
    }
  }

  // 9. Studio 3-Step Contact Component Interactive Logic
  const studioForm = document.querySelector('.studio-3step-form');
  if (studioForm) {
    const panes = studioForm.querySelectorAll('.studio-step-pane');
    const nums = document.querySelectorAll('.studio-step-num');
    const segments = document.querySelectorAll('.studio-progress-segment');

    function updateStep(step) {
      panes.forEach((pane) => {
        const paneStep = parseInt(pane.getAttribute('data-step'), 10);
        if (paneStep === step) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      nums.forEach((num) => {
        const numStep = parseInt(num.getAttribute('data-step'), 10);
        if (numStep === step) {
          num.classList.add('active');
        } else {
          num.classList.remove('active');
        }
      });

      segments.forEach((seg, idx) => {
        if (idx < step) {
          seg.classList.add('active');
        } else {
          seg.classList.remove('active');
        }
      });
    }

    // Next Buttons
    studioForm.querySelectorAll('.studio-btn-next').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextStep = parseInt(btn.getAttribute('data-next'), 10);
        updateStep(nextStep);
      });
    });

    // Back Buttons
    studioForm.querySelectorAll('.studio-btn-back').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const backStep = parseInt(btn.getAttribute('data-back'), 10);
        updateStep(backStep);
      });
    });

    // Pill Button Selectors
    studioForm.querySelectorAll('.studio-pill-group').forEach((group) => {
      const inputId = group.getAttribute('data-target-input');
      const targetInput = studioForm.querySelector(`#${inputId}`);

      group.querySelectorAll('.studio-pill-btn').forEach((pill) => {
        pill.addEventListener('click', (e) => {
          e.preventDefault();
          group.querySelectorAll('.studio-pill-btn').forEach((p) => p.classList.remove('active'));
          pill.classList.add('active');
          if (targetInput) {
            targetInput.value = pill.getAttribute('data-value') || pill.textContent.trim();
          }
        });
      });
    });

    // Form Submit Confirmation
    studioForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rightCol = studioForm.closest('.studio-contact-right');
      if (rightCol) {
        rightCol.innerHTML = `
          <div style="text-align: center; margin: auto; padding: 4rem 1.5rem;">
            <span class="studio-eyebrow" style="margin-bottom: 1rem;">MESSAGE RECEIVED</span>
            <h2 class="studio-left-headline" style="font-size: 2.8rem; margin-bottom: 1.5rem;">Thank You for Sharing Your Story</h2>
            <p style="font-size: 1.2rem; color: #555; line-height: 1.7; max-width: 480px; margin: 0 auto 2rem auto;">
              We have received your message and will review your details with care. You can expect a response within 24–48 hours.
            </p>
            <img src="assets/shared/signature.png" alt="Saajan Signature" style="height: 80px; width: auto; margin: 0 auto; display: block;">
          </div>
        `;
      }
    });
  }

  // 10. Inline Sentence Form 3-Step Navigation & Pills Logic
  const sentenceForms = document.querySelectorAll('.sentence-form-wrapper');
  sentenceForms.forEach((sForm) => {
    const rightCol = sForm.closest('.sentence-contact-right');
    const panes = sForm.querySelectorAll('.sentence-step-pane');

    const stepHeadingsMap = {
      1: '01 &mdash; ABOUT YOU',
      2: '02 &mdash; DETAILS',
      3: '03 &mdash; SCOPE &amp; BUDGET'
    };

    const stepWidthsMap = {
      1: '33.33%',
      2: '66.66%',
      3: '100%'
    };

    let currentStepState = 1;

    function goToStep(targetStep) {
      currentStepState = targetStep;

      panes.forEach((pane) => {
        const paneStep = parseInt(pane.getAttribute('data-step'), 10);
        if (paneStep === currentStepState) {
          pane.classList.add('active');
          pane.style.setProperty('display', 'block', 'important');
        } else {
          pane.classList.remove('active');
          pane.style.setProperty('display', 'none', 'important');
        }
      });

      if (rightCol) {
        const headingEl = rightCol.querySelector('.sentence-step-heading');
        const fillEl = rightCol.querySelector('.sentence-progress-fill');
        if (headingEl && stepHeadingsMap[currentStepState]) {
          headingEl.innerHTML = stepHeadingsMap[currentStepState];
        }
        if (fillEl && stepWidthsMap[currentStepState]) {
          fillEl.style.width = stepWidthsMap[currentStepState];
        }
      }
    }

    // Force Step 1 gating state on load
    goToStep(1);

    // Step Next Buttons
    sForm.querySelectorAll('.sentence-btn-next').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentPane = btn.closest('.sentence-step-pane');
        if (currentPane) {
          const requiredInputs = currentPane.querySelectorAll('[required]');
          let valid = true;
          requiredInputs.forEach((inp) => {
            if (!inp.checkValidity()) {
              inp.reportValidity();
              valid = false;
            }
          });
          if (!valid) return;
        }

        const nextStep = parseInt(btn.getAttribute('data-next'), 10);
        goToStep(nextStep);
      });
    });

    // Step Back Buttons
    sForm.querySelectorAll('.sentence-btn-back').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const backStep = parseInt(btn.getAttribute('data-back'), 10);
        goToStep(backStep);
      });
    });

    // Phone input numeric & country code sanitization
    sForm.querySelectorAll('input[name="phone"]').forEach((phoneInp) => {
      const sanitizePhone = () => {
        const hasLeadingPlus = phoneInp.value.trim().startsWith('+');
        const digitsOnly = phoneInp.value.replace(/\D/g, '');
        phoneInp.value = (hasLeadingPlus ? '+' : '') + digitsOnly;
      };
      phoneInp.addEventListener('input', sanitizePhone);
      phoneInp.addEventListener('paste', () => setTimeout(sanitizePhone, 0));
    });

    // Multi-select Pill Tags
    sForm.querySelectorAll('.pill-multi-group').forEach((pGroup) => {
      pGroup.querySelectorAll('.pill-tag-btn').forEach((pBtn) => {
        pBtn.addEventListener('click', (e) => {
          e.preventDefault();
          pBtn.classList.toggle('active');
        });
      });
    });

    // Dynamic Select "Other" Input toggle
    sForm.querySelectorAll('.blank-select').forEach((sel) => {
      const otherInput = sel.nextElementSibling;
      if (otherInput && otherInput.classList.contains('inline-other-input')) {
        sel.addEventListener('change', () => {
          if (sel.value === 'Other') {
            otherInput.classList.add('active');
            otherInput.focus();
          } else {
            otherInput.classList.remove('active');
          }
        });
      }
    });

    // Form Submit Confirmation
    sForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (rightCol) {
        rightCol.innerHTML = `
          <div style="text-align: center; margin: auto; padding: 4rem 1.5rem;">
            <h2 class="studio-left-headline" style="font-size: 2.8rem; margin-bottom: 1.5rem;">Thank You for Sharing Your Story</h2>
            <p style="font-size: 1.2rem; color: #555; line-height: 1.7; max-width: 480px; margin: 0 auto;">
              We have received your detailed inquiry and will review your requirements with care. You can expect a response within 24–48 hours.
            </p>
          </div>
        `;
      }
    });
  });

  // 11. Reference 5-Card Review Carousel Controller (GSAP Depth Slot Engine)
  const carouselSections = document.querySelectorAll('.section-reviews-carousel');
  carouselSections.forEach(carouselSection => {
    if (!carouselSection || !window.gsap) return;

    const cards = gsap.utils.toArray(carouselSection.querySelectorAll('.review-card'));
    if (cards.length !== 5) return;

    // 5 Depth Slot definitions
    const slotDefs = [
      { scale: 0.72, opacity: 0.88, zIndex: 1 }, // Slot 0: Far Left
      { scale: 0.86, opacity: 0.95, zIndex: 2 }, // Slot 1: Left Middle
      { scale: 1.00, opacity: 1.00, zIndex: 5 }, // Slot 2: Center Master
      { scale: 0.86, opacity: 0.95, zIndex: 2 }, // Slot 3: Right Middle
      { scale: 0.72, opacity: 0.88, zIndex: 1 }  // Slot 4: Far Right
    ];

    // Calculate horizontal pixel offset for each slot based on viewport width
    function getSlotOffsets() {
      const width = window.innerWidth;
      if (width >= 1400) {
        return [-664, -357, 0, 357, 664];
      } else if (width >= 1024) {
        return [-525, -282, 0, 282, 525];
      } else if (width >= 768) {
        return [-385, -206, 0, 206, 385];
      } else {
        const halfW = Math.min(width * 0.45, 175);
        return [-halfW * 1.85, -halfW, 0, halfW, halfW * 1.85];
      }
    }

    // Initial slot assignments: Card 0->0, Card 1->1, Card 2->2 (Center), Card 3->3, Card 4->4
    let cardSlots = [0, 1, 2, 3, 4];
    let timer = null;
    let isInView = true;

    // Apply slot transform positions to cards
    function applySlots(animate = true) {
      const offsets = getSlotOffsets();

      cards.forEach((card, index) => {
        const slot = cardSlots[index];
        const def = slotDefs[slot];
        const xOffset = offsets[slot];

        card.style.zIndex = def.zIndex;

        if (animate && !prefersReducedMotion) {
          gsap.to(card, {
            xPercent: -50,
            yPercent: -50,
            x: xOffset,
            scale: def.scale,
            opacity: def.opacity,
            duration: 0.9,
            ease: "power3.inOut"
          });
        } else {
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: xOffset,
            scale: def.scale,
            opacity: def.opacity
          });
        }
      });
    }

    // Rotate slots forward: 1 -> 5, 2 -> 1, 3 -> 2, 4 -> 3, 5 -> 4
    function rotateNext() {
      if (prefersReducedMotion) return;
      cardSlots = cardSlots.map(slot => (slot - 1 + 5) % 5);
      applySlots(true);
    }

    // Rotate slots backward: 5 -> 1, 1 -> 2, 2 -> 3, 3 -> 4, 4 -> 5
    function rotatePrev() {
      if (prefersReducedMotion) return;
      cardSlots = cardSlots.map(slot => (slot + 1) % 5);
      applySlots(true);
    }

    function startAutoRotation() {
      stopAutoRotation();
      if (isInView && !prefersReducedMotion) {
        timer = setInterval(rotateNext, 3000);
      }
    }

    function stopAutoRotation() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Touch Swipe Detection for Mobile
    let touchStartX = 0;
    let touchStartY = 0;

    carouselSection.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      stopAutoRotation();
    }, { passive: true });

    carouselSection.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          rotateNext(); // Swipe Left -> Advance Next
        } else {
          rotatePrev(); // Swipe Right -> Go Previous
        }
      }
      startAutoRotation();
    }, { passive: true });

    // Initial placement without animation
    applySlots(false);
    startAutoRotation();

    // Viewport IntersectionObserver
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isInView = true;
            startAutoRotation();
          } else {
            isInView = false;
            stopAutoRotation();
          }
        });
      }, { threshold: 0.05, rootMargin: '100px 0px 100px 0px' });
      observer.observe(carouselSection);
    }

    // Window Resize Handler
    window.addEventListener('resize', () => {
      applySlots(false);
    });
  });

  // ==========================================================================
  // CoupleHeroCollage GSAP Entrance Sequence
  // ==========================================================================
  const heroCollages = document.querySelectorAll('.hero-collage-section');
  
  heroCollages.forEach(collage => {
    const logo = collage.querySelector('.hero-collage-logo');
    const menu = collage.querySelector('.hero-collage-menu');
    const centerImg = collage.querySelector('.hero-collage-cell-center img');
    const topLeftImg = collage.querySelector('.hero-collage-cell-c1-r1 img');
    const topRightImg = collage.querySelector('.hero-collage-cell-c3-r1 img');
    const bottomLeftImg = collage.querySelector('.hero-collage-cell-c1-r2 img');
    const coupleName = collage.querySelector('.hero-collage-couple-name');
    const location = collage.querySelector('.hero-collage-location');
    const year = collage.querySelector('.hero-collage-year');

    if (window.gsap && !prefersReducedMotion) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Logo & Menu fade/slide down together
      if (logo || menu) {
        tl.to([logo, menu].filter(Boolean), { y: 0, opacity: 1, duration: 0.6, stagger: 0 });
      }

      // 2. Center image scales in from 1.25 -> 1 with fade (1.4s), starting slightly before logo finishes
      if (centerImg) {
        gsap.set(centerImg, { scale: 1.25, opacity: 0 });
        tl.to(centerImg, { scale: 1, opacity: 1, duration: 1.4 }, '-=0.4');
      }

      // 3. Top-left and top-right images slide up with fade (y: 30 -> 0, 0.9s)
      if (topLeftImg || topRightImg) {
        const topImgs = [topLeftImg, topRightImg].filter(Boolean);
        gsap.set(topImgs, { y: 30, opacity: 0 });
        tl.to(topImgs, { y: 0, opacity: 1, duration: 0.9, stagger: 0 }, '-=1.0');
      }

      // 4. Bottom-left image slides up with fade
      if (bottomLeftImg) {
        gsap.set(bottomLeftImg, { y: 30, opacity: 0 });
        tl.to(bottomLeftImg, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6');
      }

      // 5. Couple-name heading fades/slides up
      if (coupleName) {
        gsap.set(coupleName, { y: 20, opacity: 0 });
        tl.to(coupleName, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4');
      }

      // 6. Location and year fade/slide up with small stagger
      if (location || year) {
        const metaTexts = [location, year].filter(Boolean);
        gsap.set(metaTexts, { y: 15, opacity: 0 });
        tl.to(metaTexts, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, '<');
      }
    } else {
      // Fallback for reduced motion / missing GSAP
      const allElements = collage.querySelectorAll('img, .hero-collage-couple-name, .hero-collage-location, .hero-collage-year, .hero-collage-logo, .hero-collage-menu');
      allElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  });
});
