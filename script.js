// Projects variables
const projects = document.getElementById("works");

// Project data
function displayData(dataset) {
  let cards = [];
  projects.innerHTML = "";

  for (let i = 0; i < dataset.length; i++) {
    let data = dataset[i];
    const image = data[0];
    const title = data[1];
    const text = data[2];
    const linktext = data[3];
    const adress = data[4];

    const card = document.createElement("div");
    card.classList.add("project");
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
}

// Intro element
const introElement = document.getElementById("intro");
introElement.addEventListener("animationend", introElement.remove);

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
        worksPage.style.display = "block";
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

// Projects
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
addProjects();

// Sidebar category selector
for (let i = 0; i < sidebarHeaders.length; i++) {
  sidebarHeaders[i].addEventListener("click", () => {
    if (sidebarHeaders[i].className != "active") {
      sidebarHeaders.forEach((e) => {
        e.classList.remove("active");
      });
      sidebarHeaders[i].classList.add("active");
      addProjects();
    }
  });
}
