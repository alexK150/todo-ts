import React, { useState, useCallback } from 'react';

interface InputFormProps {
    onAdd: (title: string) => void; // Уточнение типа для onAdd
}

export const InputForm: React.FC<InputFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

    const onKeyPressHandler = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && title.trim()) {
            onAdd(title.trim());
            setTitle('');
        }
    }, [title, onAdd]);

    return (
        <div className='input-field mt2'>
            <input
                onChange={changeTitle}
                value={title}
                type='text'
                id='title'
                onKeyPress={onKeyPressHandler}
                placeholder='Write new Task'
                aria-label='What I need to do'
            />
            <label htmlFor='title' className='active'>
                What I need to do:
            </label>
        </div>
    );
};
