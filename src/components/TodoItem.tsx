import React, { useCallback } from 'react';
import { ITodo } from '../interfaces';

type TodoProps = {
    todo: ITodo;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
};

export const Todo: React.FC<TodoProps> = ({ todo, onToggle, onRemove }) => {
    const todoClasses = `todo ${todo.completed ? 'completed' : ''}`;

    const removeHandler = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        try {
            onRemove(todo.id);
        } catch (error) {
            console.error('Failed to remove todo:', error);
        }
    }, [onRemove, todo.id]);

    const toggleHandler = useCallback(() => {
        try {
            onToggle(todo.id);
        } catch (error) {
            console.error('Failed to check todo:', error);
        }
    }, [onToggle, todo.id]);

    return (
        <li className={todoClasses}>
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={toggleHandler}
                    aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                />
                <span>{todo.title}</span>
                <button
                    className="waves-effect blue lighten-1 btn"
                    onClick={removeHandler}
                    aria-label="Delete todo"
                >
                    delete
                </button>
            </label>
        </li>
    );
};
