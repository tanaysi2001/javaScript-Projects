
let tasks = [];

//function for updating the statistics of progress bar
//we must call this function after deleteing,adding,and updating the tasks
const updateStats=()=>{
  const completedTasks=tasks.filter((task)=>task.completed).length

  const totalTasks=tasks.length;
  const progress=(completedTasks/totalTasks)*100;

  //updating the progress bar based on the completed tasks

  const progressBar=document.getElementById("progress");
  progressBar.style.width=progress+"%";//updating the width

  //changing the numbers
  const numbers=document.getElementById("numbers");
  numbers.innerHTML=`${completedTasks}/${totalTasks}`;
  
}
//function to create delete task
const deleteTask=(index)=>{
tasks.splice(index,1)//telling that at the current given index remove one item
updateTaskList();

updateStats();
}

//function for editing the task

const editTask=(index)=>{
let taskInput=document.getElementById("taskInput");
taskInput.value=tasks[index].text;//here the value inside the object will be passed to input field value
// tasks[index].text=taskInput.value;
//when we click on the task value is updated in the input field and we have to delete the task

tasks.splice(index,1);
updateTaskList();

updateStats();


}

//function for toggling task

const toggleTaskComplete=(index)=>{
tasks[index].completed=!tasks[index].completed;
updateTaskList();
// console.log(tasks)

updateStats();
}

//function for updating the task
const updateTaskList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<div class="taskItem" >
                            <div class="task ${task.completed ? "completed" : ''}" >
                                <input type="checkbox" class="checkbox" ${task.completed?'checked':''}>
                                <p>${task.text}</p>
                            </div>

                            <div class="icons">
                                <img src="images/edit.png" alt="edit" onclick="editTask(${index})"  class="invert">
                                <img src="images/bin.png" alt="delete" onclick="deleteTask(${index}) " class="invert">
                            </div>
                        </div>`;

    listItem.addEventListener("change", () => toggleTaskComplete(index))
    taskList.append(listItem);
  });
};

//adding the task
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    console.log(tasks);
    taskInput.value = "";

    updateTaskList();
    updateStats();
  }
};


//starting of the function
document.getElementById("newTask").addEventListener("click", (e) => {
  e.preventDefault();

  addTask();
});
