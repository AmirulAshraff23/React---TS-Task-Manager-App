import React from 'react';
import { Subtask } from './TaskList';

interface TaskProps {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    subtasks: Subtask[];
    onComplete: () => void;
    onDelete: () => void;
    onAddSubtask: () => void;
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
    return (
        <div className={`task ${isCompleted ? 'completed-task' : ''}`}>
            <div className="task-text">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>

            <input
                type="checkbox"
                checked={isCompleted}
                onChange={onComplete}
            />

            <button className="task-delete" onClick={onDelete}>X</button>

            <button className="task-add-subtask" onClick={onAddSubtask}>+</button>

            {subtasks.length > 0 && (
                <div className="subtasks">
                    <h5>Subtasks:</h5>
                    {subtasks.map(subtask => (
                        <div key={subtask.id} className={`subtask ${subtask.isCompleted ? 'completed-subtask' : ''}`}>
                            <span>{subtask.title}</span>
                            <input
                                type="checkbox"
                                checked={subtask.isCompleted}
                                onChange={() => {/* Handle subtask completion */}}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Task;
