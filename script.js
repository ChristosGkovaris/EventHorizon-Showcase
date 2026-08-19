/* =========================================================
   EVENTHORIZON SHOWCASE
   Interactive Frontend Demo
   ========================================================= */


/* =========================================================
   SIMULATED LOG DATA
   ========================================================= */

const logTemplates = [
    {
        service: "auth-service",
        severity: "INFO",
        message: "User logged in successfully"
    },
    {
        service: "payment-service",
        severity: "ERROR",
        message: "Payment request timed out"
    },
    {
        service: "database-service",
        severity: "WARNING",
        message: "Database connection pool is almost full"
    },
    {
        service: "api-gateway",
        severity: "INFO",
        message: "Incoming request processed successfully"
    },
    {
        service: "auth-service",
        severity: "WARNING",
        message: "Multiple authentication attempts detected"
    },
    {
        service: "payment-service",
        severity: "INFO",
        message: "Payment transaction completed"
    },
    {
        service: "database-service",
        severity: "ERROR",
        message: "Database connection failed"
    },
    {
        service: "api-gateway",
        severity: "WARNING",
        message: "Response latency exceeded expected threshold"
    },
    {
        service: "inventory-service",
        severity: "INFO",
        message: "Inventory state synchronized"
    },
    {
        service: "inventory-service",
        severity: "ERROR",
        message: "Inventory synchronization failed"
    }
];


/* =========================================================
   APPLICATION STATE
   ========================================================= */

let logs = [];

let currentFilter = "ALL";

let currentSearch = "";

const MAX_LOGS = 50;


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const logContainer = document.getElementById("log-container");

const totalCount = document.getElementById("total-count");
const infoCount = document.getElementById("info-count");
const warningCount = document.getElementById("warning-count");
const errorCount = document.getElementById("error-count");

const filterButtons = document.querySelectorAll(".filter-button");

const searchInput = document.getElementById("log-search");

const clearButton = document.getElementById("clear-logs");


/* =========================================================
   TIME GENERATOR
   ========================================================= */

function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString(
        "en-GB",
        {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

}


/* =========================================================
   CREATE RANDOM LOG
   ========================================================= */

function generateLog() {

    const template =
        logTemplates[
            Math.floor(
                Math.random() * logTemplates.length
            )
        ];

    const log = {
        id: crypto.randomUUID(),
        time: getCurrentTime(),
        service: template.service,
        severity: template.severity,
        message: template.message
    };

    logs.unshift(log);

    if (logs.length > MAX_LOGS) {
        logs.pop();
    }

    renderLogs();
    updateStats();

}


/* =========================================================
   RENDER LOGS
   ========================================================= */

function renderLogs() {

    logContainer.innerHTML = "";

    const filteredLogs = logs.filter(log => {

        const severityMatches =
            currentFilter === "ALL" ||
            log.severity === currentFilter;

        const searchText =
            `${log.service} ${log.severity} ${log.message}`
                .toLowerCase();

        const searchMatches =
            searchText.includes(
                currentSearch.toLowerCase()
            );

        return severityMatches && searchMatches;

    });


    filteredLogs.forEach(log => {

        const entry = document.createElement("div");

        entry.classList.add("log-entry");


        entry.innerHTML = `
            <span class="log-time">
                ${log.time}
            </span>

            <span class="log-severity ${log.severity}">
                ${log.severity}
            </span>

            <span class="log-service">
                ${log.service}
            </span>

            <span class="log-message">
                ${log.message}
            </span>
        `;


        logContainer.appendChild(entry);

    });


    if (filteredLogs.length === 0) {

        const emptyState =
            document.createElement("div");

        emptyState.style.padding = "50px";
        emptyState.style.textAlign = "center";
        emptyState.style.color = "#475569";
        emptyState.style.fontSize = "0.8rem";

        emptyState.textContent =
            "No logs match the current filters.";

        logContainer.appendChild(emptyState);

    }

}


/* =========================================================
   LOG STATISTICS
   ========================================================= */

function updateStats() {

    totalCount.textContent =
        logs.length;

    infoCount.textContent =
        logs.filter(
            log => log.severity === "INFO"
        ).length;

    warningCount.textContent =
        logs.filter(
            log => log.severity === "WARNING"
        ).length;

    errorCount.textContent =
        logs.filter(
            log => log.severity === "ERROR"
        ).length;

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                currentButton =>
                    currentButton.classList.remove(
                        "active"
                    )
            );

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            renderLogs();

        }
    );

});


/* =========================================================
   SEARCH
   ========================================================= */

searchInput.addEventListener(
    "input",
    event => {

        currentSearch =
            event.target.value.trim();

        renderLogs();

    }
);


/* =========================================================
   CLEAR LOGS
   ========================================================= */

clearButton.addEventListener(
    "click",
    () => {

        logs = [];

        renderLogs();
        updateStats();

    }
);


/* =========================================================
   INITIAL DEMO LOGS
   ========================================================= */

function initializeLogs() {

    const initialLogs = [
        {
            service: "auth-service",
            severity: "INFO",
            message: "User logged in successfully"
        },
        {
            service: "payment-service",
            severity: "ERROR",
            message: "Payment request timed out"
        },
        {
            service: "database-service",
            severity: "WARNING",
            message: "Database connection pool is almost full"
        },
        {
            service: "api-gateway",
            severity: "INFO",
            message: "Incoming request processed successfully"
        }
    ];


    initialLogs.forEach(
        (log, index) => {

            logs.push({
                id: crypto.randomUUID(),
                time: getCurrentTime(),
                service: log.service,
                severity: log.severity,
                message: log.message
            });

        }
    );


    renderLogs();
    updateStats();

}


/* =========================================================
   CONTINUOUS SIMULATED LOG STREAM
   ========================================================= */

function startLogStream() {

    setInterval(
        () => {

            generateLog();

        },
        2200
    );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    `
    .section-heading,
    .feature-card,
    .capability-card,
    .architecture-node,
    .roadmap-item,
    .stack-column,
    .open-source-content
    `
);


revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   ACTIVE NAVIGATION SECTION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                navigationLinks.forEach(
                    link => {

                        link.style.color = "";

                        link.style.background = "";

                    }
                );


                const activeLink =
                    document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );


                if (activeLink) {

                    activeLink.style.color =
                        "#60a5fa";

                    activeLink.style.background =
                        "rgba(59, 130, 246, 0.07)";

                }

            });

        },

        {
            threshold: 0.35
        }

    );


sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================================
   HERO CORE MOUSE PARALLAX
   ========================================================= */

const eventCore =
    document.querySelector(".event-core");


if (eventCore) {

    const hero =
        document.querySelector(".hero");


    hero.addEventListener(
        "mousemove",
        event => {

            const heroBounds =
                hero.getBoundingClientRect();

            const mouseX =
                event.clientX -
                heroBounds.left;

            const mouseY =
                event.clientY -
                heroBounds.top;

            const centerX =
                heroBounds.width / 2;

            const centerY =
                heroBounds.height / 2;

            const moveX =
                (mouseX - centerX) / 35;

            const moveY =
                (mouseY - centerY) / 35;


            eventCore.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            eventCore.style.transform =
                "translate(0, 0)";

        }
    );

}


/* =========================================================
   INTERACTIVE CARD TILT
   ========================================================= */

const interactiveCards =
    document.querySelectorAll(
        `
        .feature-card,
        .capability-card,
        .architecture-node,
        .stack-column
        `
    );


interactiveCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rectangle =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rectangle.left;

            const y =
                event.clientY -
                rectangle.top;

            const centerX =
                rectangle.width / 2;

            const centerY =
                rectangle.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;


            card.style.transform =
                `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-6px)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   ARCHITECTURE INTERACTION
   ========================================================= */

const architectureNodes =
    document.querySelectorAll(
        ".architecture-node"
    );


architectureNodes.forEach(node => {

    node.style.cursor = "pointer";


    node.addEventListener(
        "click",
        () => {

            architectureNodes.forEach(
                currentNode => {

                    currentNode.style.borderColor = "";
                    currentNode.style.boxShadow = "";

                }
            );


            node.style.borderColor =
                "rgba(96, 165, 250, 0.65)";

            node.style.boxShadow =
                `
                0 22px 55px rgba(0, 0, 0, 0.3),
                0 0 45px rgba(59, 130, 246, 0.13)
                `;

        }
    );

});


/* =========================================================
   ROADMAP INTERACTION
   ========================================================= */

const roadmapItems =
    document.querySelectorAll(
        ".roadmap-item"
    );


roadmapItems.forEach(item => {

    item.addEventListener(
        "mouseenter",
        () => {

            const marker =
                item.querySelector(
                    ".roadmap-marker"
                );

            marker.style.transform =
                "scale(1.35)";

        }
    );


    item.addEventListener(
        "mouseleave",
        () => {

            const marker =
                item.querySelector(
                    ".roadmap-marker"
                );

            marker.style.transform =
                "";

        }
    );

});


/* =========================================================
   NAVBAR BACKDROP EFFECT
   ========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 80) {

            navbar.style.background =
                "rgba(5, 7, 11, 0.91)";

            navbar.style.boxShadow =
                "0 15px 45px rgba(0, 0, 0, 0.4)";

        }

        else {

            navbar.style.background =
                "rgba(5, 7, 11, 0.72)";

            navbar.style.boxShadow =
                `
                0 12px 40px rgba(0, 0, 0, 0.25),
                inset 0 1px 0 rgba(255,255,255,0.025)
                `;

        }

    }
);


/* =========================================================
   BUTTON MAGNETIC EFFECT
   ========================================================= */

const buttons =
    document.querySelectorAll(
        ".button"
    );


buttons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            const rectangle =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rectangle.left -
                rectangle.width / 2;

            const y =
                event.clientY -
                rectangle.top -
                rectangle.height / 2;


            button.style.transform =
                `translate(${x * 0.08}px, ${y * 0.12}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeLogs();

        startLogStream();

    }
);