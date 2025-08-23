document.addEventListener("DOMContentLoaded", () => {
  // Loading page elements
  const loadingPage = document.getElementById("loading-page");
  const loadingText = document.querySelector(".loading-content h1");
  const progressCounter = document.getElementById("progress-counter");

  // Greetings (iPhone-like boot greetings)
  const greetings = [
    "Hello", "Hi", "Hola", "Bonjour", "Ciao", "Hallo", "Olá", "Привет",
    "नमस्ते", "سلام", "こんにちは", "你好", "안녕하세요", "Hej", "Γειά", "שלום"
  ];

  // Create greeting element once
  const greetingsContainer = document.createElement("div");
  greetingsContainer.className = "greetings-container";
  const greetingSpan = document.createElement("span");
  greetingSpan.className = "greeting";
  greetingsContainer.appendChild(greetingSpan);
  loadingPage.querySelector(".loading-content")?.appendChild(greetingsContainer);

  // Basic inline styles so it works without editing CSS
  Object.assign(greetingsContainer.style, {
    position: "absolute",
    inset: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    zIndex: "9999",
    transition: "background-color 0.25s ease"
  });
  Object.assign(greetingSpan.style, {
    fontSize: "48px",
    fontWeight: "700",
    opacity: "0",
    transform: "scale(0.9)",
    whiteSpace: "nowrap",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    zIndex: "10000"
  });

  // Keep colors in sync with theme and ensure contrast
  function updateGreetingColor() {
    const isDark = document.body.getAttribute("data-theme") === "dark";

    // Make loading page match current theme
    loadingPage.style.backgroundColor = isDark ? "#000000" : "#ffffff";
    loadingPage.style.transition = "background-color 0.25s ease";

    // Foreground colors
    const fg = isDark ? "#ffffff" : "#000000";
    greetingSpan.style.color = fg;
    if (loadingText) loadingText.style.color = fg;
    if (progressCounter) progressCounter.style.color = fg;

    // Shadow for contrast (white text gets dark shadow; black text gets light halo)
    greetingSpan.style.textShadow = isDark
      ? "0 1px 3px rgba(0,0,0,0.6)"
      : "0 1px 2px rgba(255,255,255,0.9)";
  }
  updateGreetingColor();

  // Update on theme change (storage used if theme toggled in another tab)
  window.addEventListener("storage", (e) => {
    if (e.key === "theme") updateGreetingColor();
  });

  // GSAP loading animation with greetings sequence
  function playLoadingAnimation() {
    const tl = gsap.timeline();

    tl.set(loadingPage, { display: "flex", opacity: 1 })
      .set(loadingText, { opacity: 0 });

    tl.to(loadingText, { opacity: 1, duration: 1, ease: "power2.out" });

    // Progress counter animation (3s)
    tl.to(progressCounter, {
      innerHTML: "100%",
      duration: 3,
      ease: "power1.inOut",
      onUpdate: function() {
        progressCounter.innerHTML = Math.round(this.progress() * 100) + "%";
      }
    }, "-=1");

    // Greetings sequence overlapping the progress (approx 3s)
    const greetTl = gsap.timeline();
    const totalDisplay = 3;
    const per = Math.max(0.4, totalDisplay / greetings.length);
    greetings.forEach((g) => {
      greetTl.to(greetingSpan, {
        duration: per * 0.5,
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        onStart: () => {
          greetingSpan.textContent = g;
          updateGreetingColor();
        }
      }).to(greetingSpan, {
        duration: per * 0.5,
        opacity: 0,
        scale: 0.9,
        ease: "power2.in"
      });
    });
    tl.add(greetTl, "-=2.8");

    // Fade out loading page
    tl.to(loadingText, { opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.5")
      .to(loadingPage, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // start page intro animations then hide loading overlay
          startPageIntro();
          setTimeout(() => { loadingPage.style.display = "none"; }, 500);
        }
      });

    return tl;
  }

  // Play initial animation
  playLoadingAnimation();

  // --- Page intro / improved text animations ---
  function splitTextToSpans(el) {
    if (!el) return null;
    const text = el.textContent.trim();
    el.innerHTML = "";
    const frag = document.createDocumentFragment();
    Array.from(text).forEach((ch) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      frag.appendChild(span);
    });
    el.appendChild(frag);
    return el.querySelectorAll(".char");
  }

  function startPageIntro() {
    // Elements
    const introLine = document.querySelector(".section__text__p1");
    const title = document.querySelector(".title");
    const subtitle = document.querySelector(".section__text__p2");
    const buttons = document.querySelectorAll(".btn-container .btn");
    const profilePic = document.querySelector(".section__pic-container img, .profile-pic");
    const socials = document.querySelectorAll("#socials-container .icon, .icon");

    // Split title into spans for per-letter animation
    const titleChars = splitTextToSpans(title);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // small delay so the greeting/prompt finishes visually
    tl.to({}, { duration: 0.08 });

    if (introLine) {
      tl.from(introLine, { y: 18, opacity: 0, duration: 0.6 }, 0);
    }

    if (titleChars && titleChars.length) {
      tl.from(titleChars, {
        y: 30,
        opacity: 0,
        rotateX: -10,
        duration: 0.8,
        stagger: 0.02,
        transformOrigin: "50% 50% -20px"
      }, 0.06);
    } else if (title) {
      tl.from(title, { y: 8, opacity: 0, duration: 0.6 }, 0.06);
    }

    if (subtitle) {
      tl.from(subtitle, { y: 20, opacity: 0, duration: 0.6 }, 0.3);
    }

    if (buttons && buttons.length) {
      tl.from(buttons, { y: 14, opacity: 0, stagger: 0.12, duration: 0.5 }, 0.45);
    }

    if (profilePic) {
      tl.from(profilePic, { scale: 0.85, opacity: 0, duration: 0.8, ease: "back.out(1.4)" }, 0.25);
    }

    if (socials && socials.length) {
      tl.from(socials, { y: 12, opacity: 0, stagger: 0.08, duration: 0.45 }, 0.55);
    }
  }

  // Portfolio logo click -> replay loading animation
  const portfolioLogo = document.getElementById("portfolio-logo");
  if (portfolioLogo) {
    portfolioLogo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      playLoadingAnimation();
    });
  }

  // Theme toggle handlers (call updateGreetingColor after change)
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  function toggleTheme() {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateGreetingColor();
  }
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // Apply saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.setAttribute('data-theme', 'dark');
  updateGreetingColor();

  // Your existing functions
  function revealToSpan() {
    document.querySelectorAll(".reveal").forEach(function(elem) {
      var parent = document.createElement("span");
      var child = document.createElement("span");

      parent.classList.add("parent");
      child.classList.add("child");

      child.innerHTML = elem.innerHTML;
      parent.appendChild(child);

      elem.innerHTML = "";
      elem.appendChild(parent);
    });
  }
  revealToSpan();

  // ScrollTrigger for scramble text animation
  gsap.to(".text-container p", {
    duration: 2,
    scrambleText: {
      text: "I have done my school graduation from Rumi English High School in 2020 with a Science. And currently pursuing B.tech in Ganpat University. After school, I started working as a Computer Engineer student at Ganpat University. I have been studying there for 1.5 years. In my free time, I enjoy playing basketball, hiking, and watching movies. Now I can make websites and create more Canva designs as much as I want.",
      chars: "XO",
      revealDelay: 2.5,
      speed: 0.3,
      newClass: "myClass"
    },
    scrollTrigger: {
      trigger: ".text-container p",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // ScrollTrigger for other animations
  gsap.from(".section__text__p1", {
    duration: 0.5,
    opacity: 0,
    y: -50,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section__text__p1",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".nav-links li", {
    duration: 0.5,
    opacity: 0,
    y: 20,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".nav-links",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".logo", {
    duration: 0.5,
    opacity: 0,
    y: 20,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".logo",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".title", {
    duration: 0.5,
    opacity: 0,
    y: 20,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".title",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".section__text__p2", {
    duration: 0.5,
    opacity: 0,
    y: 50,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section__text__p2",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".btn-container", {
    duration: 0.5,
    opacity: 0,
    y: 50,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".btn-container",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".profile-pic", {
    duration: 0.5,
    opacity: 0,
    scale: 0.5,
    ease: "power3.out",
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".profile-pic",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".icon", {
    duration: 0.5,
    opacity: 0,
    scale: 0.5,
    ease: "power3.out",
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".icon",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".details-container", {
    duration: 0.5,
    opacity: 0,
    scale: 0.5,
    ease: "power3.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".details-container",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // Three.js star/background effect removed
  // If you have a <canvas id="loading-background"> in your HTML you can keep it (empty)
  // or remove it to avoid an unused element.
  //
});

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
