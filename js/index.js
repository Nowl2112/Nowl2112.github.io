document.addEventListener("DOMContentLoaded", () => {
    const diveBtn = document.querySelector(".btn");
    const intro = document.querySelector(".Intro");
    const about = document.querySelector("#about");
    const projects = document.querySelector("#projects");
const achievements = document.querySelector("#achievements"); 
    const teaser = document.querySelector(".angler-teaser");
    const baitBtn = document.querySelector(".angler-hit");
    const modal = document.querySelector("#projectModal");
    const modalTitle = document.querySelector("#modalTitle");
    const modalSub = document.querySelector("#modalSub");
    const modalContent = document.querySelector("#modalContent");
    const modalActions = document.querySelector("#modalActions");
    const catBtn = document.querySelector(".cat-hit");
    const catTeaser = document.querySelector(".cat-teaser");
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
    document.body.classList.remove(
        "section-intro",
        "section-about",
        "section-projects",
        "section-achievements"
    );
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

        if (entry.target.id === "achievements") {
            setSectionClass("section-achievements");
            teaser?.classList.remove("is-swimming");
        }
        });
    },
    {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
    );

const BADGES = {
    innovatefest: {
        title: "Dell InnovateFest 2024 Champion",
        sub: "Achievement - Inclusive solution - Teamwork",
        image: "assets/dell2.jpg",
        bullets: [
        "Designed and developed Social Compass, our solution to support PWIDs in practising real-world social interactions.",
        "Learnt from industry mentors and iterated based on feedback to improve our solution.",
        "Worked as a team to solve a real-world problem statement."
        ],
        links: [
        {
            label: "Straits Times Article",
            href: "https://www.straitstimes.com/singapore/students-apps-to-help-elderly-people-with-intellectual-disabilities-win-dell-innovatefest-contest",
            style: ""
        }
        ]
    },

    awsccp: {
        title: "AWS Certified Cloud Practitioner (CCP)",
        sub: "Certification - Cloud fundamentals ",
        image: "assets/aws.png",
        bullets: [
        "Picked up AWS cloud fundamentals: core services, architecture basics and shared responsibility model.",
        "Learnt security concepts, identity basics, and best-practices.",
        "Gained a deeper understanding of billing, pricing models and cost optimisation ."
        ],
        links: []
    },

    "Docker Fundamentals": {
        title: "Docker Fundamentals",
        sub: "Certification - Containers- Deployment",
        image: "assets/docker.png",
        bullets: [
        "Built foundational understanding of containerisation and how to use Docker to deploy applications.",
        "Worked with images, containers, and basic workflow concepts.",
        "Improved readiness for deploying microservices and cloud-native applications."
        ],
        links: []
    },

    psm: {
        title: "Professional Scrum Master (PSM I)",
        sub: "Certification - Scrum framework - Agile delivery",
        image: "assets/scrum.png",
        bullets: [
        "Validated knowledge of Scrum roles, events, and artefacts.",
        "Strengthened understanding of iterative delivery and continuous improvement.",
        "Improved way of  approaching team-based product development."
        ],
        links: []
    },

    iassid: {
        title: "IASSID Congress",
        sub: "Milestone - Conference - Showcase",
        image: "assets/minds2.jpeg",
        bullets: [
        "Presented Social Compass at the IASSID Congress, sharing our work with an international audience of experts and researchers within the disability sector.",
        "Received valuable feedback and insights to further improve Social Compass.",
        "Gained confidence in presenting to a wider audience."
        ],
        links: []
    },

    "MINDs Institute": {
        title: "MINDS Institute",
        sub: "Work Experience - Full-Stack - Accessibility & iteration",
        image: "assets/minds.png",
        bullets: [
        "Further developed Social Compass, bringing it from prototype towards a more completed application ready for real-world use.",
        "Iterated based on feedback to improve usability and user experience.",
        "Strengthened full-stack development skills and experience working.",
        "Gained experience working with AI models and ensuring we adhere to industry standards for responsible use of AI."
        ],
        links: []
    }
    };

    // Reuse your existing modal by mapping badge -> modal content
    function openBadge(badgeKey){
    const b = BADGES[badgeKey];
    if (!b) return;

    modalTitle.textContent = b.title;
    modalSub.textContent = b.sub;

    modalContent.innerHTML = `
        ${b.image ? `
        <div class="modal-image">
            <img src="${b.image}" alt="${b.title} preview">
        </div>
        ` : ""}
        <ul>
        ${b.bullets.map(x => `<li>${x}</li>`).join("")}
        </ul>
    `;

    modalActions.innerHTML = (b.links || [])
        .map(l => `<a class="${l.style || ""}" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`)
        .join("");

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    }

    // Click / keyboard open
    document.querySelectorAll(".badge-card").forEach(card => {
    const key = card.dataset.badge;
    card.addEventListener("click", () => openBadge(key));
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openBadge(key);
        }
    });
    });

    if (catBtn && achievements) {
        catBtn.addEventListener("click", () => {
            setSectionClass("section-achievements");
            smoothScrollTo(achievements, -20, 1200);
        });
        }
if (intro) sectionObs.observe(intro);
if (about) sectionObs.observe(about);
if (achievements) sectionObs.observe(achievements);
if (projects) sectionObs.observe(projects);}
);

