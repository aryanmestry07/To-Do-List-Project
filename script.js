let tasks = [];

    function addTask() {
  const taskInput = document.getElementById("task");
  const taskValue = taskInput.value.trim();

  const wordCount = taskValue.split(/\s+/).filter(word => word.length > 0).length;

  if (wordCount > 30) {
    alert("Please limit your task to 30 words or fewer.");
    return;
  }

  if (taskValue !== "") {
    tasks.push({ text: taskValue, completed: false });
    taskInput.value = "";
    saveTasks(); // Save to localStorage
    renderTasks();
  }  
}


    function renderTasks() {
      const outputDiv = document.getElementById("output");
      outputDiv.innerHTML = ""; // Clear previous content

      tasks.forEach((task, index) => {
        const taskContainer = document.createElement("li");
        taskContainer.className = "task-container";

        const taskText = document.createElement("span");
        taskText.innerHTML = task.completed ? `<del>${task.text}</del>` : task.text;
        if (task.completed) {
          taskContainer.classList.add("completed");
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.setAttribute("aria-label", task.completed ? "Undo task completion" : "Mark task as complete");
        completeBtn.onclick = function () {
          tasks[index].completed = !tasks[index].completed;
          saveTasks(); // Save after status change
          renderTasks();
        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.setAttribute("aria-label", "Edit task");
        editBtn.onclick = function () {
          taskContainer.innerHTML = ""; // Clear current

          const editInput = document.createElement("input");
          editInput.type = "text";
          editInput.value = task.text;

          const saveBtn = document.createElement("button");
          saveBtn.textContent = "Save";
          saveBtn.onclick = function () {
            const updatedText = editInput.value.trim();
            if (updatedText !== "") {
              tasks[index].text = updatedText;
              saveTasks(); // Save after editing
              renderTasks();
            }
          };

          taskContainer.appendChild(editInput);
          taskContainer.appendChild(saveBtn);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute("aria-label", "Delete task");
        deleteBtn.onclick = function () {
          tasks.splice(index, 1);
          saveTasks(); // Save after deletion
          renderTasks();
        };

        taskContainer.appendChild(taskText);
        taskContainer.appendChild(completeBtn);
        taskContainer.appendChild(editBtn);
        taskContainer.appendChild(deleteBtn);
        outputDiv.appendChild(taskContainer);
      });
    }
// Save Function
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
      
      function loadTasks() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          tasks = JSON.parse(storedTasks);
          renderTasks();
        }
      }
    

// Load tasks when the page loads
window.onload = loadTasks;
