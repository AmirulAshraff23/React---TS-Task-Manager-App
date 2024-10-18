import React, { useState } from 'react';
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
    onEditTask: (newTitle: string, newDescription: string) => void;
    onParentTaskComplete: (isCompleted: boolean) => void;
}

const Task: React.FC<TaskProps> = ({
    title,
    description,
    isCompleted,
    subtasks,
    onComplete,
    onDelete,
    onAddSubtask,
    onToggleSubtask,
    onEditTask,
    onParentTaskComplete
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

    const handleEdit = () => setIsEditing(true);

    const handleSaveEdit = () => {
        onEditTask(editedTitle, editedDescription);
        setIsEditing(false);
    };

    const handleSubtaskToggle = (subtaskId: number) => {
        onToggleSubtask(subtaskId);
        const allSubtasksCompleted = subtasks.every((subtask) => subtask.isCompleted);
        onParentTaskComplete(allSubtasksCompleted);
    };

    return (
        <div className={`task ${isCompleted ? 'completed-task' : ''}`}>
            {isEditing ? (
                <div className="edit-section">
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        placeholder="Edit title"
                    />
                    <textarea
                        className="form-control mb-2"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Edit description"
                    />
                    <button className="btn btn-primary" onClick={handleSaveEdit}>Save</button>
                </div>
            ) : (
                <>
                    <div className="task-text">
                        <input
                            type="checkbox"
                            className="task-checkbox me-2"
                            checked={isCompleted}
                            onChange={onComplete}
                        />
                        <h4 className="task-title">{title}</h4>
                        <p className="task-description">{description}</p>
                    </div>

                    {isCompleted && <p className="complete-text">Complete</p>}

                    <div className="btn-group task-actions">
                        <button className="btn btn-outline-primary task-add-subtask " onClick={() => setSubtaskInputVisible(true)}>New Subtask</button>
                        <button className="btn btn-outline-primary" onClick={handleEdit}>Edit</button>
                        <button className="btn btn-outline-danger" onClick={onDelete}>Delete</button>
                    </div>

                </>
            )}

            {subtaskInputVisible && (
                <div className="add-subtask">
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={newSubtaskTitle}
                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        placeholder="Enter subtask title"
                    />
                    <button className="btn btn-primary" onClick={handleAddSubtask}>Add</button>
                </div>
            )}

            {/* <button className="btn btn-outline-primary task-add-subtask mt-3" onClick={() => setSubtaskInputVisible(true)}>New Subtask</button> */}

            <br />
            {subtasks.length > 0 && (

                <div className="subtasks mt-3">
                    {subtasks.map(subtask => (
                        <div
                            key={subtask.id}
                            className={`subtask d-flex align-items-center mb-2 ${subtask.isCompleted ? 'completed-subtask' : ''}`}
                        ><br />
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
