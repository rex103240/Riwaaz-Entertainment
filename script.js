document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Mobile Nav Toggle
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const isOpen = mobileMenu.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Header Scroll Effect
    const header = document.querySelector('.site-header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();
    }

    // 4. Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('in'));
    }

    // 5. Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    function animateCounter(el) {
        const target = parseFloat(el.dataset.target);
        const isDecimal = el.dataset.decimal === 'true';
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart for a satisfying finish
            const ease = 1 - Math.pow(1 - progress, 4);
            const current = target * ease;
            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = isDecimal ? target.toFixed(1) : target; // ensure final value is exact
            }
        }
        requestAnimationFrame(update);
    }

    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => statsObserver.observe(el));
    } else {
        statNumbers.forEach(el => animateCounter(el));
    }

    // 6. Testimonial Slider
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (track && dots.length > 0) {
        let currentSlide = 0;
        let autoPlayInterval;
        let autoPlayTimeout;
        const totalSlides = dots.length;

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, i) => {
                if (i === index) {
                    d.classList.add('active');
                } else {
                    d.classList.remove('active');
                }
            });
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                goToSlide((currentSlide + 1) % totalSlides);
            }, 5000);
        }

        function pauseAutoPlay() {
            clearInterval(autoPlayInterval);
            clearTimeout(autoPlayTimeout);
            autoPlayTimeout = setTimeout(startAutoPlay, 8000);
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index, 10);
                if (!isNaN(index)) {
                    goToSlide(index);
                    pauseAutoPlay();
                }
            });
        });

        startAutoPlay();
    }

    // 7. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 8. Custom Select Dropdown
    const customSelect = document.getElementById('customSelect');
    const selectTrigger = document.getElementById('selectTrigger');
    const selectDropdown = document.getElementById('selectDropdown');
    const selectValue = document.getElementById('selectValue');
    const selectHidden = document.getElementById('formEvent');
    const selectOptions = document.querySelectorAll('.custom-select-option');

    if (selectTrigger && selectDropdown) {
        selectValue.classList.add('placeholder');

        selectTrigger.addEventListener('click', () => {
            customSelect.classList.toggle('open');
            // Close calendar if open
            const datepicker = document.getElementById('customDatepicker');
            if (datepicker) datepicker.classList.remove('open');
        });

        selectOptions.forEach(option => {
            option.addEventListener('click', () => {
                const val = option.dataset.value;
                const text = option.textContent;
                selectValue.textContent = text;
                selectValue.classList.remove('placeholder');
                selectHidden.value = val;
                selectOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                customSelect.classList.remove('open');
            });
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    }

    // 9. Custom Calendar Date Picker
    const datepicker = document.getElementById('customDatepicker');
    const dateTrigger = document.getElementById('dateTrigger');
    const dateValue = document.getElementById('dateValue');
    const dateHidden = document.getElementById('formDate');
    const calDays = document.getElementById('calDays');
    const calMonthYear = document.getElementById('calMonthYear');
    const calPrev = document.getElementById('calPrev');
    const calNext = document.getElementById('calNext');
    const calClear = document.getElementById('calClear');
    const calToday = document.getElementById('calToday');

    if (dateTrigger && calDays) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        let calDate = new Date();
        let selectedDate = null;

        dateValue.classList.add('placeholder');

        function renderCalendar() {
            const year = calDate.getFullYear();
            const month = calDate.getMonth();
            calMonthYear.textContent = monthNames[month] + ' ' + year;

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            // Monday=0 adjusted start day
            let startDay = firstDay.getDay() - 1;
            if (startDay < 0) startDay = 6;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            calDays.innerHTML = '';

            // Previous month trailing days
            const prevMonthLast = new Date(year, month, 0).getDate();
            for (let i = startDay - 1; i >= 0; i--) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'calendar-day other-month';
                btn.textContent = prevMonthLast - i;
                const d = new Date(year, month - 1, prevMonthLast - i);
                btn.addEventListener('click', () => pickDate(d));
                calDays.appendChild(btn);
            }

            // Current month days
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'calendar-day';
                btn.textContent = day;
                const d = new Date(year, month, day);

                if (d.getTime() === today.getTime()) {
                    btn.classList.add('today');
                }
                if (selectedDate && d.getTime() === selectedDate.getTime()) {
                    btn.classList.add('selected');
                }
                btn.addEventListener('click', () => pickDate(d));
                calDays.appendChild(btn);
            }

            // Next month leading days
            const totalCells = calDays.children.length;
            const remaining = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
            for (let i = 1; i <= remaining; i++) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'calendar-day other-month';
                btn.textContent = i;
                const d = new Date(year, month + 1, i);
                btn.addEventListener('click', () => pickDate(d));
                calDays.appendChild(btn);
            }
        }

        function pickDate(d) {
            selectedDate = new Date(d);
            selectedDate.setHours(0, 0, 0, 0);
            const day = String(d.getDate()).padStart(2, '0');
            const mon = String(d.getMonth() + 1).padStart(2, '0');
            const yr = d.getFullYear();
            dateValue.textContent = day + ' ' + monthNames[d.getMonth()] + ' ' + yr;
            dateValue.classList.remove('placeholder');
            dateHidden.value = yr + '-' + mon + '-' + day;
            renderCalendar();
            datepicker.classList.remove('open');
        }

        dateTrigger.addEventListener('click', () => {
            datepicker.classList.toggle('open');
            if (datepicker.classList.contains('open')) {
                renderCalendar();
            }
            // Close select if open
            if (customSelect) customSelect.classList.remove('open');
        });

        calPrev.addEventListener('click', () => {
            calDate.setMonth(calDate.getMonth() - 1);
            renderCalendar();
        });

        calNext.addEventListener('click', () => {
            calDate.setMonth(calDate.getMonth() + 1);
            renderCalendar();
        });

        calToday.addEventListener('click', () => {
            calDate = new Date();
            pickDate(new Date());
        });

        calClear.addEventListener('click', () => {
            selectedDate = null;
            dateValue.textContent = 'Pick a date';
            dateValue.classList.add('placeholder');
            dateHidden.value = '';
            renderCalendar();
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!datepicker.contains(e.target)) {
                datepicker.classList.remove('open');
            }
        });

        renderCalendar();
    }

    // 10. Enquiry Form to WhatsApp
    const form = document.getElementById('enquiryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('formName')?.value.trim() || 'Not specified';
            const phone = document.getElementById('formPhone')?.value.trim() || 'Not specified';
            const eventType = document.getElementById('formEvent')?.value.trim() || 'Not specified';
            const dateVal = document.getElementById('formDate')?.value.trim() || '';
            const dateDisplay = document.getElementById('dateValue')?.textContent || '';
            const dateFinal = (dateVal && !dateDisplay.includes('Pick')) ? dateDisplay : 'Not specified';
            const message = document.getElementById('formMessage')?.value.trim() || '';

            let waMessage = `Hi Riwaaz Entertainment!\n\nName: ${name}\nPhone: ${phone}\nEvent: ${eventType}\nDate: ${dateFinal}\n`;
            if (message) {
                waMessage += `\n${message}`;
            }

            const waUrl = `https://wa.me/919887577752?text=${encodeURIComponent(waMessage)}`;
            window.open(waUrl, '_blank');
        });
    }

    // 9. Smooth Scroll for Anchor Links & 10. Active Nav Link Highlighting
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const headerHeight = 72; // Approximate header height for offset

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 10. Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 10; // Extra buffer
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"], #mobileMenu a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) navLink.classList.add('active');
            } else {
                if (navLink) navLink.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    // Initial check
    highlightNav();
});
