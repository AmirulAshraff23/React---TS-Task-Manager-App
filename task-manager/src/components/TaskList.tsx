import React, { useState } from 'react';
import Task from './Task';
import '../styles/App.css';

export interface Subtask {
    id: number;
    title: string;
    isCompleted: boolean;
}

export interface TaskItem {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    subtasks: Subtask[];
}

const TaskList: React.FC<{ tasks: TaskItem[]; setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>> }> = ({ tasks, setTasks }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;

    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const currentTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [updatedTasks, setUpdatedTasks] = useState(tasks);

    const handleAddTask = () => {
        const newTask: TaskItem = {
            id: Date.now(),
            title: newTaskTitle || 'Untitled Task',
            description: newTaskDescription || 'No description',
            isCompleted: false,
            subtasks: [],
        };

        setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to state
        setNewTaskTitle('');
        setNewTaskDescription('');
    };

    const handleEditTask = (taskId: number, newTitle: string, newDescription: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle, description: newDescription } : task
            )
        );
    };

    const handleAddSubtask = (taskId: number, subtaskTitle: string) => {
        const newSubtask: Subtask = { id: Date.now(), title: subtaskTitle, isCompleted: false };

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, subtasks: [...task.subtasks, newSubtask] } : task
            )
        );
    };

    const toggleCompleteTask = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const handleParentTaskComplete = (taskId: number, isCompleted: boolean) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, isCompleted } : task
            )
        );
    };
    
    

    const deleteTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const clearAllTasks = () => {
        setTasks([]); // Clear all tasks by setting tasks to empty array
        setShowWarning(false);
    };

    const handleToggleSubtask = (taskId: number, subtaskId: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          subtasks: task.subtasks.map((subtask) =>
                              subtask.id === subtaskId ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
                          ),
                      }
                    : task
            )
        );
    };

    

    return (
        <div>
            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
                className="form-control mb-3"
            />
            <input
                type="text"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Enter task description"
                className="form-control mb-3"
            />
            <button className="btn btn-primary mb-3" onClick={handleAddTask}>
                Add Task
            </button>
            <button className="btn btn-danger mb-3" onClick={() => setShowWarning(true)}>
                Clear All Tasks
            </button>

            {showWarning && (
                <div className="alert alert-warning">
                    <p>This will delete all tasks! Are you sure?</p>
                    <button className="btn btn-danger" onClick={clearAllTasks}>
                        Yes
                    </button>
                    <button className="btn btn-secondary" onClick={() => setShowWarning(false)}>
                        No
                    </button>
                </div>
            )}

            <div className="task-list">
                {currentTasks.map((task) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        isCompleted={task.isCompleted}
                        subtasks={task.subtasks}
                        onComplete={() => toggleCompleteTask(task.id)}
                        onDelete={() => deleteTask(task.id)}
                        onAddSubtask={(subtaskTitle) => handleAddSubtask(task.id, subtaskTitle)}
                        onToggleSubtask={(subtaskId) => handleToggleSubtask(task.id, subtaskId)}
                        onEditTask={(newTitle, newDescription) => handleEditTask(task.id, newTitle, newDescription)}
                        onParentTaskComplete={(isCompleted) => handleParentTaskComplete(task.id, isCompleted)} 
                    />
                ))}
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
