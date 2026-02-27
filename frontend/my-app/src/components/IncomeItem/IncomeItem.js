import styled, { keyframes } from 'styled-components';
import {
    dollar
} from '../../utils/Icons';
import { dateFormat } from '../../utils/dateFormat';

// Map categories to emoji for reliable cross-platform display
const INCOME_EMOJI = {
    salary: '💼', freelancing: '💻', investments: '📊',
    stocks: '📈', bitcoin: '₿', bank: '🏦', youtube: '▶️', other: '🔖',
};
const EXPENSE_EMOJI = {
    education: '📚', groceries: '🛒', health: '❤️',
    subscriptions: '📺', takeaways: '🍔', clothing: '👗',
    travelling: '✈️', other: '🔖',
};

function IncomeItem({ id, title, amount, date, category, description, deleteItem, indicatorColor, type }) {
    const isExpense = type === 'expense';
    const emoji = isExpense
        ? (EXPENSE_EMOJI[category] || '💸')
        : (INCOME_EMOJI[category] || '💰');

    return (
        <IncomeItemStyled isExpense={isExpense}>
            <div className="icon-box">
                <span className="cat-emoji">{emoji}</span>
            </div>

            <div className="content">
                <div className="top-row">
                    <h5>
                        <span className="dot" />
                        {title}
                    </h5>
                    <div className="amount-badge">
                        <span className="amount-val">
                            {isExpense ? '−' : '+'}
                            {dollar} {amount}
                        </span>
                    </div>
                </div>

                <div className="meta-row">
                    <span className="meta-item">
                        <i className="fa-solid fa-calendar" style={{ color: 'rgba(167,139,250,0.7)', fontSize: '0.75rem' }} />
                        {dateFormat(date)}
                    </span>
                    {description && (
                        <span className="meta-item">
                            <i className="fa-solid fa-comment" style={{ color: 'rgba(167,139,250,0.7)', fontSize: '0.75rem' }} />
                            {description}
                        </span>
                    )}
                    <span className={`type-badge ${isExpense ? 'expense' : 'income'}`}>
                        {isExpense ? '📉 Expense' : '📈 Income'}
                    </span>
                </div>
            </div>

            <button className="delete-btn" onClick={() => deleteItem(id)} title="Delete">
                <i className="fa-solid fa-trash" />
            </button>
        </IncomeItemStyled>
    );
}

const slideInUp = keyframes`
  from { opacity:0; transform: translateY(14px); }
  to   { opacity:1; transform: translateY(0); }
`;

const IncomeItemStyled = styled.div`
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-left: 3px solid ${props => props.isExpense ? '#F43F5E' : '#10B981'};
    border-radius: 14px;
    padding: 0.85rem 1rem;
    margin-bottom: 0.65rem;
    display: flex;
    align-items: center;
    gap: 0.9rem;
    width: 100%;
    backdrop-filter: blur(8px);
    animation: ${slideInUp} 0.4s ease both;
    transition: all 0.25s ease;

    &:hover {
        background: rgba(255,255,255,0.07);
        transform: translateX(3px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    }

    /* ── Category icon box ── */
    .icon-box {
        width: 46px; height: 46px;
        border-radius: 13px;
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        background: ${props => props.isExpense
            ? 'linear-gradient(135deg, rgba(244,63,94,0.18), rgba(251,113,133,0.08))'
            : 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(52,211,153,0.08))'};
        border: 1px solid ${props => props.isExpense
            ? 'rgba(244,63,94,0.25)'
            : 'rgba(16,185,129,0.25)'};

        .cat-emoji {
            font-size: 1.3rem;
            line-height: 1;
            filter: drop-shadow(0 0 4px rgba(255,255,255,0.2));
        }
    }

    /* ── Content ── */
    .content {
        flex: 1;
        display: flex; flex-direction: column; gap: 0.3rem; min-width: 0;
    }

    .top-row {
        display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;

        h5 {
            font-size: 0.95rem; font-weight: 700; color: rgba(255,255,255,0.9);
            display: flex; align-items: center; gap: 0.45rem;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;

            .dot {
                width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
                background: ${props => props.isExpense ? '#F43F5E' : '#10B981'};
                box-shadow: 0 0 6px ${props => props.isExpense ? 'rgba(244,63,94,0.5)' : 'rgba(16,185,129,0.5)'};
            }
        }

        .amount-badge {
            .amount-val {
                font-size: 0.88rem; font-weight: 800; white-space: nowrap;
                color: ${props => props.isExpense ? '#FB7185' : '#34D399'};
                display: flex; align-items: center; gap: 0.2rem;
                i { font-size: 0.78rem; color: inherit; }
            }
        }
    }

    .meta-row {
        display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;

        .meta-item {
            display: flex; align-items: center; gap: 0.3rem;
            font-size: 0.76rem; color: rgba(255,255,255,0.4); font-weight: 500;
        }

        .type-badge {
            padding: 0.12rem 0.5rem; border-radius: 50px;
            font-size: 0.7rem; font-weight: 700;
            &.income  { background: rgba(16,185,129,0.12); color: #34D399; border: 1px solid rgba(16,185,129,0.2); }
            &.expense { background: rgba(244,63,94,0.12);  color: #FB7185; border: 1px solid rgba(244,63,94,0.2); }
        }
    }

    /* ── Delete button ── */
    .delete-btn {
        width: 34px; height: 34px;
        display: flex; align-items: center; justify-content: center;
        border: none; border-radius: 10px;
        background: rgba(244,63,94,0.08);
        cursor: pointer; transition: all 0.25s ease; flex-shrink: 0;

        i {
            font-size: 0.88rem;
            color: rgba(244,63,94,0.6);
            transition: color 0.2s;
        }

        &:hover {
            background: rgba(244,63,94,0.2);
            transform: scale(1.08);
            i { color: #FB7185; }
        }
        &:active { transform: scale(0.95); }
    }
`;

export default IncomeItem;
