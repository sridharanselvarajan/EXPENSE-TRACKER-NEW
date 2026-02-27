import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext()
    useEffect(() => { getExpenses() }, [])

    return (
        <ExpenseStyled>
            <InnerLayout>
                <div className="page-header">
                    <h1>Expenses</h1>
                    <span className="header-badge">💸 Spending</span>
                </div>
                <div className="total-banner">
                    <div className="banner-left">
                        <span className="banner-icon">📉</span>
                        <div>
                            <p className="banner-label">Total Expenses</p>
                            <p className="banner-amount">${totalExpenses()}</p>
                        </div>
                    </div>
                    <div className="banner-count">{expenses.length} entries</div>
                </div>
                <div className="income-content">
                    <div className="form-container"><ExpenseForm /></div>
                    <div className="list">
                        {expenses.length === 0 && (
                            <div className="empty-state">
                                <span>📂</span>
                                <p>No expense records yet. Add your first one!</p>
                            </div>
                        )}
                        {expenses.map(({ _id, title, amount, date, category, description, type }) => (
                            <IncomeItem key={_id} id={_id} title={title} description={description}
                                amount={amount} date={date} type={type} category={category}
                                indicatorColor="#F43F5E" deleteItem={deleteExpense} />
                        ))}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const slideUp = keyframes`from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); }`;

const ExpenseStyled = styled.div`
    display: flex; overflow: auto;
    animation: ${slideUp} 0.4s ease both;

    .page-header {
        display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;
        h1 {
            font-size: 1.8rem; font-weight: 800;
            background: linear-gradient(135deg, #FB7185, #F43F5E);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .header-badge {
            padding: 0.3rem 0.9rem;
            background: rgba(244,63,94,0.12); border: 1px solid rgba(244,63,94,0.25);
            border-radius: 50px; font-size: 0.8rem; font-weight: 600; color: #FB7185;
        }
    }

    .total-banner {
        display: flex; align-items: center; justify-content: space-between;
        background: linear-gradient(135deg, #BE123C, #F43F5E, #FB7185);
        border-radius: 20px; padding: 1.2rem 1.5rem; margin-bottom: 1.5rem;
        box-shadow: 0 8px 30px rgba(244,63,94,0.25);
        .banner-left { display: flex; align-items: center; gap: 1rem;
            .banner-icon { font-size: 2rem; }
            .banner-label { font-size: 0.75rem; color: rgba(255,255,255,0.7); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
            .banner-amount { font-size: 2rem; font-weight: 800; color: white; line-height: 1; }
        }
        .banner-count {
            font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.7);
            background: rgba(255,255,255,0.15); padding: 0.4rem 0.9rem; border-radius: 50px;
        }
    }

    .income-content {
        display: flex; gap: 1.5rem;
        .form-container { flex: 0 0 320px; }
        .list { flex: 1; overflow-y: auto; max-height: 52vh; padding-right: 0.3rem; }
        .empty-state {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            gap: 0.8rem; padding: 3rem; text-align: center; color: rgba(255,255,255,0.3);
            span { font-size: 2.5rem; }
            p { font-size: 0.9rem; font-weight: 500; }
        }
    }
`;

export default Expenses