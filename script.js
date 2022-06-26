const taskList = () => {
    const inputTask = document.querySelector('.input-task');
    const btnTask = document.querySelector('.btn-task');
    const tasks = document.querySelector('.tasks');

    const createLi = () => {
        const li = document.createElement('li');
        return li;
    }

    const clearInput = () => {
        inputTask.value = '';
        inputTask.focus();

    }

    document.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            if (!inputTask.value) return;
            addTask(inputTask.value);
        }
    })

    btnTask.addEventListener('click', (e) => {
        if (!inputTask.value) return;
        addTask(inputTask.value);

    })

    const addTask = valueInputTask => {
        const li = createLi();
        li.innerHTML = valueInputTask;
        tasks.appendChild(li);
        clearInput();
        deleteBtn(li);
        saveTask();
    }
     
    const deleteBtn = (li) => {
        li.innerHTML += ' '
        const btn = document.createElement('button');
        btn.innerHTML = 'Apagar';
        btn.setAttribute('class', 'delete');
        li.appendChild(btn);
    }

    document.addEventListener('click', (e) => {
        const el = e.target;
        if (el.classList.contains('delete')) {
            el.parentElement.remove();
            saveTask();
        }
    })

    const saveTask = () => {
        const liTasks = tasks.querySelectorAll('li');
        const taskList = [];

        for (let tasks of liTasks) {
        let taskText = tasks.innerText;
        taskText = taskText.replace('Apagar', ' ').trim();
        taskList.push(taskText);
        }

        const tasksJSON = JSON.stringify(taskList);
        localStorage.setItem('tasks', tasksJSON);
    }

    const addSaveTasks = () => {
        const tasks = localStorage.getItem('tasks');

        const taskList = JSON.parse(tasks);

        for (task of taskList) {
            addTask(task);
        } 
    }
    
    addSaveTasks();
}
taskList();
