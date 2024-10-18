import React, { useState, useEffect } from 'react';

import { Subtask } from './TaskList';

interface TaskProps {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    subtasks: Subtask[];
    onComplete: () => void;
    onDelete: () => void;
    onAddSubtask: (subtaskTitle: string) => void;
    onToggleSubtask: (subtaskId: number) => void;
    onEditTask: (newTitle: string, newDescription: string) => void; // Add this for editing
    onParentTaskComplete: (isCompleted: boolean) => void; // New prop to handle parent completion
}

const Task: React.FC<TaskProps> = ({
    id,
    title,
    description,
    isCompleted,
    subtasks,
    onComplete,
    onDelete,
    onAddSubtask,
    onToggleSubtask,
    onEditTask,
    onParentTaskComplete, // Use new prop
}) => {
    const [subtaskInputVisible, setSubtaskInputVisible] = useState(false);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleAddSubtask = () => {
        if (newSubtaskTitle.trim()) {
            onAddSubtask(newSubtaskTitle);
            setNewSubtaskTitle('');
            setSubtaskInputVisible(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        onEditTask(editedTitle, editedDescription);
        setIsEditing(false);
    };

    const handleSubtaskToggle = (subtaskId: number) => {
        onToggleSubtask(subtaskId);
        
        // Check if all subtasks are completed
        const allSubtasksCompleted = subtasks.every((subtask) => subtask.isCompleted);
        onParentTaskComplete(allSubtasksCompleted); // Update parent task completion
    };
    

    return (
        <div className={`task ${isCompleted ? 'completed-task' : ''}`}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        placeholder="Edit title"
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Edit description"
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                </div>
            ) : (
                <>
                    <div className="task-text">
                        <h4>{title}</h4>
                        <p>{description}</p>
                    </div>
                    <button className="task-edit" onClick={handleEdit}>Edit</button>
                    <input
                        type="checkbox"
                        className="task-checkbox"
                        checked={isCompleted}
                        onChange={onComplete}
                    />
                    {isCompleted && <p className="complete-text">Complete</p>}
                    <button className="task-delete" onClick={onDelete}>X</button>
                </>
            )}

            {subtaskInputVisible && (
                <div>
                    <input
                        type="text"
                        value={newSubtaskTitle}
                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        placeholder="Enter subtask title"
                    />
                    <button onClick={handleAddSubtask}>Add Subtask</button>
                </div>
            )}

            <button className="task-add-subtask" onClick={() => setSubtaskInputVisible(true)}>+</button>

            {subtasks.length > 0 && (
                <div className="subtasks mt-3">
                    <h5>Subtasks:</h5>
                    {subtasks.map(subtask => (
                        <div
                            key={subtask.id}
                            className={`subtask d-flex align-items-center mb-2 ${subtask.isCompleted ? 'completed-subtask' : ''}`}
                        >
                            <span className={`subtask-title ${subtask.isCompleted ? 'text-decoration-line-through' : ''}`}>
                                {subtask.title}
                            </span>
                            <input
                                type="checkbox"
                                className="ms-2"
                                checked={subtask.isCompleted}
                                onChange={() => handleSubtaskToggle(subtask.id)}
                            />
                            {subtask.isCompleted && <p className="done-text ms-2 mb-0">Done</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Task;
