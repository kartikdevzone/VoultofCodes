document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const tasksUl = document.getElementById('tasks');
    const deleteAllButton = document.getElementById('delete-all');
    const completeButton = document.getElementById('complete');
    const incompleteButton = document.getElementById('incomplete');
    const datetimeDisplay = document.getElementById('datetime');

    addTaskButton.addEventListener('click', () => {
        if (newTaskInput.value.trim() !== '') {
            addTask(newTaskInput.value.trim());
            newTaskInput.value = '';
        }
    });

    deleteAllButton.addEventListener('click', () => {
        tasksUl.innerHTML = '';
    });

    completeButton.addEventListener('click', () => {
        filterTasks(true);
    });

    incompleteButton.addEventListener('click', () => {
        filterTasks(false);
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.classList.add('complete-checkbox');
        completeCheckbox.addEventListener('change', () => {
            li.classList.toggle('completed', completeCheckbox.checked);
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = '✎';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editTask(li));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✗';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => li.remove());

        li.insertBefore(completeCheckbox, li.firstChild);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        tasksUl.appendChild(li);
    }

    function editTask(li) {
        const newTaskText = prompt('Edit your task:', li.childNodes[1].textContent);
        if (newTaskText) {
            li.childNodes[1].textContent = newTaskText;
        }
    }

    function filterTasks(showCompleted) {
        const tasks = tasksUl.children;
        for (let task of tasks) {
            if (showCompleted) {
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
            } else {
                task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
            }
        }
    }

    function updateDateTime() {
        const now = new Date();
        datetimeDisplay.textContent = now.toLocaleString();
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();
});
