/**
 * REDE DE COMBATE AO CÂNCER SCRP — COMPORTAMENTO E INTERATIVIDADE
 * Vanilla JavaScript Moderno, Acessível, Leve e Performático
 */

(() => {
  "use strict";

  // Cache de elementos principais
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ==========================================================================
     1. MENU MOBILE ACESSÍVEL
     ========================================================================== */
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      const label = toggle.querySelector(".visually-hidden");
      if (label) label.textContent = "Abrir menu";
    }
  };

  toggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    const label = toggle.querySelector(".visually-hidden");
    if (label) label.textContent = isOpen ? "Fechar menu" : "Abrir menu";
  });

  // Fecha o menu ao clicar em qualquer link de seção
  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  // Fecha o menu ao pressionar a tecla ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMenu();
      toggle?.focus();
    }
  });

  /* ==========================================================================
     2. HERO ENTRANCE PROGRESSIVA (Sem perseguição contínua de scroll)
     ========================================================================== */
  const hero = document.querySelector(".hero");
  if (hero) {
    // Aciona a animação no próximo frame de renderização
    requestAnimationFrame(() => {
      hero.classList.add("is-in");
    });
  }

  /* ==========================================================================
     3. REVEAL PROGRESSIVO POR SCROLL (IntersectionObserver)
     ========================================================================== */
  const revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion) {
    revealItems.forEach((el) => el.classList.add("is-in"));
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-in"));
  }

  /* ==========================================================================
     4. INDICAÇÃO VISUAL DO ITEM ATIVO NA NAVEGAÇÃO DURANTE O SCROLL
     ========================================================================== */
  const updateActiveNav = () => {
    const headerHeight = (header?.offsetHeight || 92) + 20;
    let currentId = sections[0]?.id || "";

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top - headerHeight <= 0) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isTarget = href === `#${currentId}`;
      link.classList.toggle("is-active", isTarget);
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* ==========================================================================
     5. CARDS EXPANSÍVEIS (Nossas Ações e Eventos)
     ========================================================================== */
  document.querySelectorAll("[data-expandable]").forEach((list) => {
    const cards = [...list.querySelectorAll(".expand-card")];
    cards.forEach((card) => {
      const button = card.querySelector(".expand-toggle");
      button?.addEventListener("click", () => {
        const isCurrentlyOpen = card.classList.contains("is-open");
        
        // Em telas de toque/mobile, fecha os outros para manter a tela limpa
        if (window.innerWidth < 850) {
          cards.forEach((other) => {
            if (other !== card) {
              other.classList.remove("is-open");
              other.querySelector(".expand-toggle")?.setAttribute("aria-expanded", "false");
            }
          });
        }

        card.classList.toggle("is-open", !isCurrentlyOpen);
        button.setAttribute("aria-expanded", String(!isCurrentlyOpen));
      });
    });
  });

  /* ==========================================================================
     6. CARROSSEL INSTITUCIONAL — REGRAS 18 & 60: APENAS BOTÕES E INDICADORES
     Sem drag, sem swipe horizontal, sem movimento do cursor!
     ========================================================================== */
  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const slides = [...carousel.querySelectorAll(".carousel-slide")];
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.querySelector(".carousel-dots");
    let currentIndex = 0;

    // Constrói os indicadores (dots) acessíveis
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Ir para a imagem ${i + 1} de ${slides.length}`);
      dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      dot.addEventListener("click", () => goToSlide(i));
      dotsWrap?.append(dot);
    });

    const goToSlide = (nextIndex) => {
      currentIndex = (nextIndex + slides.length) % slides.length;
      if (track) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === currentIndex);
      });
      if (dotsWrap) {
        [...dotsWrap.children].forEach((dot, i) => {
          dot.setAttribute("aria-current", i === currentIndex ? "true" : "false");
          dot.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
        });
      }
    };

    // Navegação estritamente via botões
    prevBtn?.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn?.addEventListener("click", () => goToSlide(currentIndex + 1));

    // Suporte a teclas de seta esquerda/direita no foco do carrossel
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        goToSlide(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        goToSlide(currentIndex + 1);
      }
    });

    goToSlide(0);
  }

  /* ==========================================================================
     7. ÁREA DE DOAÇÕES: SELEÇÃO DE VALORES E PLANOS
     ========================================================================== */
  const plans = {
    "20": "Ajude na compra de itens essenciais e alimentos para as famílias assistidas.",
    "50": "Contribua com medicamentos, fraldas e materiais de higiene para uma família.",
    "100": "Fortaleça o apoio alimentar completo e transporte para consultas médicas.",
    "200": "Amplie a capacidade de atendimento emergencial a pacientes em tratamento.",
    outro: "Qualquer valor faz uma diferença enorme na vida de quem mais precisa."
  };

  const amountButtons = [...document.querySelectorAll(".amount-btn")];
  const customWrap = document.querySelector(".custom-amount");
  const customInput = document.querySelector("#outro-valor");
  const chosenDisplay = document.querySelector("#valor-escolhido");
  const planHint = document.querySelector("#plan-hint");

  const formatBRL = (val) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const updateDonationValue = (val) => {
    if (val === "outro") {
      const num = Number(customInput?.value);
      if (chosenDisplay) {
        chosenDisplay.textContent = num > 0 ? formatBRL(num) : "um valor livre";
      }
      return;
    }
    if (chosenDisplay) {
      chosenDisplay.textContent = formatBRL(Number(val));
    }
  };

  amountButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      amountButtons.forEach((other) => {
        other.classList.remove("is-selected");
        other.setAttribute("aria-pressed", "false");
      });

      btn.classList.add("is-selected");
      btn.setAttribute("aria-pressed", "true");

      const amountVal = btn.dataset.amount;
      const isCustom = amountVal === "outro";

      customWrap?.classList.toggle("is-hidden", !isCustom);
      if (planHint) {
        planHint.textContent = plans[amountVal] || plans.outro;
      }

      updateDonationValue(amountVal);

      if (isCustom) {
        customInput?.focus();
      }
    });
  });

  customInput?.addEventListener("input", () => updateDonationValue("outro"));

  /* ==========================================================================
     8. BOTÃO COPIAR CHAVE PIX COM FEEDBACK VISUAL FUNCIONAL
     ========================================================================== */
  const copyPixBtn = document.querySelector("#copy-pix");
  const pixInput = document.querySelector("#pix-key");
  const copyTextSpan = copyPixBtn?.querySelector(".copy-text");

  copyPixBtn?.addEventListener("click", async () => {
    const keyToCopy = pixInput?.value?.trim() || "[INSERIR CHAVE PIX]";

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(keyToCopy);
      } else {
        pixInput?.select();
        document.execCommand("copy");
      }

      // Feedback visual e de texto conforme Prompt ("PIX copiado!")
      copyPixBtn.classList.add("is-copied");
      if (copyTextSpan) {
        copyTextSpan.textContent = "PIX copiado!";
      }

      window.setTimeout(() => {
        copyPixBtn.classList.remove("is-copied");
        if (copyTextSpan) {
          copyTextSpan.textContent = "Copiar chave PIX";
        }
      }, 2500);
    } catch {
      // Fallback em navegadores que bloqueiem
      pixInput?.select();
      copyPixBtn.classList.add("is-copied");
      if (copyTextSpan) copyTextSpan.textContent = "PIX copiado!";
      window.setTimeout(() => {
        copyPixBtn.classList.remove("is-copied");
        if (copyTextSpan) copyTextSpan.textContent = "Copiar chave PIX";
      }, 2500);
    }
  });

  /* ==========================================================================
     9. VALIDAÇÃO DOS FORMULÁRIOS (Contato & Voluntariado)
     ========================================================================== */
  const validateField = (field) => {
    const input = field.querySelector("input, textarea");
    const error = field.querySelector(".field-error");
    if (!input) return true;

    const value = input.value.trim();
    let message = "";

    if (!value && input.hasAttribute("required")) {
      message = "Por favor, preencha este campo.";
    } else if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = "Informe um endereço de e-mail válido.";
    }

    field.classList.toggle("is-invalid", Boolean(message));
    if (error) {
      error.textContent = message;
    }
    return !message;
  };

  const setupForm = (form, successMsg) => {
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = [...form.querySelectorAll(".field")];
      const isAllValid = fields.every(validateField);
      const status = form.querySelector(".form-status");

      if (!isAllValid) {
        if (status) {
          status.style.color = "#d32f2f";
          status.textContent = "Por favor, revise os campos destacados acima.";
        }
        return;
      }

      if (status) {
        status.style.color = "var(--rose)";
        status.textContent = successMsg;
      }

      form.reset();
      fields.forEach((f) => f.classList.remove("is-invalid"));

      window.setTimeout(() => {
        if (status) status.textContent = "";
      }, 6000);
    });

    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("blur", () => {
        validateField(input.closest(".field"));
      });
      input.addEventListener("input", () => {
        const field = input.closest(".field");
        if (field?.classList.contains("is-invalid")) {
          validateField(field);
        }
      });
    });
  };

  setupForm(
    document.querySelector("#form-contato"),
    "✓ Sua mensagem foi recebida com carinho! Responderemos em breve."
  );

  setupForm(
    document.querySelector("#form-voluntario"),
    "✓ Cadastro de voluntário enviado! Nossa equipe entrará em contato para acolhê-lo(a)."
  );
})();
