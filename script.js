"use strict";

/*
=========================================================
CODETEEN
Main JavaScript
=========================================================
*/


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header = document.getElementById("header");


function handleHeader() {

    if (!header) return;

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeader,
    { passive: true }
);


handleHeader();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   PARTICLES
===================================================== */

const particlesContainer =
    document.getElementById("particles");


function createParticles() {

    if (!particlesContainer) return;


    const count =
        window.innerWidth < 600
            ? 18
            : 35;


    const fragment =
        document.createDocumentFragment();


    for (let i = 0; i < count; i++) {

        const particle =
            document.createElement("span");


        particle.className =
            "particle";


        const size =
            Math.random() * 3 + 1;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.animationDuration =
            `${Math.random() * 18 + 12}s`;


        particle.style.animationDelay =
            `${Math.random() * -20}s`;


        fragment.appendChild(particle);

    }


    particlesContainer.appendChild(fragment);

}


createParticles();


/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =====================================================
   SMOOTH ANCHOR NAVIGATION
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                const id =
                    entry.target.id;


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute("href") ===
                        `#${id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },
        {
            rootMargin:
                "-30% 0px -60% 0px"
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   PREVENT ACCIDENTAL HASH JUMP
===================================================== */

if (
    window.location.hash === "#"
) {

    history.replaceState(
        null,
        "",
        window.location.pathname
    );

}
