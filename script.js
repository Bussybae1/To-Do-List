const taskField = document.getElementById('taskText');
const taskDisplay = document.getElementById('taskDisplay');

class Task {
    constructor(description, isCompleted = false) {
        this.description = description; // Use the description argument
        this.isCompleted = isCompleted;
    }

    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }
}

class Todolist {
    constructor() {
        const storedTasks = localStorage.getItem('tasks');
        this.taskArr = storedTasks ? JSON.parse(storedTasks) : [];
    }

    addTask(description) {
        const newTask = new Task(description);
        this.taskArr.push(newTask); // Push the task instance
        localStorage.setItem('tasks', JSON.stringify(this.taskArr)); // Save tasks to localStorage
    }

    removeTask(index) {
        this.taskArr.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(this.taskArr)); // Update localStorage
    }

        displayTask() {
            taskDisplay.innerHTML = ''; // Clear previous content
            this.taskArr.forEach((task, index) => {
                const taskDescriptionStyle = task.isCompleted ? 'text-decoration: line-through; color: gray;' : ''; // Apply style to the description
                taskDisplay.innerHTML += `
                <tr>
                    <td>${index + 1}.</td>
                    <td style="${taskDescriptionStyle}">${task.description}</td> <!-- Apply style to the description -->
                    <td><button type="button" class="btn btn-primary" onclick="toggleCompletion(${index})">
                        ${task.isCompleted ? 'Undo' : 'Complete'}
                    </button></td> 
                    <td><button type="button" class="btn btn-danger" onclick="removeTask(${index})">Remove Task</button></td>
                </tr>`;
            });
        }
        
        
    
}

// Instantiate the Todolist
const myTodoList = new Todolist();

// Helper functions to add and remove tasks
function addTask() {
    const description = taskField.value;
    if (description.trim()) {
        myTodoList.addTask(description);
        taskField.value = ''; // Clear the input field
        myTodoList.displayTask();
    }
}

function removeTask(index) {
    myTodoList.removeTask(index);
    myTodoList.displayTask();
}

function undoTask(index) {
    myTodoList.taskArr[index].toggleCompletion(); // Toggle task completion
    localStorage.setItem('tasks', JSON.stringify(myTodoList.taskArr)); // Update localStorage
    myTodoList.displayTask();
}

function toggleCompletion(index) {
    myTodoList.taskArr[index].toggleCompletion(); // Toggle task completion
    localStorage.setItem('tasks', JSON.stringify(myTodoList.taskArr)); // Update localStorage
    myTodoList.displayTask();
}

// Initial display
myTodoList.displayTask();
