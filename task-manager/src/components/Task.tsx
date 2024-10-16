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
}) => {

    const [subtaskInputVisible, setSubtaskInputVisible] = useState(false);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

    const handleAddSubtaskInput = () => {
        setSubtaskInputVisible(true); // Show input field when adding subtask
    };

    const handleAddSubtask = () => {
        if (newSubtaskTitle.trim()) { // Check if the title is not empty
            onAddSubtask(newSubtaskTitle); // Send the title to parent when input done
            setNewSubtaskTitle(''); // Clear input
            setSubtaskInputVisible(false); // Hide input field after done
        }
    };


    return (
        <div className={`task ${isCompleted ? 'completed-task' : ''}`}>
            <div className="task-text">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>



            <input
                type="checkbox"
                className="task-checkbox"
                checked={isCompleted}
                onChange={onComplete}
            />
            {isCompleted && <p className="complete-text">Complete</p>}

            <button className="task-delete" onClick={onDelete}>X</button>

            {/* <button className="task-add-subtask" onClick={onAddSubtask}>+</button> */}


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

            {/* Button to add subtask */}
            <button className="task-add-subtask" onClick={handleAddSubtaskInput}>+</button>

            {/* Subtask rendering */}
            {subtasks.length > 0 && (
                <div className="subtasks">
                    <h5>Subtasks:</h5>
                    {subtasks.map(subtask => (
                        <div key={subtask.id} className={`subtask ${subtask.isCompleted ? 'completed-subtask' : ''}`}>
                            <span>{subtask.title}</span>
                            <input
                                type="checkbox"
                                className="task-checkbox"
                                checked={subtask.isCompleted}
                                onChange={() => {/* Handle subtask completion */ }}
                            />
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Task;
