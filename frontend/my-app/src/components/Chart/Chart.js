import {
    ArcElement,
    CategoryScale,
    Chart as ChartJs,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title, Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import styled, { keyframes } from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend, ArcElement, Filler,
)

function Chart() {
    const { incomes, expenses } = useGlobalContext()

    const data = {
        labels: incomes.map(inc => dateFormat(inc.date)),
        datasets: [
            {
                label: 'Income',
                data: incomes.map(inc => inc.amount),
                borderColor: '#10B981',
                backgroundColor: (ctx) => {
                    const chart = ctx.chart;
                    const { ctx: c, chartArea } = chart;
                    if (!chartArea) return 'transparent';
                    const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(16,185,129,0.45)');
                    gradient.addColorStop(0.6, 'rgba(16,185,129,0.08)');
                    gradient.addColorStop(1, 'rgba(16,185,129,0)');
                    return gradient;
                },
                fill: true,
                tension: 0.45,
                borderWidth: 2.5,
                pointBackgroundColor: '#10B981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#34D399',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
            },
            {
                label: 'Expenses',
                data: expenses.map(exp => exp.amount),
                borderColor: '#F43F5E',
                backgroundColor: (ctx) => {
                    const chart = ctx.chart;
                    const { ctx: c, chartArea } = chart;
                    if (!chartArea) return 'transparent';
                    const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(244,63,94,0.4)');
                    gradient.addColorStop(0.6, 'rgba(244,63,94,0.07)');
                    gradient.addColorStop(1, 'rgba(244,63,94,0)');
                    return gradient;
                },
                fill: true,
                tension: 0.45,
                borderWidth: 2.5,
                borderDash: [],
                pointBackgroundColor: '#F43F5E',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#FB7185',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(255,255,255,0.7)',
                    font: { family: 'Outfit, sans-serif', size: 13, weight: '600' },
                    boxWidth: 14,
                    boxHeight: 14,
                    borderRadius: 4,
                    useBorderRadius: true,
                    padding: 20,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(15,10,50,0.95)',
                borderColor: 'rgba(167,139,250,0.3)',
                borderWidth: 1,
                titleColor: 'rgba(255,255,255,0.9)',
                bodyColor: 'rgba(255,255,255,0.7)',
                titleFont: { family: 'Outfit, sans-serif', size: 13, weight: '700' },
                bodyFont: { family: 'Outfit, sans-serif', size: 12 },
                padding: 12,
                cornerRadius: 12,
                displayColors: true,
                boxPadding: 6,
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255,255,255,0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: 'rgba(255,255,255,0.45)',
                    font: { family: 'Outfit, sans-serif', size: 11 },
                },
                border: { display: false },
            },
            y: {
                grid: {
                    color: 'rgba(255,255,255,0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: 'rgba(255,255,255,0.45)',
                    font: { family: 'Outfit, sans-serif', size: 11 },
                    callback: val => `$${val}`,
                },
                border: { display: false },
            },
        },
        animation: {
            duration: 1200,
            easing: 'easeInOutQuart',
        },
    }

    return (
        <ChartStyled>
            <div className="chart-header">
                <span className="chart-title">📊 Income vs Expenses</span>
                <div className="legend-pills">
                    <span className="pill income">● Income</span>
                    <span className="pill expense">● Expenses</span>
                </div>
            </div>
            <div className="chart-wrap">
                <Line data={data} options={options} />
            </div>
        </ChartStyled>
    )
}

const fadeIn = keyframes`from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); }`;

const ChartStyled = styled.div`
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(167,139,250,0.15);
    border-radius: 20px;
    padding: 1.2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    animation: ${fadeIn} 0.5s ease both;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    position: relative;
    overflow: hidden;

    /* Glow top-left corner */
    &::before {
        content: '';
        position: absolute;
        top: -40px; left: -40px;
        width: 150px; height: 150px;
        background: radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%);
        border-radius: 50%;
        pointer-events: none;
    }
    /* Glow bottom-right */
    &::after {
        content: '';
        position: absolute;
        bottom: -40px; right: -40px;
        width: 150px; height: 150px;
        background: radial-gradient(circle, rgba(244,63,94,0.1), transparent 70%);
        border-radius: 50%;
        pointer-events: none;
    }

    &:hover {
        border-color: rgba(167,139,250,0.3);
        box-shadow: 0 12px 40px rgba(0,0,0,0.3), 0 0 30px rgba(124,58,237,0.1);
    }

    .chart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .chart-title {
            font-size: 0.9rem;
            font-weight: 700;
            color: rgba(255,255,255,0.8);
        }

        .legend-pills {
            display: flex;
            gap: 0.6rem;

            .pill {
                font-size: 0.75rem;
                font-weight: 600;
                padding: 0.2rem 0.7rem;
                border-radius: 50px;

                &.income {
                    color: #34D399;
                    background: rgba(16,185,129,0.12);
                    border: 1px solid rgba(16,185,129,0.2);
                }
                &.expense {
                    color: #FB7185;
                    background: rgba(244,63,94,0.12);
                    border: 1px solid rgba(244,63,94,0.2);
                }
            }
        }
    }

    .chart-wrap {
        flex: 1;
        position: relative;
    }
`;

export default Chart