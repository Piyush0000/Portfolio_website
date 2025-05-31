// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    // Close mobile menu after clicking a link on mobile devices (if open) ✅ Added this block of code here (new)
    const navLinks = document.querySelector(".nav-links");
    if (navLinks.classList.contains("nav-active")) {
      navLinks.classList.remove("nav-active");
    }
  });
});

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  // Create mobile menu button
  const nav = document.querySelector("nav");
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.className = "mobile-menu-btn";
  mobileMenuBtn.innerHTML = "☰";
  mobileMenuBtn.setAttribute("aria-label", "Toggle navigation menu");

  // Insert button after logo
  const logo = document.querySelector(".logo");
  logo.parentNode.insertBefore(mobileMenuBtn, logo.nextSibling);

  // Toggle menu visibility on button click
  mobileMenuBtn.addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("nav-active");

    // Change button symbol when menu is open
    if (navLinks.classList.contains("nav-active")) {
      mobileMenuBtn.innerHTML = "✖";
    } else {
      mobileMenuBtn.innerHTML = "☰";
    }
  });

  // Create shooting stars
  const body = document.body;
  for (let i = 0; i < 4; i++) {
    const star = document.createElement("div");
    star.className = "shooting-star";
    body.appendChild(star);
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const navLinks = document.querySelector(".nav-links");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  if (
    navLinks.classList.contains("nav-active") &&
    !navLinks.contains(e.target) &&
    e.target !== mobileMenuBtn
  ) {
    navLinks.classList.remove("nav-active");
    mobileMenuBtn.innerHTML = "☰";
  }
});

// Add scroll event listener for section animations
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
      section.classList.add("visible");
    }
  });
});

document
  .getElementById("contactForm") // ✅ Corrected here (singular)
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbwgsTpqRtfptGGnt8Ms1kfbhpQaIW4L0inzPnB-M3_k5ZCYjWZNt9zv8qiuEuo9mcME/exec",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.text())
      .then((data) => {
        console.log("Server response:", data); // ✅ Logs response to console
        alert("Message sent successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send message. Check console for errors.");
      });
  });
