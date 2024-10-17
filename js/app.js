const allSections = document.getElementsByTagName("section");

document.addEventListener("DOMContentLoaded", buildNavBar);

document.addEventListener("click", navigateToSection);

document.addEventListener("scroll", observViewedSection);

document.addEventListener("click", showMenu);

function buildNavBar() {
    let sectionIndex = 0;

    const docFragment = document.createDocumentFragment();

    const navList = document.getElementById("navbar__list");
    while (sectionIndex < allSections.length) {
        const navItem = document.createElement("li");
        const itemAnchor = document.createElement("a");
        itemAnchor.textContent =
            allSections[sectionIndex].getAttribute("data-nav");
        itemAnchor.href = "#" + allSections[sectionIndex].getAttribute("id");
        itemAnchor.classList.add("menu__link");
        navItem.appendChild(itemAnchor);
        docFragment.appendChild(navItem);
        sectionIndex++;
    }
    navList.appendChild(docFragment);
}

function navigateToSection(ev) {
    if (ev.target.classList.contains("menu__link")) {
        const targetedSection = document.getElementById(
            ev.target.getAttribute("href").slice(1)
        );
        ev.preventDefault();

        hideNav(ev);
        window.scrollTo({
            behavior: "smooth",
            top: targetedSection.offsetTop,
        });
    }
}

function observViewedSection() {
    const observerOptions = {
        threshold: 0.6,
    };

    const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
    );

    for (let section of allSections) {
        observer.observe(section);
    }
}

function observerCallback(entries) {
    for (const entry of entries) {
        const equivalentAnchor = document.querySelector(
            `a[href='#${entry.target.id}']`
        );
        const viewdSection = entry.target;

        if (entry.isIntersecting) {
            viewdSection.classList.add("your-active-class");
            equivalentAnchor.classList.add("active_link");
        } else {
            viewdSection.classList.remove("your-active-class");
            equivalentAnchor.classList.remove("active_link");
        }
    }
}

function showMenu(event) {
    const navMenu = document.querySelector(".navbar__menu ul");

    if (event.target.classList.contains("toggle-button")) {
        navMenu.classList.toggle("clicked");
    }
}

function hideNav(ev) {
    const navList = document.querySelector("#navbar__list.clicked");
    if (navList != null) {
        navList.classList.remove("clicked");
    }
}
