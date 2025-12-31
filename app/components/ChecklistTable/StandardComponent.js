import React, { Component } from 'react'
import { Table, Input, Badge } from 'reactstrap'
import { saveDataForSubSubControl, getSubSubControl } from '../../providers/Storage/storage';

class StandardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            percentage: 0,
            checklistValue: 0,
            findings: ''
        }
    }

    calculateStatusAndSaveData = (value) => {
        const { findings } = this.state
        let percentage = parseInt(value)

        // If value is -1, it means N/A
        // Otherwise it is the percentage directly (100, 75, 25, 0)

        saveDataForSubSubControl(this.props.standard.standard, percentage, findings, percentage)

        this.setState({ percentage, checklistValue: percentage })
    }

    saveFindings = (findings) => {
        const { percentage, checklistValue } = this.state

        saveDataForSubSubControl(this.props.standard.standard, checklistValue, findings, percentage)

        this.setState({ findings })
    }

    componentDidMount = () => {
        if (this.props.index !== 0) {
            const data = getSubSubControl(this.props.standard.standard)
            if (data) {
                this.setState({ percentage: data.status, checklistValue: data.checklistValue, findings: data.findings })
            }
        }
    }

    getStatusColor = (value) => {
        const val = parseInt(value);
        switch (val) {
            case 100: return '#10b981'; // Green - Conforme
            case 75: return '#f59e0b';  // Yellow - Partiellement conforme
            case 25: return '#fb923c';  // Orange - Partiellement non conforme
            case 0: return '#ef4444';   // Red - Non conforme
            case -1: return '#6b7280';  // Gray - Non applicable
            default: return '#94a3b8';  // Default gray
        }
    }

    getStatusText = (value) => {
        const val = parseInt(value);
        switch (val) {
            case 100: return 'Conforme';
            case 75: return 'Part. Conforme';
            case 25: return 'Part. Non Conf.';
            case 0: return 'Non Conforme';
            case -1: return 'N/A';
            default: return 'Non défini';
        }
    }

    render = () => {
        const statusColor = this.getStatusColor(this.state.checklistValue);
        const statusText = this.getStatusText(this.state.checklistValue);

        const toRender = this.props.index === 0 ?
            this.props.standard :
            <tr>
                <th style={{ width: '120px' }} scope="row">
                    <Input
                        type="select"
                        value={this.state.checklistValue}
                        onChange={(e) => this.calculateStatusAndSaveData(e.target.value)}
                        className="table-input compliance-select"
                        style={{
                            fontSize: '13px',
                            padding: '6px',
                            fontWeight: '600',
                            backgroundColor: statusColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="0">Non conforme</option>
                        <option value="25">Part. non conforme</option>
                        <option value="75">Part. conforme</option>
                        <option value="100">Conforme</option>
                        <option value="-1">Non applicable</option>
                    </Input>
                </th>
                <td style={{ width: '100px', fontWeight: '600' }}>{this.props.standard.standard}</td>
                <td>{this.props.standard.section}</td>
                <td>
                    {this.props.standard.description}
                </td>
                <td style={{ width: '300px' }}>
                    <Input
                        value={this.state.findings}
                        onChange={(e) => this.saveFindings(e.target.value)}
                        className="table-input"
                        type="textarea"
                        style={{
                            borderRadius: '6px',
                            border: '2px solid #e2e8f0',
                            fontSize: '13px'
                        }}
                    />
                </td>
                <td style={{ width: '120px', textAlign: 'center' }}>
                    <Badge
                        style={{
                            backgroundColor: statusColor,
                            padding: '8px 12px',
                            fontSize: '12px',
                            fontWeight: '700',
                            borderRadius: '6px',
                            minWidth: '80px',
                            display: 'inline-block'
                        }}
                    >
                        {statusText}
                    </Badge>
                </td>
            </tr>
        return toRender
    }
}

export default StandardComponent