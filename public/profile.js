// profile.js

const profile = document.getElementById("profile");
const fullNameEl = document.getElementById("full-name");
const profileDetailsEl = document.getElementById("profile-details");
const profileImageEl = document.getElementById("profile-image");

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  const fullName = user.name || "Unknown User";
  const email = user.email || "N/A";
  const phone = user.phone || "N/A";

  fullNameEl.textContent = fullName;
  profileDetailsEl.textContent = `Email: ${email}, Phone: ${phone}`;

  // Set first letter avatar
  const firstLetter = fullName.charAt(0).toUpperCase();
  profileImageEl.textContent = firstLetter;

  // Style it as a circle avatar with letter
  profileImageEl.style.width = "80px";
  profileImageEl.style.height = "80px";
  profileImageEl.style.borderRadius = "50%";
  profileImageEl.style.backgroundColor = "#4a90e2";
  profileImageEl.style.color = "#fff";
  profileImageEl.style.display = "flex";
  profileImageEl.style.alignItems = "center";
  profileImageEl.style.justifyContent = "center";
  profileImageEl.style.fontSize = "32px";
  profileImageEl.style.fontWeight = "bold";
} else {
  fullNameEl.textContent = "Not logged in";
  profileDetailsEl.textContent = "";
}
