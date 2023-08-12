// Window onload, Preload images and animate intro element
window.onload = () => {
  for (let i = 0; i < alldata.length; i++) {
    for (let j = 0; j < alldata[i].length; j++) {
      createCard(alldata[i][j]);
    }
  }

  addProjects();
  loadIntro();
};

// Projects variables
const projects = document.getElementById("works");
let cards = [];

// Reset project screen, add cards then add whitespace at bottom of screen
function displayData(dataset) {
  cards = [];
  projects.innerHTML = "";

  for (let i = 0; i < dataset.length; i++) {
    createCard(dataset[i]);
  }

  const whitespace = document.createElement('div');
  whitespace.classList.add("whitespace");
  projects.appendChild(whitespace);
}

// Create card from data
function createCard(data) {
  const image = data[0];
  const title = data[1];
  const text = data[2];
  const linktext = data[3];
  const adress = data[4];
  const mode = data[5];

  const card = document.createElement("div");
  card.classList.add("project");
  card.classList.add(mode);
  card.style.animation = "move-up 0.3s " + cards.length / 10 + "s ease-in-out backwards";
  card.style.backgroundImage = "url(" + image + ")";
  card.addEventListener("click", () => {
    cards.forEach((e) => {

      if (!e.classList.contains("active")) {
        e.classList.remove("active");
      }
    });

    if (card.classList.contains("active")) {
      card.classList.remove("active");
    } else {
      card.classList.add("active");
    }
  });

  const info = document.createElement("div");
  info.classList.add("project-info");

  const header = document.createElement("h1");
  header.innerText = title;
  info.appendChild(header);

  const paragraph = document.createElement("p");
  paragraph.innerText = text;
  info.appendChild(paragraph);

  const link = document.createElement("a");
  link.href = adress;
  link.target = "_blank";
  link.innerText = linktext;
  info.appendChild(link);

  card.appendChild(info);
  projects.appendChild(card);

  cards.push(card);
}

// Intro element
const introElement = document.getElementById("intro");
introElement.addEventListener("animationend", introElement.remove);
function loadIntro() {
  introElement.style.animation = "intro-animation 2.5s 0.2s ease-in-out forwards";
}

// Navigation variables
const worksPage = document.getElementById("projects-page");
const aboutPage = document.getElementById("about-page");
const navLinks = document.querySelectorAll(".nav-link");

// Sidebar category selector variables
const sidebarHeaders = document.querySelectorAll(".sidebar-header a");

// Navigation
for (let i = 0; i < navLinks.length; i++) {
  const link = navLinks[i];
  link.addEventListener("click", () => {
    switch (link.innerText) {
      case "Work":
        worksPage.style.display = "flex";
        aboutPage.style.display = "none";
        break;

      case "About":
        worksPage.style.display = "none";
        aboutPage.style.display = "block";
        break;

      default:
        break;
    }
    if (link.className != "active") {
      navLinks.forEach((e) => {
        e.classList.remove("active");
      });
      link.classList.add("active");
    }
  });
}

// Check active project header and add cards
function addProjects() {
  for (let i = 0; i < sidebarHeaders.length; i++) {
    if (sidebarHeaders[i].className == "active") {
      eval(
        "displayData(" +
        sidebarHeaders[i].innerText.toLowerCase() +
        "data" +
        ");"
      );
    }
  }
}

// Sidebar category selector
for (let i = 0; i < sidebarHeaders.length; i++) {
  sidebarHeaders[i].addEventListener("click", () => {
    if (sidebarHeaders[i].className != "active") {
      sidebarHeaders.forEach((e) => {
        e.classList.remove("active");
      });
      sidebarHeaders[i].classList.add("active");

      for (let i = 0; i < cards.length; i++) {
        cards[cards.length - i - 1].style.animation = "move-down 0.3s " + i / 10 + "s ease-in-out forwards";
      }

      cards[0].addEventListener("animationend", addProjects);
    }
  });
}
