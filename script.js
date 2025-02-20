// Mobile Menu Toggle (Event Listener 1: Click)
const menuBtn = document.getElementById("menuBtn")
const navMenu = document.getElementById("navMenu")

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav")) {
    navMenu.classList.remove("active")
  }
})

// Skill Card Interactions (Event Listeners 2 & 3: Mouseover/Mouseout)
function showDetail(card) {
  const detail = card.querySelector(".detail")
  detail.style.display = "block"
}

function hideDetail(card) {
  const detail = card.querySelector(".detail")
  detail.style.display = "none"
}

// Project Modal
const modal = document.getElementById("projectModal")
const projectDetails = {
  1: {
    title: "Personal Portfolio Website",
    description: "Created a simple portfolio website to showcase my learning progress, projects, and skills. Built using HTML, CSS, and JavaScript, the site features a responsive design, an interactive navigation bar, and smooth animations.",
    tech: "HTML, CSS, JavaScript",
  },
  2: {
    title: "Event Handlers Demo",
    description: "Demonstration of various JavaScript event handlers. Built a project using JavaScript event listeners to handle clicks, keyboard inputs, and form submissions, enhancing my understanding of user interactions.",
    tech: "HTML, CSS, JavaScript",
  },
  3: {
    title: "Regular Expressions",
    description: "This project uses Regular Expressions (Regex) to extract structured data from unstructured text. It scans web pages and extracts emails, URLs, phone numbers, credit card numbers, time formats, HTML tags, hashtags, and currency amounts.",
    tech: "Python",
  },
  4: {
    title: "Google Meet",
    description: "Designed a user-friendly video conferencing interface similar to Google Meet, allowing users to join meetings, manage microphone/camera permissions, and interact with participants. The interface includes a clean layout, clear call-to-action buttons, and real-time status updates.",
    tech: "HTML, CSS, Bootstrap",
  },

}

function showProject(id) {
  const project = projectDetails[id]
  document.getElementById("modalContent").innerHTML = `
        <div class="modal-header">
            <h3>${project.title}</h3>
        </div>
        <div class="modal-body">
            <p style="margin: 1rem 0">${project.description}</p>
            <div class="project-tech" style="margin-top: 1rem">
                <strong>Technologies:</strong>
                <div class="tech-tags" style="margin-top: 0.5rem">
                    ${project.tech
                      .split(", ")
                      .map(
                        (tech) =>
                          `<span style="display: inline-block; background: var(--background); padding: 0.25rem 0.75rem; border-radius: 15px; margin: 0.25rem; font-size: 0.875rem;">${tech}</span>`,
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `
  modal.style.display = "block"
  document.body.style.overflow = "hidden" // Prevent background scrolling
}

function closeModal() {
  modal.style.display = "none"
  document.body.style.overflow = "" // Restore scrolling
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal()
  }
})

window.onclick = (e) => {
  if (e.target === modal) closeModal()
}

// Form Validation (Event Listener 4: Input)
function validateField(fieldId) {
  const field = document.getElementById(fieldId)
  const error = document.getElementById(fieldId + "Error")
  let isValid = true

  switch (fieldId) {
    case "name":
      isValid = field.value.length >= 2
      error.textContent = isValid ? "" : "Name must be at least 2 characters"
      break
    case "email":
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
      error.textContent = isValid ? "" : "Please enter a valid email"
      break
    case "message":
      isValid = field.value.length >= 10
      error.textContent = isValid ? "" : "Message must be at least 10 characters"
      break
  }

  field.style.borderColor = isValid ? "#ddd" : "red"
  return isValid
}

// Form Submission (Event Listener 5: Submit)
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const isNameValid = validateField("name")
  const isEmailValid = validateField("email")
  const isMessageValid = validateField("message")

  if (isNameValid && isEmailValid && isMessageValid) {
    alert("Message sent successfully!")
    e.target.reset()
    document.querySelectorAll("input, textarea").forEach((field) => {
      field.style.borderColor = "#ddd"
    })
  }
})

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const section = document.querySelector(link.getAttribute("href"))
    section.scrollIntoView({ behavior: "smooth" })
    navMenu.classList.remove("active")
  })
})

// Scroll-based navigation highlighting
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav")
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  // Change navbar background on scroll
  if (window.scrollY > 50) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }

  // Highlight current section in navigation
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Close mobile menu if open
      document.getElementById("navMenu").classList.remove("active")
    }
  })
})
