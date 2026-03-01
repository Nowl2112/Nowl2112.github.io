document.addEventListener("DOMContentLoaded", () => {
    const diveBtn = document.querySelector(".btn");
    const intro = document.querySelector(".Intro");
    const about = document.querySelector("#about");
    const projects = document.querySelector("#projects");

    const teaser = document.querySelector(".angler-teaser");
    const baitBtn = document.querySelector(".angler-hit");
    const modal = document.querySelector("#projectModal");
    const modalTitle = document.querySelector("#modalTitle");
    const modalSub = document.querySelector("#modalSub");
    const modalContent = document.querySelector("#modalContent");
    const modalActions = document.querySelector("#modalActions");

const PROJECTS = {
    socialcompass: {
        title: "Social Compass",
        sub: "Inclusive learning platform • Guided scenarios • AI with safety guardrails",
        image: "assets/socialcompass.jpg", 
        bullets: [
        "Built with React, Flask, and Firebase to support PWIDs in practising real-world social interactions.",
        "Gamified guided scenarios with progress tracking and staff-managed content.",
        "AI companion (Andy) with industry-standard safety guardrails to provide supportive feedback without risks."
        ],
        links: [
        { label: "Article", href: "https://www.straitstimes.com/singapore/students-apps-to-help-elderly-people-with-intellectual-disabilities-win-dell-innovatefest-contest", style: "" }
        ]
    },

    autotesthub: {
        title: "AutoTestHub",
        sub: "Cross-browser automation • Parallel execution • AI-assisted debugging",
        image: "assets/ath.png", 
        bullets: [
        "Developed a scalable cross-browser testing platform inspired by Selenium Grid concepts.",
        "Supports parallel test execution across multiple browsers to improve regression efficiency.",
        "Interactive dashboard highlights failures and generates AI-powered debugging suggestions."
        ],
        links: [
        { label: "GitHub", href: "https://github.com/Nowl2112/FSDP_Group5", style: "" },
        ]
    },

    healthease: {
        title: "HealthEase",
        sub: "Cloud-native healthcare platform • Microservices • AI-enabled assessment",
        image: "assets/healthEase.png", 
        bullets: [
        "Designed a Dockerised microservices architecture with independently scalable services.",
        "Integrated AI chatbot support and structured physical test workflows for fall-risk evaluation.",
        "Applied cloud-native principles: service isolation, fault tolerance, and horizontal scalability."
        ],
    }
    };

    function openModal(projectKey){
    const p = PROJECTS[projectKey];
    if (!p || !modal) return;

    modalTitle.textContent = p.title;
    modalSub.textContent = p.sub;

    modalContent.innerHTML = `
    ${p.image ? `
        <div class="modal-image">
        <img src="${p.image}" alt="${p.title} preview">
        </div>
    ` : ""}

    <ul>
        ${p.bullets.map(b => `<li>${b}</li>`).join("")}
    </ul>
    `;

    modalActions.innerHTML = (p.links || [])
        .map(l => `<a class="${l.style || ""}" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`)
        .join("");

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; 
    }

    function closeModal(){
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    }

    document.querySelectorAll(".project-card").forEach(card => {
    const key = card.dataset.project;
    card.addEventListener("click", () => openModal(key));
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(key);
        }
    });
    });

    modal?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.close === "true") closeModal();
    });

    document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
    });
    function setSectionClass(active) {
        document.body.classList.remove("section-intro", "section-about", "section-projects");
        if (active) document.body.classList.add(active);
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function smoothScrollTo(targetEl, offset = 0, duration = 1200) {
        if (!targetEl) return;

        const start = window.scrollY;
        const end = targetEl.offsetTop + offset;
        const distance = end - start;

        let startTime = null;

        function step(now) {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        window.scrollTo(0, start + distance * eased);

        if (elapsed < duration) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    setSectionClass("section-intro");

    if (diveBtn && about) {
        diveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        smoothScrollTo(about, 120, 1400);
        });
    }

    if (baitBtn && projects && teaser) {
        baitBtn.addEventListener("click", () => {
        teaser.classList.add("is-swimming");
        setSectionClass("section-projects");
        setTimeout(() => smoothScrollTo(projects, -20, 1200), 120);
        });
    }

    if (intro) {
        const waveObs = new IntersectionObserver(
        ([entry]) => {
            document.body.classList.toggle("is-swept", entry.intersectionRatio < 0.6);
        },
        { threshold: [0, 0.3, 0.6, 1] }
        );
        waveObs.observe(intro);
    }

const sectionObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target.classList.contains("Intro")) {
            setSectionClass("section-intro");
            teaser?.classList.remove("is-swimming");
        }

        if (entry.target.id === "about") {
            setSectionClass("section-about");
            teaser?.classList.remove("is-swimming");
        }

        if (entry.target.id === "projects") {
            setSectionClass("section-projects");
        }
        });
    },
    {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);

if (intro) sectionObs.observe(intro);
if (about) sectionObs.observe(about);
if (projects) sectionObs.observe(projects);}
);