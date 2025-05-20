const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const list = document.getElementById("item-list");
const message = document.getElementById("completion-message");

// Load saved items from localStorage
const saved = JSON.parse(localStorage.getItem("shoppingItems") || "[]");
saved.forEach(item => addItem(item.text, item.acquired));

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addItem(input.value);
  input.value = "";
});

// Function to add a new item
function addItem(text, acquired = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const del = document.createElement("button");

  span.textContent = text;
  del.textContent = "❌";

  if (acquired) li.classList.add("acquired");

  span.addEventListener("click", () => {
    li.classList.toggle("acquired");
    saveItems();
    checkCompletion();
  });

  del.addEventListener("click", () => {
    li.remove();
    saveItems();
    checkCompletion();
  });

  li.appendChild(span);
  li.appendChild(del);
  list.appendChild(li);

  saveItems();
  checkCompletion();
}

// Save items to localStorage
function saveItems() {
  const items = [];
  list.querySelectorAll("li").forEach(li => {
    items.push({
      text: li.querySelector("span").textContent,
      acquired: li.classList.contains("acquired")
    });
  });
  localStorage.setItem("shoppingItems", JSON.stringify(items));
}

// Show success message if all items are acquired
function checkCompletion() {
  const total = list.querySelectorAll("li").length;
  const acquired = list.querySelectorAll("li.acquired").length;
  message.classList.toggle("hidden", total === 0 || total !== acquired);
}
const toggleBtn = document.getElementById("toggle-dark");

toggleBtn.addEventListener("click", () => {
document.body.classList.toggle("dark");

const isDark = document.body.classList.contains("dark");
localStorage.setItem("darkMode", isDark ? "on" : "off");
});

window.addEventListener("DOMContentLoaded", () =>{
    if (localStorage.getItem("darkMode") === "on"){
        document.body.classList.add("dark");
    }
});

