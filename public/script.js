(() => {
  const section = document.querySelector(".cinema-scroll");
  const docEl = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const track = document.querySelector(".sights-track");
  const sightsControls = document.querySelector(".sights-controls");
  const sightPrev = document.querySelector(".sight-prev");
  const sightNext = document.querySelector(".sight-next");
  const originalCards = Array.from(document.querySelectorAll(".sight-card"));
  const originalCount = originalCards.length;

  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetScroll = 0;
  let smoothScroll = 0;
  let initialized = false;
  let rafPending = false;
  let sightCards = [];
  let activeSight = originalCount;

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const smoothstep = (e0, e1, v) => {
    const x = clamp((v - e0) / (e1 - e0));
    return x * x * (3 - 2 * x);
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const segmentInOut = (s, a, b, c, d) => {
    const enter = smoothstep(a, b, s);
    const exit = smoothstep(c, d, s);
    return { enter, exit, active: enter * (1 - exit) };
  };
  const getScrollDistance = () =>
    clamp(
      -section.getBoundingClientRect().top,
      0,
      section.offsetHeight - window.innerHeight
    );

  function updateSightSlider() {
    if (!sightCards.length) return;
    const cardWidth = sightCards[0].offsetWidth;
    const gap =
      parseFloat(window.getComputedStyle(track).gap || window.getComputedStyle(track).columnGap || "0") || 0;
    docEl.style.setProperty("--sights-shift", `${-(cardWidth + gap) * activeSight}px`);
    sightCards.forEach((card, idx) => {
      card.classList.toggle("is-active", idx === activeSight);
    });
  }

  function moveSightSlider(dir) {
    activeSight += dir;
    updateSightSlider();
  }

  function selectSightCard(card) {
    const idx = Number(card.dataset.sightIndex);
    if (Number.isFinite(idx)) {
      if (activeSight === idx && card.dataset.link) {
        window.open(card.dataset.link, "_blank", "noopener,noreferrer");
      } else {
        activeSight = idx;
        updateSightSlider();
      }
    }
  }

  function jumpSightSlider(i) {
    track.classList.add("is-jumping");
    activeSight = i;
    updateSightSlider();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.classList.remove("is-jumping");
      });
    });
  }

  function normalizeSightSlider() {
    if (activeSight >= originalCount * 2) {
      jumpSightSlider(activeSight - originalCount);
    } else if (activeSight < originalCount) {
      jumpSightSlider(activeSight + originalCount);
    }
  }

  function setupSightSlider() {
    track.replaceChildren();
    for (let setIndex = 0; setIndex < 3; setIndex++) {
      originalCards.forEach((card, cardIndex) => {
        const clone = card.cloneNode(true);
        clone.dataset.sightIndex = (setIndex * originalCount + cardIndex).toString();
        clone.dataset.link = card.dataset.link || "";
        track.appendChild(clone);
      });
    }
    sightCards = Array.from(track.querySelectorAll(".sight-card"));
    activeSight = originalCount;

    sightCards.forEach((card) => {
      card.addEventListener("click", () => selectSightCard(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectSightCard(card);
        }
      });
    });

    track.addEventListener("transitionend", normalizeSightSlider);
    updateSightSlider();
  }

  function update() {
    rafPending = false;
    targetScroll = getScrollDistance();
    if (!initialized || reduceMotion.matches) {
      smoothScroll = targetScroll;
      initialized = true;
    } else {
      smoothScroll = lerp(smoothScroll, targetScroll, 0.14);
    }
    if (Math.abs(smoothScroll - targetScroll) < 0.08) smoothScroll = targetScroll;

    mouseX = lerp(mouseX, targetMouseX, 0.12);
    mouseY = lerp(mouseY, targetMouseY, 0.12);

    const frame2 = segmentInOut(smoothScroll, 560, 900, 1300, 1620);
    const frame3 = segmentInOut(smoothScroll, 1760, 2140, 2540, 2700);
    const progress = clamp(smoothScroll / 2700);
    const introExit = smoothstep(90, 650, smoothScroll);
    const sightsEnterRaw = smoothstep(2760, 3560, smoothScroll);
    const sightsEnter = Math.pow(sightsEnterRaw, 1.55);
    const sightsControlsEnter = smoothstep(3360, 3660, smoothScroll);
    const blurActive = clamp(frame2.active + frame3.active);
    const frame2Opacity = frame2.active * (1 - frame3.enter);
    const splitDrift = Math.pow(frame2.enter, 1.5);
    const panel2Opacity = frame2.active * (1 - frame2.exit);
    const panel3Opacity = frame3.active * (1 - frame3.exit);
    const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
    const sharedHeroY = progress * -74;
    const sharedHeroScale = progress * 0.23;
    const sightsScreenTop = Math.min(220, Math.max(112, window.innerHeight * 0.19)) - 50;
    const sightsParentTop = window.innerHeight - (window.innerHeight - sightsScreenTop) / backScale;

    const rootStyle = docEl.style;
    rootStyle.setProperty("--mx", (reduceMotion.matches ? 0 : mouseX).toFixed(4));
    rootStyle.setProperty("--my", (reduceMotion.matches ? 0 : mouseY).toFixed(4));

    rootStyle.setProperty("--back-opacity", (1 - frame2.active * 0.06).toString());
    rootStyle.setProperty("--back-x", `${mouseX * -12}px`);
    rootStyle.setProperty("--back-y", `${mouseY * -4}px`);
    rootStyle.setProperty("--back-scale", backScale.toString());
    rootStyle.setProperty("--four-y", `${10 + progress * 10}vh`);
    rootStyle.setProperty("--four-scale", (0.78 + progress * 0.16).toString());
    rootStyle.setProperty("--bazaar-y", `${20 - progress * 8}vh`);
    rootStyle.setProperty("--blur-px", `${blurActive * 14}px`);
    rootStyle.setProperty("--back-brightness", (1 - blurActive * 0.255).toString());
    rootStyle.setProperty("--bazaar-blur-px", `${frame2.active * 14}px`);
    rootStyle.setProperty("--bazaar-brightness", (1 - frame2.active * 0.255 - frame3.active * 0.06).toString());
    rootStyle.setProperty("--bazaar-saturation", (1 + frame3.active * 0.18).toString());
    rootStyle.setProperty("--shade-opacity", "1");
    rootStyle.setProperty("--shade-z", frame2.active > 0.02 ? "2" : "0");
    rootStyle.setProperty("--shade-top-alpha", (blurActive * 0.465).toString());
    rootStyle.setProperty("--shade-mid-alpha", (blurActive * 0.42).toString());
    rootStyle.setProperty("--shade-bottom-alpha", (blurActive * 0.51).toString());

    rootStyle.setProperty("--title-y", `${introExit * -210}px`);
    rootStyle.setProperty("--title-scale", (1 - introExit * 0.08).toString());
    rootStyle.setProperty("--title-opacity", (1 - introExit).toString());

    rootStyle.setProperty("--bridge-x", `calc(-50% + ${mouseX * 18}px)`);
    rootStyle.setProperty("--bridge-y", `${mouseY * 8 + sharedHeroY - frame2.exit * 760}px`);
    rootStyle.setProperty("--bridge-bottom", `${5 - frame2.enter * 13}vh`);
    rootStyle.setProperty("--bridge-width", `${67.2 + frame2.enter * 37.8}vw`);
    rootStyle.setProperty("--bridge-scale", (1.02 + sharedHeroScale + frame2.exit * 0.46).toString());

    rootStyle.setProperty("--split-left-x", `calc(-50% + ${-splitDrift * 46}vw + ${mouseX * 22}px)`);
    rootStyle.setProperty("--split-left-y", `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`);
    rootStyle.setProperty("--split-left-scale", (1 + sharedHeroScale + frame2.enter * 0.74).toString());
    rootStyle.setProperty("--split-right-x", `calc(-50% + ${splitDrift * 46}vw + ${mouseX * 22}px)`);
    rootStyle.setProperty("--split-right-y", `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`);
    rootStyle.setProperty("--split-right-scale", (1 + sharedHeroScale + frame2.enter * 0.74).toString());

    rootStyle.setProperty("--frame2-opacity", frame2Opacity.toString());
    rootStyle.setProperty("--frame2-x", `calc(-50% + ${mouseX * 10}px)`);
    rootStyle.setProperty("--frame2-y", `calc(-50% + ${mouseY * 8 - frame2.exit * 150}px)`);
    rootStyle.setProperty("--frame2-scale", (1.06 + frame2.enter * 0.08 + frame2.exit * 0.08).toString());

    rootStyle.setProperty("--intro-copy-y", `${introExit * 90}px`);
    rootStyle.setProperty("--intro-copy-opacity", (1 - introExit).toString());
    rootStyle.setProperty("--panel2-opacity", panel2Opacity.toString());
    rootStyle.setProperty("--panel2-y", `calc(-50% + ${-frame2.exit * 86 + (1 - frame2.enter) * 58}px)`);
    rootStyle.setProperty("--panel3-opacity", panel3Opacity.toString());
    rootStyle.setProperty("--panel3-y", `calc(-50% + ${-frame3.exit * 86 + (1 - frame3.enter) * 58}px)`);

    rootStyle.setProperty("--sights-opacity", sightsEnter.toString());
    rootStyle.setProperty("--sights-controls-opacity", sightsControlsEnter.toString());
    if (sightsControls) {
      sightsControls.classList.toggle("is-ready", sightsControlsEnter > 0.98);
    }
    rootStyle.setProperty("--sights-visibility", sightsEnter > 0.01 ? "visible" : "hidden");
    rootStyle.setProperty("--sights-y", "0px");
    rootStyle.setProperty("--sights-enter-x", `${(1 - sightsEnter) * 420}vw`);
    rootStyle.setProperty("--sights-scale", (1 / backScale).toString());
    rootStyle.setProperty("--sights-top", `${sightsParentTop}px`);
    rootStyle.setProperty("--sights-screen-top", `${sightsScreenTop}px`);

    if (
      Math.abs(smoothScroll - targetScroll) > 0.08 ||
      Math.abs(mouseX - targetMouseX) > 0.001 ||
      Math.abs(mouseY - targetMouseY) > 0.001
    ) {
      requestTick();
    }
  }

  function requestTick() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", () => {
    updateSightSlider();
    requestTick();
  });
  window.addEventListener(
    "pointermove",
    (e) => {
      targetMouseX = e.clientX / window.innerWidth - 0.5;
      targetMouseY = e.clientY / window.innerHeight - 0.5;
      requestTick();
    },
    { passive: true }
  );

  if (sightPrev) {
    sightPrev.addEventListener("click", () => moveSightSlider(-1));
  }
  if (sightNext) {
    sightNext.addEventListener("click", () => moveSightSlider(1));
  }

  // Interactive Movable Hero Title
  const heroTitle = document.getElementById("movable-hero-title");
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentDragX = 0;
  let currentDragY = 0;

  if (heroTitle) {
    heroTitle.addEventListener("pointerdown", (e) => {
      isDragging = true;
      startX = e.clientX - currentDragX;
      startY = e.clientY - currentDragY;
      try { heroTitle.setPointerCapture(e.pointerId); } catch (_) {}
      heroTitle.style.cursor = "grabbing";
    });

    heroTitle.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      currentDragX = e.clientX - startX;
      currentDragY = e.clientY - startY;
      docEl.style.setProperty("--drag-x", `${currentDragX}px`);
      docEl.style.setProperty("--drag-y", `${currentDragY}px`);
      requestTick();
    });

    const endDrag = (e) => {
      if (isDragging) {
        isDragging = false;
        try { heroTitle.releasePointerCapture(e.pointerId); } catch (_) {}
        heroTitle.style.cursor = "grab";
        const returnSpring = () => {
          currentDragX = lerp(currentDragX, 0, 0.14);
          currentDragY = lerp(currentDragY, 0, 0.14);
          docEl.style.setProperty("--drag-x", `${currentDragX}px`);
          docEl.style.setProperty("--drag-y", `${currentDragY}px`);
          if (Math.abs(currentDragX) > 0.5 || Math.abs(currentDragY) > 0.5) {
            requestAnimationFrame(returnSpring);
          } else {
            currentDragX = 0;
            currentDragY = 0;
            docEl.style.setProperty("--drag-x", `0px`);
            docEl.style.setProperty("--drag-y", `0px`);
          }
        };
        requestAnimationFrame(returnSpring);
      }
    };

    heroTitle.addEventListener("pointerup", endDrag);
    heroTitle.addEventListener("pointercancel", endDrag);
  }

  // Smooth Navigation Links
  const navMap = [

    { id: "nav-intro", target: "#cinema" },
    { id: "nav-about", target: "#about-section" },
    { id: "nav-skills", target: "#skills-section" },
    { id: "nav-timeline", target: "#timeline-section" },
    { id: "nav-projects", target: "#projects-section" },
    { id: "nav-contact", target: "#contact-section" },
  ];

  navMap.forEach(({ id, target }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const targetEl = document.querySelector(target);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });

  // Contact Modal Logic
  const contactModal = document.getElementById("contact-modal");
  const openContactBtn = document.getElementById("open-contact-btn");
  const openContactModalBtn = document.getElementById("open-contact-modal-btn");
  const closeContactBtn = document.getElementById("contact-modal-close");
  const contactBackdrop = document.getElementById("contact-modal-backdrop");
  const contactForm = document.getElementById("contact-form");
  const pageContactForm = document.getElementById("page-contact-form");

  function openModal() {
    if (contactModal) {
      contactModal.classList.add("is-open");
      contactModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (contactModal) {
      contactModal.classList.remove("is-open");
      contactModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  if (openContactBtn) openContactBtn.addEventListener("click", openModal);
  if (openContactModalBtn) openContactModalBtn.addEventListener("click", openModal);
  if (closeContactBtn) closeContactBtn.addEventListener("click", closeModal);
  if (contactBackdrop) contactBackdrop.addEventListener("click", closeModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactModal && contactModal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Generic Contact Form Submission Handler
  function setupFormHandler(formElement, submitBtnId, statusElementId) {
    if (!formElement) return;
    const submitBtn = document.getElementById(submitBtnId);
    const formStatus = document.getElementById(statusElementId);

    formElement.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!submitBtn) return;

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;
      if (formStatus) {
        formStatus.className = "form-status";
        formStatus.style.display = "none";
      }

      const formData = new FormData(formElement);
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone") || "",
        company: formData.get("company") || "",
        need: formData.get("need") || "Portfolio contact",
        priority: formData.get("priority") || "Normal priority",
        message: formData.get("message"),
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok) {
          if (formStatus) {
            formStatus.className = "form-status is-success";
            formStatus.style.display = "block";
            formStatus.textContent = data.message || "Message sent successfully! Thank you for reaching out.";
          }
          formElement.reset();
        } else {
          if (formStatus) {
            formStatus.className = "form-status is-error";
            formStatus.style.display = "block";
            formStatus.textContent = data.message || "Failed to send message. Please try again.";
          }
        }
      } catch (err) {
        if (formStatus) {
          formStatus.className = "form-status is-error";
          formStatus.style.display = "block";
          formStatus.textContent = "Network error. Please check your connection and try again.";
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  function setupProjectTabs() {
    const tabBtns = document.querySelectorAll(".project-tab-btn");
    const cards = document.querySelectorAll(".project-detailed-card");
    if (!tabBtns.length || !cards.length) return;

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter || "all";

        tabBtns.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle("is-active", isActive);
          b.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        cards.forEach((card) => {
          const category = card.dataset.category || "";
          const shouldShow = filter === "all" || category.includes(filter);

          if (shouldShow) {
            card.classList.remove("is-hidden");
            card.classList.remove("is-animating");
            void card.offsetWidth; // Reflow to restart animation
            card.classList.add("is-animating");
          } else {
            card.classList.add("is-hidden");
            card.classList.remove("is-animating");
          }
        });
      });
    });
  }

  setupFormHandler(contactForm, "submit-btn", "form-status");
  setupFormHandler(pageContactForm, "page-submit-btn", "page-form-status");

  function initApp() {
    setupSightSlider();
    setupProjectTabs();
    requestTick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();

