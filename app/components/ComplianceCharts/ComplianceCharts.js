import React, { Component } from 'react';
import { Bar, Radar, Doughnut } from 'react-chartjs-2';
import { retrieveFileInLocalStorage, subscribe, unsubscribe } from '../../providers/Storage/storage';

class ComplianceCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barData: {},
            radarData: {},
            doughnutData: {},
            globalAverage: 0
        };
    }

    componentDidMount() {
        this.processData();
        subscribe(this.processData);
    }

    componentWillUnmount() {
        unsubscribe(this.processData);
    }

    processData = () => {
        const storageData = retrieveFileInLocalStorage();
        const controlData = storageData.controlData;
        const standards = this.props.standards;

        // --- Bar Chart Data ---
        let counts = {
            'Conforme': 0,
            'Partiellement conforme': 0,
            'Partiellement non conforme': 0,
            'Non conforme': 0
        };

        let totalApplicable = 0;
        let totalScore = 0;

        controlData.forEach(control => {
            if (control.status !== -1) {
                totalApplicable++;
                totalScore += control.status;

                if (control.status === 100) counts['Conforme']++;
                else if (control.status === 75) counts['Partiellement conforme']++;
                else if (control.status === 25) counts['Partiellement non conforme']++;
                else if (control.status === 0) counts['Non conforme']++;
            }
        });

        const barData = {
            labels: ['Non conforme', 'Partiellement non conforme', 'Partiellement conforme', 'Conforme'],
            datasets: [
                {
                    label: 'Nombre de contrôles',
                    backgroundColor: ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c'],
                    borderColor: ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c'],
                    borderWidth: 1,
                    hoverBackgroundColor: ['#c9302c', '#ec971f', '#31b0d5', '#449d44'],
                    hoverBorderColor: ['#c9302c', '#ec971f', '#31b0d5', '#449d44'],
                    data: [
                        counts['Non conforme'],
                        counts['Partiellement non conforme'],
                        counts['Partiellement conforme'],
                        counts['Conforme']
                    ]
                }
            ]
        };

        // --- Doughnut Data (Same as Bar but formatted for Doughnut) ---
        const doughnutData = {
            labels: ['Non conforme', 'Partiellement non conforme', 'Partiellement conforme', 'Conforme'],
            datasets: [{
                data: [
                    counts['Non conforme'],
                    counts['Partiellement non conforme'],
                    counts['Partiellement conforme'],
                    counts['Conforme']
                ],
                backgroundColor: ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c'],
                hoverBackgroundColor: ['#c9302c', '#ec971f', '#31b0d5', '#449d44']
            }]
        };

        // --- Radar Chart Data ---
        const radarLabels = [];
        const radarValues = [];

        standards.forEach(section => {
            const sectionControls = controlData.filter(c => c.standard.startsWith(section.standard));
            const applicableControls = sectionControls.filter(c => c.status !== -1);

            let average = 0;
            if (applicableControls.length > 0) {
                const sum = applicableControls.reduce((acc, curr) => acc + curr.status, 0);
                average = Math.round(sum / applicableControls.length);
            }

            radarLabels.push(`${section.standard} ${section.description.substring(0, 15)}...`);
            radarValues.push(average);
        });

        const radarData = {
            labels: radarLabels,
            datasets: [
                {
                    label: 'Conformité (%)',
                    backgroundColor: 'rgba(136, 132, 216, 0.2)',
                    borderColor: 'rgba(136, 132, 216, 1)',
                    pointBackgroundColor: 'rgba(136, 132, 216, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(136, 132, 216, 1)',
                    data: radarValues
                }
            ]
        };

        // --- Global Average ---
        const globalAverage = totalApplicable > 0 ? Math.round(totalScore / totalApplicable) : 0;

        this.setState({ barData, radarData, doughnutData, globalAverage });
    }

    render() {
        const { barData, radarData, doughnutData, globalAverage } = this.state;
        const { type } = this.props;

        const barOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }]
            },
            legend: {
                display: false
            }
        };

        const radarOptions = {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }
        };

        const doughnutOptions = {
            legend: {
                position: 'right'
            }
        };

        // Calculate totals for progress bars
        const totalControls = barData.datasets && barData.datasets[0] ?
            barData.datasets[0].data.reduce((a, b) => a + b, 0) : 0;

        const progressData = barData.datasets && barData.datasets[0] ? [
            { label: 'Conforme', count: barData.datasets[0].data[3], color: '#10b981', icon: '✓' },
            { label: 'Partiellement conforme', count: barData.datasets[0].data[2], color: '#f59e0b', icon: '◐' },
            { label: 'Partiellement non conforme', count: barData.datasets[0].data[1], color: '#fb923c', icon: '◑' },
            { label: 'Non conforme', count: barData.datasets[0].data[0], color: '#ef4444', icon: '✗' }
        ] : [];

        return (
            <div style={{ width: '100%', padding: '20px' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Moyenne générale : <span style={{ color: globalAverage >= 50 ? '#5cb85c' : '#d9534f' }}>{globalAverage}%</span>
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>

                    {/* Left Chart - Bar Chart for Section, Progress Bars for Control */}
                    <div style={{ width: '45%', minWidth: '400px', marginBottom: '40px' }}>
                        {type === 'control' ? (
                            <>
                                <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Statistiques Détaillées par Niveau</h4>
                                <div style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                    {progressData.map((item, index) => {
                                        const percentage = totalControls > 0 ? Math.round((item.count / totalControls) * 100) : 0;
                                        return (
                                            <div key={index} style={{ marginBottom: '25px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                                                    <span style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>
                                                        <span style={{ fontSize: '18px', marginRight: '8px' }}>{item.icon}</span>
                                                        {item.label}
                                                    </span>
                                                    <span style={{ fontWeight: '700', fontSize: '14px', color: item.color }}>
                                                        {item.count} ({percentage}%)
                                                    </span>
                                                </div>
                                                <div style={{
                                                    width: '100%',
                                                    height: '12px',
                                                    background: '#e2e8f0',
                                                    borderRadius: '6px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        width: `${percentage}%`,
                                                        height: '100%',
                                                        background: item.color,
                                                        transition: 'width 0.5s ease',
                                                        borderRadius: '6px'
                                                    }}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div style={{
                                        marginTop: '20px',
                                        paddingTop: '20px',
                                        borderTop: '2px solid #e2e8f0',
                                        textAlign: 'center',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        color: '#1e293b'
                                    }}>
                                        Total des contrôles : {totalControls}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h4 style={{ textAlign: 'center' }}>Niveaux de CONFORMITÉ</h4>
                                <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                                    <Bar data={barData} options={barOptions} />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Chart - Conditional */}
                    <div style={{ width: '45%', minWidth: '400px', marginBottom: '40px' }}>
                        {type === 'section' ? (
                            <>
                                <h4 style={{ textAlign: 'center' }}>Niveaux de CONFORMITÉ des ARTICLES</h4>
                                <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                                    <Radar data={radarData} options={radarOptions} />
                                </div>
                            </>
                        ) : (
                            <>
                                <h4 style={{ textAlign: 'center' }}>Répartition Globale</h4>
                                <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                                    <Doughnut data={doughnutData} options={doughnutOptions} />
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
        );
    }
}

export default ComplianceCharts;
