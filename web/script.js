const siteName = "De La Salle John Bosco College";
const pageTitles = {
  home: "Home",
  about: "About Us",
  academics: "Academics",
  admissions: "Admissions",
  news: "News & Events",
  contact: "Contact Us",
};

const screens = Array.from(document.querySelectorAll(".screen"));
const routeLinks = Array.from(document.querySelectorAll("[data-route]"));
const menuToggle = document.querySelector(".menu-toggle");
const mobileNavigation = document.querySelector("#mobile-navigation");

function showPage(route) {
  const activeRoute = pageTitles[route] ? route : "home";

  screens.forEach((screen) => {
    screen.hidden = screen.dataset.page !== activeRoute;
  });

  routeLinks.forEach((link) => {
    const isActive = link.dataset.route === activeRoute;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  document.title = `${pageTitles[activeRoute]} | ${siteName}`;
  window.scrollTo(0, 0);
  closeMobileNavigation();
}

function closeMobileNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  mobileNavigation.hidden = true;
}

mobileNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMobileNavigation();
  }
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  mobileNavigation.hidden = isExpanded;
});

window.addEventListener("hashchange", () => {
  showPage(window.location.hash.slice(1));
});

showPage(window.location.hash.slice(1));
