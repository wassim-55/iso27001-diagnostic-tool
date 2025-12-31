import React, { Component } from 'react'
import BarChart from 'react-bar-chart'
import { calculateControlCompliance, subscribe, unsubscribe } from '../../providers/Storage/storage';

import * as consts from '../SectionComplianceTable/consts'

class BarChartComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {
                width: 900,
                height: 500,
                data: [],
                margins: { top: 20, right: 20, bottom: 30, left: 50 },
                yAxisLabel: ''
            },
            selectedData: {
                width: 900,
                height: 500,
                data: [],
                margins: { top: 20, right: 20, bottom: 30, left: 50 },
                yAxisLabel: ''
            },
            selectedControl: false
        }
    }

    componentDidMount = () => {
        this.updateData();
        subscribe(this.updateData);
    }

    componentWillUnmount = () => {
        unsubscribe(this.updateData);
    }

    updateData = () => {
        const { data } = this.state
        if (this.props.type === 'section') {
            let dataset = []
            consts.standards.forEach(section => {
                const percentage = calculateControlCompliance(section.standard)
                const datasetElement = {}
                datasetElement['text'] = `${section.standard}`
                datasetElement['value'] = percentage

                dataset.push(datasetElement)
            })

            data['data'] = dataset
        }

        this.setState({ data })
    }

    handleBarClick = (element, id) => {
        const { selectedData } = this.state
        let dataset = []

        // Fix: Use startsWith instead of includes to match only controls from the selected chapter
        // For example, clicking "4" should only show 4.x.x controls, not 5.1.4, 6.2.4, etc.
        const includedControls = consts.controls.filter(control => control.standard.startsWith(element.text + '.'))
        includedControls.forEach(control => {
            const percentage = calculateControlCompliance(control.standard)
            const datasetElement = {}
            datasetElement['text'] = `${control.standard}`
            datasetElement['value'] = percentage

            dataset.push(datasetElement)
        })

        selectedData['data'] = dataset
        // Dynamically calculate width based on number of controls
        // Give each bar at least 60px of space to prevent label overlap
        const minWidth = 900
        const calculatedWidth = Math.max(minWidth, dataset.length * 60)
        selectedData['width'] = calculatedWidth

        this.setState({ selectedData, selectedControl: true })
    }

    render = () => {
        const { data, selectedData, selectedControl } = this.state
        return (
            <div className="wrapper center-aligning" style={{ width: '100%' }}>
                <p className="font-family">Cliquez sur chaque barre pour afficher le pourcentage de conformité de chaque contrôle</p>
                <div style={{ overflowX: 'auto', width: '100%', maxWidth: '100%' }}>
                    <BarChart
                        ylabel={data.yAxisLabel}
                        width={data.width}
                        height={data.height}
                        margin={data.margins}
                        data={data.data}
                        onBarClick={this.handleBarClick}
                    />
                </div>

                {
                    selectedControl &&
                    <div style={{ marginTop: '3rem', width: '100%' }}>
                        <h3 style={{
                            textAlign: 'center',
                            color: '#1e293b',
                            marginBottom: '1.5rem',
                            fontSize: '1.3rem',
                            fontWeight: '600'
                        }}>
                            Détails des Contrôles
                        </h3>
                        <div style={{
                            overflowX: 'auto',
                            width: '100%',
                            maxWidth: '100%',
                            WebkitOverflowScrolling: 'touch'
                        }}>
                            <BarChart
                                ylabel={selectedData.yAxisLabel}
                                width={selectedData.width}
                                height={selectedData.height}
                                margin={selectedData.margins}
                                data={selectedData.data}
                            />
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default BarChartComponent