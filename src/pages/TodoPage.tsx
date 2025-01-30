import React, { useState, useEffect, useCallback } from 'react';
import { InputForm } from '../components/InputForm';
import { TodoList } from '../components/TodoList';
import { ITodo } from '../interfaces';

export const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        try {
            const savedItems = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
            setTodos(savedItems);
        } catch (error) {
            console.error('Failed to load todos from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            console.error('Failed to set todo to localStorage:', error);
        }
    }, [todos]);

    const addTodo = useCallback((title: string) => {
        const newTodo: ITodo = {
            title,
            id: Date.now(),
            completed: false,
        };
        setTodos((prevState) => [newTodo, ...prevState]);
    }, []);

    const toggleHandler = useCallback((id: number) => {
        setTodos((prevState) =>
            prevState.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    const removeHandler = useCallback((id: number) => {
        const shouldRemove = window.confirm('Are you sure you want to delete this item?');
        if (shouldRemove) {
            setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
        }
    }, []);

    return (
        <div className="container">
            <InputForm onAdd={addTodo} />
            <TodoList todos={todos} onToggle={toggleHandler} onRemove={removeHandler} />
        </div>
    );
};
