document.addEventListener("DOMContentLoaded", () => {
  // Loading page animation
  const loadingPage = document.getElementById("loading-page");
  const loadingText = document.querySelector(".loading-content h1");
  const progressCounter = document.getElementById("progress-counter");
  const circles = document.querySelectorAll(".circle");

  // GSAP animation for the loading page
  function playLoadingAnimation() {
    const tl = gsap.timeline();

    // Set initial states
    tl.set(loadingPage, { display: "flex", opacity: 1 })
      .set(loadingText, { opacity: 0 })
      .set(circles, { scale: 0, opacity: 0 });

    // Animate loading text
    tl.to(loadingText, {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });

    // Animate progress counter
    tl.to(progressCounter, {
      innerHTML: "100%",
      duration: 3,
      ease: "power1.inOut",
      onUpdate: function() {
        progressCounter.innerHTML = Math.round(this.progress() * 100) + "%";
      }
    }, "-=1");

    // Animate background circles
    tl.to(circles, {
      scale: 1.5,
      opacity: 0.3,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out"
    }, "-=3")
    .to(circles, {
      scale: 2,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power2.in"
    }, "-=1");

    // Fade out loading page
    tl.to(loadingText, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.5")
    .to(loadingPage, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        loadingPage.style.display = "none";
      }
    });

    return tl;
  }

  // Play initial loading animation
  playLoadingAnimation();

  // Portfolio logo click handler
  const portfolioLogo = document.getElementById("portfolio-logo");
  portfolioLogo.addEventListener("click", () => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Play loading animation
    playLoadingAnimation();
  });

  // Theme toggle functionality
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
  }

  themeToggle.addEventListener('click', toggleTheme);
  themeToggleMobile.addEventListener('click', toggleTheme);

  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  }

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

  // Three.js scene
  let scene, camera, renderer, particles, welcomeText;

  function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('loading-background'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const size = 2000;

    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * size;
      const y = (Math.random() - 0.5) * size;
      const z = (Math.random() - 0.5) * size;
      vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create 3D text
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
      const textGeometry = new THREE.TextGeometry('Welcome to Portfolio', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });

      const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // Green color
      welcomeText = new THREE.Mesh(textGeometry, textMaterial);

      // Center the text
      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
      welcomeText.position.set(-textWidth / 2, 0, -300);

      scene.add(welcomeText);
    });

    // Add light for the 3D text
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 50);
    scene.add(light);

    camera.position.z = 1000;
  }

  function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);

    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;

    if (welcomeText) {
      welcomeText.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initThreeJS();
  animateThreeJS();
  window.addEventListener('resize', onWindowResize, false);
});

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
