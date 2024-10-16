import React, { useState } from 'react';
import Task from './Task';
import '../styles/App.css';

export interface Subtask {
    id: number;
    title: string;
    isCompleted: boolean;
}

interface TaskItem {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    subtasks: Subtask[];
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [parentTaskId, setParentTaskId] = useState<number | null>(null);

    const handleAddTask = () => {
        const newTask: TaskItem = {
            id: Date.now(),
            title: newTaskTitle || 'Untitled Task', // Fallback for task title
            description: newTaskDescription || 'No description',
            isCompleted: false,
            subtasks: [],
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setNewTaskTitle('');
        setNewTaskDescription('');
    };

    const handleAddSubtask = (taskId: number) => {
        const subtaskTitle = prompt("Enter subtask name:");
        if (subtaskTitle) {
            const newSubtask: Subtask = { id: Date.now(), title: subtaskTitle, isCompleted: false };
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId
                        ? { ...task, subtasks: [...task.subtasks, newSubtask] }
                        : task
                )
            );
        }
    };

    const toggleCompleteTask = (id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const deleteTask = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const clearAllTasks = () => {
        setTasks([]);
        setShowWarning(false);
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

            <button className="btn btn-primary mb-3" onClick={handleAddTask}>Add Task</button>

            <button className="btn btn-danger mb-3" onClick={() => setShowWarning(true)}>Clear All Tasks</button>

            {showWarning && (
                <div className="alert alert-warning">
                    <p>This will delete all tasks! Are you sure?</p>
                    <button className="btn btn-danger" onClick={clearAllTasks}>Yes</button>
                    <button className="btn btn-secondary" onClick={() => setShowWarning(false)}>No</button>
                </div>
            )}

            <div className="task-list">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        isCompleted={task.isCompleted}
                        subtasks={task.subtasks}
                        onComplete={() => toggleCompleteTask(task.id)}
                        onDelete={() => deleteTask(task.id)}
                        onAddSubtask={() => handleAddSubtask(task.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
