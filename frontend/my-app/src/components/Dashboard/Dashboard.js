import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { incomes, expenses, totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <div className="page-header">
                    <h1>Dashboard</h1>
                    <span className="header-badge">📊 Overview</span>
                </div>
                <div className='stats-con'>
                    <div className='chart-con'>
                        <Chart />
                        <div className="amount-con">
                            <div className='income card-stat' style={{ '--delay': '0.1s' }}>
                                <div className="card-icon">📈</div>
                                <h2>Total Income</h2>
                                <p>{dollar} {totalIncome()}</p>
                                <div className="card-glow" />
                            </div>
                            <div className='expense card-stat' style={{ '--delay': '0.2s' }}>
                                <div className="card-icon">📉</div>
                                <h2>Total Expenses</h2>
                                <p>{dollar} {totalExpenses()}</p>
                                <div className="card-glow" />
                            </div>
                            <div className="balance card-stat" style={{ '--delay': '0.3s' }}>
                                <div className="card-icon">💎</div>
                                <h2>Total Balance</h2>
                                <p>{dollar} {totalBalance()}</p>
                                <div className="card-glow" />
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span> Max</h2>
                        <div className="salary-item">
                            <p>{Math.min(...incomes.map(item => item.amount))}</p>
                            <p>{Math.max(...incomes.map(item => item.amount))}</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expenses</span> Max</h2>
                        <div className="salary-item">
                            <p>{Math.min(...expenses.map(item => item.amount))}</p>
                            <p>{Math.max(...expenses.map(item => item.amount))}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const slideUpCard = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;
const balancePulse = keyframes`
  0%, 100% { box-shadow: 0 8px 30px rgba(59,130,246,0.3), 0 0 0 0 rgba(59,130,246,0.3); }
  50%       { box-shadow: 0 8px 30px rgba(59,130,246,0.5), 0 0 0 12px rgba(59,130,246,0); }
`;

const DashboardStyled = styled.div`
    .page-header {
        display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;
        h1 {
            font-size: 1.8rem; font-weight: 800;
            background: linear-gradient(135deg, #A78BFA, #C4B5FD);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .header-badge {
            padding: 0.3rem 0.9rem;
            background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3);
            border-radius: 50px; font-size: 0.8rem; font-weight: 600; color: #A78BFA;
        }
    }

    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        .chart-con {
            grid-column: 1 / 4;
            height: 400px;

            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1.2rem;
                margin-top: 2rem;

                .card-stat {
                    position: relative;
                    border-radius: 18px;
                    padding: 1.1rem;
                    border: 1px solid rgba(255,255,255,0.12);
                    overflow: hidden;
                    animation: ${slideUpCard} 0.6s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s) both;
                    transition: all 0.3s ease;
                    cursor: default;

                    .card-icon { font-size: 1.3rem; margin-bottom: 0.3rem; }

                    h2 {
                        font-size: 0.78rem; font-weight: 600;
                        color: rgba(255,255,255,0.75);
                        margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;
                    }

                    p { font-size: 2rem; font-weight: 800; color: white; line-height: 1.1; }

                    .card-glow {
                        position: absolute; inset: 0;
                        background: rgba(255,255,255,0);
                        transition: background 0.3s ease; border-radius: inherit;
                    }

                    &:hover {
                        transform: translateY(-4px) scale(1.02);
                        box-shadow: 0 16px 40px rgba(0,0,0,0.3);
                        .card-glow { background: rgba(255,255,255,0.06); }
                    }
                }

                .income {
                    grid-column: span 2;
                    background: linear-gradient(135deg, #059669, #10B981, #34D399);
                    box-shadow: 0 6px 24px rgba(16,185,129,0.3);
                }
                .expense {
                    grid-column: span 2;
                    background: linear-gradient(135deg, #BE123C, #F43F5E, #FB7185);
                    box-shadow: 0 6px 24px rgba(244,63,94,0.3);
                }
                .balance {
                    grid-column: 2 / 4;
                    background: linear-gradient(135deg, #1D4ED8, #3B82F6, #60A5FA);
                    display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
                    animation: ${balancePulse} 3s ease-in-out infinite, ${slideUpCard} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
                    p { font-size: 2.5rem; }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;

            .salary-title {
                font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.7);
                margin: 0.8rem 0 0.4rem;
                display: flex; align-items: center; justify-content: space-between;
                span {
                    font-size: 1.3rem;
                    background: linear-gradient(135deg, #A78BFA, #F472B6);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }
            }

            .salary-item {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.08);
                padding: 0.8rem 1rem; border-radius: 12px;
                display: flex; justify-content: space-between; align-items: center;
                transition: all 0.25s ease; margin-bottom: 0.5rem;
                p { font-weight: 700; font-size: 1.2rem; color: rgba(255,255,255,0.8); }
                &:hover {
                    background: rgba(255,255,255,0.08);
                    transform: translateX(2px);
                }
            }
        }
    }
`;

export default Dashboard;
