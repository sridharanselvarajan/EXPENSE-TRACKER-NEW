import styled, { keyframes } from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext()
    const [...history] = transactionHistory()

    return (
        <HistoryStyled>
            <div className="history-header">
                <h2>Recent History</h2>
                <span className="count-badge">{history.length} items</span>
            </div>
            {history.length === 0 && (
                <div className="history-empty">No recent transactions</div>
            )}
            {history.map((item) => {
                const { _id, title, amount, type } = item
                const isExpense = type === 'expense'
                return (
                    <div key={_id} className={`history-item ${isExpense ? 'expense' : 'income'}`}>
                        <div className="history-icon">{isExpense ? '📉' : '📈'}</div>
                        <p className="history-title">{title}</p>
                        <p className={`history-amount ${isExpense ? 'neg' : 'pos'}`}>
                            {isExpense ? `−$${amount <= 0 ? 0 : amount}` : `+$${amount <= 0 ? 0 : amount}`}
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const slideIn = keyframes`
  from { opacity:0; transform: translateX(-8px); }
  to   { opacity:1; transform: translateX(0); }
`;

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    margin-bottom: 1rem;

    .history-header {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 0.4rem;
        h2 { font-size: 1rem; font-weight: 800; color: rgba(255,255,255,0.9); }
        .count-badge {
            font-size: 0.72rem; font-weight: 600; color: rgba(167,139,250,0.9);
            background: rgba(124,58,237,0.15); padding: 0.2rem 0.6rem;
            border-radius: 50px; border: 1px solid rgba(124,58,237,0.2);
        }
    }

    .history-empty {
        text-align: center; font-size: 0.85rem;
        color: rgba(255,255,255,0.3); padding: 1rem;
    }

    .history-item {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        padding: 0.6rem 0.9rem; border-radius: 10px;
        display: flex; align-items: center; gap: 0.6rem;
        transition: all 0.22s ease;
        animation: ${slideIn} 0.3s ease both;

        &.income  { border-left: 3px solid #10B981; }
        &.expense { border-left: 3px solid #F43F5E; }

        &:hover {
            background: rgba(255,255,255,0.08);
            transform: translateX(3px);
        }

        .history-icon { font-size: 0.9rem; flex-shrink: 0; }

        .history-title {
            flex: 1; font-size: 0.82rem; font-weight: 600;
            color: rgba(255,255,255,0.75);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .history-amount {
            font-size: 0.82rem; font-weight: 800; white-space: nowrap; flex-shrink: 0;
            &.pos { color: #34D399; }
            &.neg { color: #FB7185; }
        }
    }
`;

export default History