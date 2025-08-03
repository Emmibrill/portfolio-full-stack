const navToggler = document.querySelector(".hambugger");
const navList = document.querySelector(".lists");
const navTabs = document.querySelectorAll(".list__tab");
const navTabsPar = document.querySelectorAll(".list");
const myServicesCon = document.querySelector(".all_services");
const frontendToolsWrapper = document.querySelector("#frontend");

//activates the navigation bar and controls the hambugger movement
function activateNavbar() {
  let navState = navToggler.getAttribute("aria-controls");
  if (navState === "closed") {
    navToggler.setAttribute("aria-controls", "open");
  } else {
    navToggler.setAttribute("aria-controls", "closed");
  }
  navList.classList.toggle("navActive");
}

//deacivates the navbar on scroll with a corresponding hambugger movement
function removeNavbar() {
  let navState = navToggler.getAttribute("aria-controls");
  if (navState === "open") {
    navToggler.setAttribute("aria-controls", "closed");
    navList.classList.remove("navActive");
  }
}

//show which section is being clicked
function showClickedNav() {
  for (let i = 0; i < navTabs.length; i++) {
    const element = navTabs[i];
    element.addEventListener("click", () => {
      for (let i = 0; i < navTabs.length; i++) {
        const element = navTabs[i];
        element.classList.remove("active");
      }
      element.classList.add("active");
    });
  }
}

showClickedNav();

window.addEventListener("load", () => {
  navList.classList.remove("navActive");
});

navToggler.addEventListener("click", () => {
  activateNavbar();
});

window.addEventListener("scroll", () => {
  removeNavbar();
});

const inputs = document.querySelectorAll(".input");
inputs.forEach((input) => {
  input.addEventListener("focus", addfocus);
  input.addEventListener("blur", removefocus);
});

function addfocus() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}
function removefocus() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

//form validation for the contact form
// This code validates the contact form fields and provides feedback to the user.
// It checks for empty fields, valid email format, and minimum character requirements for the message field.
// It also handles success and error states for each field, including server errors.

const form = document.querySelector("#contact");
const fields = document.querySelectorAll(".input");

function formValidator() {
  validateOnSubmit();
  validateOnChange();
  validateOnEntry();
}
//validates form on submit
function validateOnSubmit() {
  if (!form) return; // Ensure form exists

  // Add a submit event listener to the form
  form.addEventListener("submit", (e) => {
    let formIsValid = true;
    fields.forEach((field) => {
      if (!validateFields(field)) {
        formIsValid = false;
      }
    });
    // If any field is invalid, prevent form submission
    if (!formIsValid) {
      e.preventDefault();
    } else {
      return true;
    }
  });
}
//validates form on entry
function validateOnEntry() {
  fields.forEach((field) => {
    field.addEventListener("input", () => validateFields(field));
  });
}
//validates form on change when using autocomplete
function validateOnChange() {
  fields.forEach((field) => {
    field.addEventListener("click", () => validateFields(field));
  });
}

//validates all the input fields
function validateFields(field) {
  if (field.name === "name") {
    if (field.value.trim() === "") {
      setStatus(field, "field cannot be blank", "error");
      return false;
    } else if (field.value.length < 3) {
      setStatus(field, "please enter your full name", "error");
      return false;
    } else {
      setStatus(field, "", "success");
    }
  }

  if (field.type.trim() === "email") {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(field.value)) {
      setStatus(field, "enter a valid email address", "error");
      return false;
    } else {
      setStatus(field, "", "success");
    }
  }

  if (field.name === "message") {
    if (field.value.trim() === "") {
      setStatusForMsg(field, "field cannot be blank", "error");
      return false;
    } else if (field.value.length < 10) {
      setStatusForMsg(field, "please write something descriptive", "error");
      return false;
    } else {
      setStatusForMsg(field, "", "success");
    }
  }

  return true;
}

//set status for the input fields
function setStatus(field, message, status) {
  const errorIcon = field.parentElement.querySelector(".fa-circle-xmark");
  const successIcon = field.parentElement.querySelector(".fa-circle-check");
  const errorMessage = field.parentElement.querySelector(".errorMessage");

  const isServerError = errorMessage.dataset.serverError === "true";
  if (isServerError) return; // If it's a server error, we don't change the status

  if (status === "success") {
    if (errorIcon) errorIcon.classList.remove("input-error");
    if (successIcon) successIcon.classList.add("input-success");
    if (errorMessage) {
      errorMessage.classList.remove("input-error");
      errorMessage.innerHTML = "";
      errorMessage.dataset.serverError = "false"; // Reset server error status
    }
    field.classList.remove("input-error");
    field.classList.add("input-success");
  }
  if (status === "error") {
    if (successIcon) successIcon.classList.remove("input-success");
    if (errorIcon) errorIcon.classList.add("input-error");
    if (errorMessage) {
      errorMessage.classList.add("input-error");
      errorMessage.innerHTML = message;
      errorMessage.dataset.serverError = "false"; // Reset server error status
    }
    field.classList.remove("input-success");
    field.classList.add("input-error");
  }
}
//set status for the message field
function setStatusForMsg(field, message, status) {
  const errorForMsg = field.parentElement.querySelector(
    ".errorMessage--message"
  );

  const isServerError = errorForMsg.dataset.serverError === "true";

  if (isServerError) return; // If it's a server error, we don't change the status
  if (status === "success") {
    if (errorForMsg) {
      errorForMsg.classList.remove("error");
      errorForMsg.innerHTML = "";
      errorForMsg.dataset.serverError = "false"; // Reset server error status
    }
    field.classList.remove("input-error");
    field.classList.add("input-success");
  }
  if (status === "error") {
    if (errorForMsg) {
      errorForMsg.classList.add("error");
      errorForMsg.innerHTML = message;
      errorForMsg.dataset.serverError = "false"; // Reset server error status
    }
    field.classList.remove("input-success");
    field.classList.add("input-error");
  }
}
function clearField() {
  fields.forEach((field) => {
    field.value = "";
    field.classList.remove("input-success", "input-error");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  formValidator();
});

//display services

function showServices() {
  let myServices = "";
  let ser = [
    {
      serviceIcon: '<i class="fa-solid fa-mobile"></i>',
      serviceName: "mobile friendly layout",
      servicePar: `For a seamless and productive user experience, 
                  having a mobile-responsive website is absolutely 
                  necessary. This is one area I do not shirk from`,
    },
    {
      serviceIcon: '<i class="fa-solid fa-laptop"></i>',
      serviceName: "web development",
      servicePar: `creation, development, and management of websites 
                        and online applications while implementing best practices 
                        for coding and providing clear documentation`,
    },
    {
      serviceIcon: '<i class="fa-solid fa-gears"></i>',
      serviceName: "Back-End Development",
      servicePar: `I create and maintain website and web App functionality 
                        when users request information or when website needs to relate 
                        to another part of the web architecture`,
    },
  ];

  ser.forEach((s) => {
    myServices += `
    <div class="service_con">
            <div class="icon_con">
                ${s.serviceIcon}
            </div>
            <div class="ser_wrtup">
                <h2 class="ser_wrtup-txt">${s.serviceName}</h2>
            </div>
            <div class="ser_par">
                <p class="ser_par-wrtup">
                    ${s.servicePar} 
                </p>
            </div>
                    
        </div>`;
  });
  myServicesCon.innerHTML = myServices;
}

if (myServicesCon) {
  showServices();
}

const activeService = document.querySelectorAll(".service_con");
if (activeService) {
  showActiveCard(activeService);
}

//show which card is active by adding a border arond the active card
function showActiveCard(card) {
  card.forEach((c) => {
    c.addEventListener("click", () => {
      card.forEach((c) => {
        c.classList.remove("active");
        c.style.border = "none";
      });
      c.classList.add("active");
      c.style.border = "1px solid #0ff";
    });
  });
}

//dynamically filter tools based on category and display them on the page

function filterTools() {
  const toolsData = [
    {
      category: "frontend",
      tools: [
        {
          toolIcon:
            '<svg style="fill: rgb(227, 76, 38);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 96L162.9 491.8L319.5 544L477.1 491.8L512 96L128 96zM436.2 223.9L252.4 223.9L256.5 273.3L432.1 273.3L418.5 421.7L320.6 448.7L320.6 449L319.5 449L220.8 421.7L214.8 345.9L262.5 345.9L266 384L319.5 398.5L373.2 384L379.2 321.8L212.3 321.8L199.5 176.2L440.6 176.2L436.2 223.9z"/></svg>',
          toolName: "html5",
        },
        {
          toolIcon:
            '<svg style="fill: rgb(38, 77, 228);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M544 96L480 464L256.7 544L64 464L83.6 369.2L165.6 369.2L157.6 409.8L274 454.2L408.1 409.8L426.9 312.7L93.5 312.7L109.5 230.7L443.2 230.7L453.7 178L120.3 178L136.6 96L544 96z"/></svg>',
          toolName: "CSS3",
        },
        {
          toolIcon:
            '<svg style="fill: rgb(240, 219, 79);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64L192 320H448L320 64zM320 576L192 320H448L320 576z"/></svg>',
          toolName: "JavaScript",
        },
      ],
    },
    {
      category: "backend",
      tools: [
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="100%" height="100%" fill="#092E20" rx="8" /><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"font-size="160" font-family="Arial, sans-serif" fill="white" font-weight="bold">django</text></svg>',
          toolName: "Django",
        },
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="100%" height="100%" fill="#092E20" rx="8" /><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="160" font-family="Arial, sans-serif" fill="white" font-weight="bold">Express</text></svg>',
          toolName: "Express",
        },
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="100%" height="100%" fill="#092E20" rx="8" /><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="160" font-family="Arial, sans-serif" fill="white" font-weight="bold">MongoDB</text></svg>',
          toolName: "MongoDB",
        },
      ],
    },
    {
      category: "all",
      tools: [
        {
          toolIcon:
            '<svg style="fill: rgb(227, 76, 38);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 96L162.9 491.8L319.5 544L477.1 491.8L512 96L128 96zM436.2 223.9L252.4 223.9L256.5 273.3L432.1 273.3L418.5 421.7L320.6 448.7L320.6 449L319.5 449L220.8 421.7L214.8 345.9L262.5 345.9L266 384L319.5 398.5L373.2 384L379.2 321.8L212.3 321.8L199.5 176.2L440.6 176.2L436.2 223.9z"/></svg>',
          toolName: "html5",
        },
        {
          toolIcon:
            '<svg style="fill: rgb(38, 77, 228);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M544 96L480 464L256.7 544L64 464L83.6 369.2L165.6 369.2L157.6 409.8L274 454.2L408.1 409.8L426.9 312.7L93.5 312.7L109.5 230.7L443.2 230.7L453.7 178L120.3 178L136.6 96L544 96z"/></svg>',
          toolName: "CSS3",
        },
        {
          toolIcon:
            '<svg style="fill: rgb(240, 219, 79);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64L192 320H448L320 64zM320 576L192 320H448L320 576z"/></svg>',
          toolName: "JavaScript",
        },
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="100%" height="100%" fill="#092E20" rx="8" /><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"font-size="160" font-family="Arial, sans-serif" fill="white" font-weight="bold">django</text></svg>',
          toolName: "Django",
        },
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="100%" height="100%" fill="#092E20" rx="8" /><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="160" font-family="Arial, sans-serif" fill="white" font-weight="bold">Express</text></svg>',
          toolName: "Express",
        },
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="100%" height="100%" fill="#092E20" rx="8" /><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="160" font-family="Arial, sans-serif" fill="white" font-weight="bold">MongoDB</text></svg>',
          toolName: "MongoDB",
        },
      ],
    },
  ];

  const toolsTabsData = [
    {
      category: "frontend",
      buttonText: "Frontend",
    },
    {
      category: "backend",
      buttonText: "Backend",
    },
    {
      category: "all",
      buttonText: "All",
    },
  ];

  // Default category
  let activeCategory = "frontend";

  const renderToolsGrid = () => {
    const gridContainer = document.getElementById("tools_wrapper");

    // Ensure gridContainer exists
    if (!gridContainer) return;

    // Clear previous content
    gridContainer.innerHTML = "";
    const filteredTools =
      toolsData.filter((tool) => tool.category === activeCategory)[0]?.tools ||
      [];

    if (!filteredTools) {
      console.error(`No tools found for category: ${activeCategory}`);
      return;
    }
    filteredTools.forEach((tools) => {
      const card = document.createElement("div");
      card.className = "tools_card";
      card.innerHTML = `
        <div class="svg_con">
          ${tools.toolIcon}
        </div>
        <h2>${tools.toolName}</h2>
      `;
      gridContainer.appendChild(card);
      
    });
    ScrollReveal({
      reset: true,
      distance: "3rem",
      duration: 1200,
      easing: "ease-in",
      mobile: true,
      cleanup: true,
      viewFactor: 0.2,
    });

    ScrollReveal().reveal(".tools_card", {
      delay: 100,
      origin: "bottom",
      interval: 150,
    });
  };

  const setUpToolTabs = () => {
    const toolTabsContainer = document.getElementById("tools_nav");
    if (!toolTabsContainer) return;

    toolsTabsData.forEach((tab) => {
      const tabButton = document.createElement("button");
      tabButton.className = "tools_btn";
      tabButton.dataset.tab = `${tab.category}`;
      tabButton.textContent = `${tab.buttonText}`;
      tabButton.dataset.tab === tab.category;
      if (tab.category === activeCategory) {
        tabButton.classList.add("active");
      }
      tabButton.addEventListener("click", () => {
        activeCategory = tab.category;
        document
          .querySelectorAll(".tools_btn")
          .forEach((btn) => btn.classList.remove("active"));
        tabButton.classList.add("active");
        renderToolsGrid();
      });

      toolTabsContainer.appendChild(tabButton);
    });
  };
  setUpToolTabs();
  renderToolsGrid();
}

document.addEventListener("DOMContentLoaded", () => {
  filterTools();
});

if (activeService) {
  showActiveCard(activeService);
}
