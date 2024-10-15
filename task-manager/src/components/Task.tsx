// Task make box for one job
import React from 'react';

interface TaskProps {
    id: number; // number for job
    title: string; // job name
    description: string; // what job say
}

const Task: React.FC<TaskProps> = ({ title, description }) => { // Destructure title and description correctly
    return (
        <div className="task"> {/* Show job here */}
            <h4>{title}</h4> {/* Show job name */}
            <p>{description}</p> {/* Show job words */}
        </div>
    );
};

export default Task; // Send Task outside for other cavemen to use
