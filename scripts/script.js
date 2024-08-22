let recipe = {}
let availableIngredients = document.getElementById("availableIngredients")
let resultDiv = document.getElementById("result")
let recipeListDiv = document.getElementById("recipeList")
let ingredientNameInput = document.getElementById("ingredientName")
let ingredientAmountInput = document.getElementById("ingredientAmount")
let availableAmountInput = document.getElementById("availableAmount")
let ingredientAmountError = document.getElementById("ingredientAmountError")
let availableAmountError = document.getElementById("availableAmountError")
let errorModal = document.getElementById("errorModal")
let modalMessage = document.getElementById("modalMessage")

let editModal = document.getElementById("editModal")
let editIngredientNameInput = document.getElementById("editIngredientName")
let editIngredientAmountInput = document.getElementById("editIngredientAmount")
let deleteModal = document.getElementById("deleteModal")
let deleteMessage = document.getElementById("deleteMessage")
let ingredientToEdit, ingredientToDelete

function addIngredient() {
	let name = ingredientNameInput.value.trim()
	let amount = parseInt(ingredientAmountInput.value.trim(), 10)
	let unit = document.getElementById("ingredientUnit").value

	// Reset error messages
	ingredientAmountError.textContent = ""

	if (name && !isNaN(amount) && amount > 0) {
		recipe[name] = { amount: amount, unit: unit }
		updateRecipeList()
		clearInputs()
		calculate() // Recalculate after adding a new ingredient
	} else {
		showModal("Please enter a valid ingredient name and positive integer amount.")
	}
}

function updateRecipeList() {
	let recipeHtml = ""
	for (let name in recipe) {
		recipeHtml += `
            <div class="recipe-item">
                <p><span>${recipe[name].amount}${recipe[name].unit}</span><span>${name.charAt(0).toUpperCase() + name.slice(1)}</span></p>
                <button onclick="editIngredient('${name}')">Edit</button>
                <button onclick="promptDelete('${name}')">Delete</button>
            </div>
        `
	}
	recipeListDiv.innerHTML = recipeHtml
	adjustAvailableIngredientsHeight()
	updateAvailableIngredients()
}

function adjustAvailableIngredientsHeight() {
	let itemCount = Object.keys(recipe).length
	availableIngredients.style.height = itemCount > 5 ? "200px" : "auto"
}

function updateAvailableIngredients() {
	let selectedValue = availableIngredients.value // Preserve selected value
	availableIngredients.innerHTML = ""
	for (let name in recipe) {
		let option = document.createElement("option")
		option.value = name.charAt(0).toUpperCase() + name.slice(1)
		option.textContent = name.charAt(0).toUpperCase() + name.slice(1)
		availableIngredients.appendChild(option)
	}
	if (recipe[selectedValue]) {
		availableIngredients.value = selectedValue // Restore selected value
	} else {
		availableIngredients.value = "" // Clear selection if the previous selection is removed
	}
	if (!availableIngredients.value) {
		calculate() // Reset calculation if no ingredient is selected
	}
}

function editIngredient(name) {
	ingredientToEdit = name
	editIngredientNameInput.value = name
	editIngredientAmountInput.value = recipe[name].amount
	editModal.style.display = "block"
}

function modifyIngredient() {
	let name = editIngredientNameInput.value.trim()
	let amount = parseInt(editIngredientAmountInput.value.trim(), 10)

	if (name && !isNaN(amount) && amount > 0) {
		// Update the recipe object
		recipe[name] = { amount: amount, unit: recipe[ingredientToEdit].unit }
		if (name !== ingredientToEdit) {
			// Delete the old ingredient entry if the name has changed
			delete recipe[ingredientToEdit]
		}
		updateRecipeList()
		closeEditModal()
		calculate() // Recalculate after modifying an ingredient
	} else {
		showModal("Please enter a valid ingredient name and positive integer amount.")
	}
}

function promptDelete(name) {
	ingredientToDelete = name
	deleteMessage.textContent = `Are you sure you want to delete "${name}"?`
	deleteModal.style.display = "block"
}

function confirmDelete() {
	let wasSelected = availableIngredients.value === ingredientToDelete
	delete recipe[ingredientToDelete]
	updateRecipeList()
	closeDeleteModal()
	if (wasSelected) {
		// Clear calculation and prompt user if the selected ingredient was deleted
		availableIngredients.value = ""
		calculate() // Clear results
		showModal("The selected ingredient was removed.\nPlease choose a new ingredient.")
	} else {
		calculate() // Recalculate after deleting an ingredient
	}
}

function clearInputs() {
	ingredientNameInput.value = ""
	ingredientAmountInput.value = ""
	document.getElementById("multiIngredientInput").value = ""
}

function ResetBtn() {
	window.location.assign(location.href)
}

function showModal(message) {
	modalMessage.textContent = message
	errorModal.style.display = "block"
}

function closeModal() {
	errorModal.style.display = "none"
}

function closeEditModal() {
	editModal.style.display = "none"
}

function closeDeleteModal() {
	deleteModal.style.display = "none"
}

function calculate() {
	let selectedIngredient = availableIngredients.value
	let selectedAmount = parseInt(availableAmountInput.value.trim(), 10)

	// Reset error messages
	availableAmountError.textContent = ""

	if (!selectedIngredient) {
		resultDiv.innerHTML = "" // Clear result if no ingredient is selected
		return
	}
	if (isNaN(selectedAmount) || selectedAmount <= 0) {
		availableAmountError.textContent = "Please enter a valid positive integer amount for available ingredients."
		return
	}

	let scale = selectedAmount / recipe[selectedIngredient].amount
	let resultHtml = "<h3>Adjusted Recipe:</h3>"
	for (let name in recipe) {
		let newAmount = recipe[name].amount * scale
		resultHtml += `${name.charAt(0).toUpperCase() + name.slice(1)}: ${newAmount.toFixed(2)} ${recipe[name].unit}<br>`
	}
	resultDiv.innerHTML = resultHtml
}

// Event listeners for changes
availableIngredients.addEventListener("change", calculate)
availableAmountInput.addEventListener("input", calculate)

function addMultipleIngredients() {
	let inputText = document.getElementById("multiIngredientInput").value.trim()
	let lines = inputText.split("\n")

	// Reset error messages
	ingredientAmountError.textContent = ""

	lines.forEach((line) => {
		let parts = line.split(/\s+/) // Split by whitespace
		if (parts.length < 2) {
			showModal("Each line must have at least an amount and an ingredient.")
			return
		}

		let amountPart = parts[0]
		let unit = amountPart.match(/[a-zA-Z]+/g)?.[0] || ""
		let amount = parseFloat(amountPart) || 0
		let name = parts.slice(1).join(" ")

		if (amount && amount > 0 && name) {
			recipe[name] = { amount: amount, unit: unit }
		} else {
			showModal(`Invalid format for line: ${line}`)
		}
	})

	updateRecipeList()
	clearInputs()
	calculate() // Recalculate after adding multiple ingredients
}
