// Get references to DOM elements
const inventoryForm = document.getElementById("inventory-form");
const itemNameInput = document.getElementById("item-name");
const itemQuantityInput = document.getElementById("item-quantity");
const inventoryList = document.getElementById("inventory-list");

// Load inventory data from localStorage
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// Function to display inventory items
function displayInventory() {
  inventoryList.innerHTML = "";
  inventory.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - Quantity: ${item.quantity}
      <button class="delete-btn" onclick="removeItem(${index})">Remove</button>
    `;
    inventoryList.appendChild(li);
  });
}

// Add new item to inventory
function addItem(e) {
  e.preventDefault();
  
  const itemName = itemNameInput.value.trim();
  const itemQuantity = parseInt(itemQuantityInput.value);
  
  if (itemName && itemQuantity > 0) {
    inventory.push({ name: itemName, quantity: itemQuantity });
    localStorage.setItem("inventory", JSON.stringify(inventory));
    displayInventory();
    inventoryForm.reset();
  } else {
    alert("Please enter a valid item name and quantity.");
  }
}

// Remove item from inventory
function removeItem(index) {
  inventory.splice(index, 1);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  displayInventory();
}

// Event listener for form submission
inventoryForm.addEventListener("submit", addItem);

// Initial display of inventory items
displayInventory();
