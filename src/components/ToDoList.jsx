import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      if (isEditing) {
        const updatedTasks = [...tasks];
        updatedTasks[currentTaskIndex].text = newTask;
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
      } else {
        setTasks([...tasks, { text: newTask, done: false }]);
      }
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  }

  function toggleDone(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    updatedTasks.sort((a, b) => a.done - b.done);
    setTasks(updatedTasks);
  }

  function editTask(index) {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setNewTask(tasks[index].text);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          {isEditing ? "Edit Task" : <i className="fas fa-plus"></i>}
        </button>
      </div>

      <p>To-do List:</p>

      <ol>
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? 'done' : ''}>
            <div className="task-container">
              <button className="done-button" onClick={() => toggleDone(index)}>
                <i className="fas fa-check"></i>
              </button>
              <span className="text">{task.text}</span>
            </div>

            <div className="button-container">
              <button className="edit-button" onClick={() => editTask(index)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="delete-button" onClick={() => deleteTask(index)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
