import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled, { keyframes } from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { plus } from '../../utils/Icons';
import AnimatedSelect from '../AnimatedSelect/AnimatedSelect';

const EXPENSE_CATEGORIES = [
    { value: 'education',     label: '📚 Education' },
    { value: 'groceries',     label: '🛒 Groceries' },
    { value: 'health',        label: '❤️ Health' },
    { value: 'subscriptions', label: '📺 Subscriptions' },
    { value: 'takeaways',     label: '🍔 Takeaways' },
    { value: 'clothing',      label: '👗 Clothing' },
    { value: 'travelling',    label: '✈️ Travelling' },
    { value: 'other',         label: '🔖 Other' },
]

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '', amount: '', date: '', category: '', description: '',
    })
    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        setInputState({ title: '', amount: '', date: '', category: '', description: '' })
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <div className="form-error">⚠ {error}</div>}
            <div className="form-title"><span className="form-icon">📉</span><span>Add Expense</span></div>

            <div className="input-control">
                <label>Title</label>
                <input type="text" value={title} name="title" placeholder="e.g. Netflix Subscription" onChange={handleInput('title')} />
            </div>
            <div className="input-control">
                <label>Amount ($)</label>
                <input type="text" value={amount} name="amount" placeholder="e.g. 15" onChange={handleInput('amount')} />
            </div>
            <div className="input-control">
                <label>Date</label>
                <DatePicker id="date" placeholderText="Pick a date" selected={date} dateFormat="dd/MM/yyyy"
                    onChange={(date) => setInputState({ ...inputState, date })} />
            </div>
            <div className="input-control">
                <label>Category</label>
                <AnimatedSelect
                    value={category}
                    onChange={handleInput('category')}
                    options={EXPENSE_CATEGORIES}
                    placeholder="Select category"
                    accentColor="rgba(244,63,94,0.6)"
                />
            </div>
            <div className="input-control">
                <label>Note</label>
                <textarea name="description" value={description} placeholder="Add a note (optional)" rows="3" onChange={handleInput('description')} />
            </div>
            <button type="submit" className="submit-btn">
                <span>{plus}</span><span>Add Expense</span>
            </button>
        </ExpenseFormStyled>
    )
}

const slideIn = keyframes`from { opacity:0; transform: translateY(-8px); } to { opacity:1; transform: translateY(0); }`;

const ExpenseFormStyled = styled.form`
    display: flex; flex-direction: column; gap: 0.9rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(244,63,94,0.2);
    border-radius: 20px; padding: 1.4rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);

    .form-title {
        display: flex; align-items: center; gap: 0.5rem;
        font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 0.2rem;
        .form-icon { font-size: 1.2rem; }
    }

    .form-error {
        padding: 0.6rem 1rem;
        background: rgba(244,63,94,0.15); border: 1px solid rgba(244,63,94,0.3);
        border-radius: 10px; color: #FB7185; font-size: 0.85rem; font-weight: 500;
        animation: ${slideIn} 0.3s ease;
    }

    label {
        display: block; font-size: 0.72rem; font-weight: 700;
        color: rgba(255,255,255,0.45); text-transform: uppercase;
        letter-spacing: 0.5px; margin-bottom: 0.25rem;
    }

    input, textarea {
        width: 100%;
        font-family: 'Outfit', inherit; font-size: 0.9rem;
        outline: none; padding: 0.65rem 1rem;
        border-radius: 12px; border: 1px solid rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.07); resize: none; color: #fff;
        transition: all 0.25s ease;
        &::placeholder { color: rgba(255,255,255,0.25); }
        &:focus {
            border-color: rgba(244,63,94,0.5);
            background: rgba(244,63,94,0.08);
            box-shadow: 0 0 0 3px rgba(244,63,94,0.1);
        }
    }

    .react-datepicker-wrapper, .react-datepicker__input-container { width: 100%; }

    .submit-btn {
        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #BE123C, #F43F5E); color: #fff;
        font-size: 0.92rem; font-weight: 700; font-family: 'Outfit', inherit;
        border: none; border-radius: 12px; cursor: pointer;
        transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(244,63,94,0.3); margin-top: 0.2rem;
        &:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(244,63,94,0.4); }
        &:active { transform: scale(0.98); }
    }
`;

export default ExpenseForm