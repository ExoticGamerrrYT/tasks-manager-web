function refreshPage() {
	location.reload()
}

function eraseTask(index) {
	var tasksList = JSON.parse(localStorage.getItem('listaTareas')) || []

	if (!isNaN(index) && index >= 0 && index < tasksList.length) {
		tasksList.splice(index, 1)
		localStorage.setItem('listaTareas', JSON.stringify(tasksList))
		showTasksList()
	} else {
		alert('Índice inválido')
	}
}

function addTask() {
	var description = document.getElementById('descripcion').value
	var price = parseFloat(document.getElementById('precio').value)

	if (description && !isNaN(price)) {
		// Create a task object
		var task = { description: description, price: price }

		// Get the list of tasks from the local storage
		var tasksList = JSON.parse(localStorage.getItem('listaTareas')) || []

		// Add the new task to the list
		tasksList.push(task)

		// Save the task list in local storage
		localStorage.setItem('listaTareas', JSON.stringify(tasksList))

		// Update the list in the interface
		showTasksList()
	}
}

function showTasksList() {
	var tasksList = JSON.parse(localStorage.getItem('listaTareas')) || []
	var tasksListElement = document.getElementById('listaTareas')

	// Clear the list before displaying the tasks
	tasksListElement.innerHTML = ''

	// Show each task in the list
	tasksList.forEach(function (task, index) {
		var listItem = document.createElement('li')

		// Create a span for the task content
		var taskContent = document.createElement('span')
		taskContent.textContent =
			task.description + ' - €' + task.price.toFixed(2)

		// Create a trash bin icon
		var trashIcon = document.createElement('span')
		trashIcon.innerHTML = ' 🗑️'
		trashIcon.style.cursor = 'pointer'

		// Add a click event to the trash bin icon to delete the task
		trashIcon.addEventListener('click', function () {
			eraseTask(index)
		})

		// Append task content and trash bin icon to the list item
		listItem.appendChild(taskContent)
		listItem.appendChild(trashIcon)

		// Append the list item to the tasks list element
		tasksListElement.appendChild(listItem)
	})
}

function calculateTotal() {
	var tasksList = JSON.parse(localStorage.getItem('listaTareas')) || []
	var total = tasksList.reduce(function (sum, task) {
		return sum + task.price
	}, 0)

	alert('Total: €' + total.toFixed(2))
}

function eraseAll() {
	localStorage.removeItem('listaTareas')
	showTasksList()
}

// Show tasks list when page opened
showTasksList()
