import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { TodoType } from '../types';
import { useState } from 'react';


interface TodoProps{
    todos:TodoType
    deleteTodo:(id:string)=>void
    toggleComplete:(todo:TodoType)=>void
    updateTodo: (id: string, newText: string) => void;
}

const Todo = ({todos,deleteTodo,toggleComplete,updateTodo}:TodoProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todos.text || '');

    const handleEdit = () => {
        setIsEditing(true);
        setEditedText(todos.text || '');
    };

    const handleSaveEdit = () => {
        updateTodo(todos.id, editedText);
        setIsEditing(false);
    };

    return (
        <li className="p-2 bg-purple-300 my-2 rounded-md up shadow-sm">
            <div className='flex items-center justify-between'>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                ) : (
                    <p
                        className={todos.completed ? "text-gray-700 cursor-pointer line-through opacity-20" : "text-gray-700 cursor-pointer"}
                        onClick={() => toggleComplete(todos)}>
                        {todos.text}
                    </p>
                )}
                <div className='flex gap-3'>
                    {isEditing ? (
                        <button onClick={handleSaveEdit}>
                            <CheckIcon />
                        </button>
                    ) : (
                        <button onClick={handleEdit}>
                            <EditIcon />
                        </button>
                    )}
                    <button onClick={() => deleteTodo(todos.id)}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default Todo;