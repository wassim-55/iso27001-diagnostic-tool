import React, { Component } from 'react'
import { Table, Input } from 'reactstrap'
import { calculateControlCompliance, subscribe, unsubscribe, getSubSubControl, saveDataForSubSubControl } from '../../providers/Storage/storage';

class StandardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            percentage: 0,
            findings: ''
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
        const { type, standard } = this.props;
        if (type === 'control') {
            const data = getSubSubControl(standard.standard);
            if (data) {
                // If it's a control, percentage is the status directly? No, status is 0, 25, 75, 100.
                // But StandardComponent uses getStatusText(percentage).
                // Wait, existing code uses `calculateControlCompliance`.
                // For 'control', calculateControlCompliance(control) calculates it based on sub-items?
                // But 'control' here IS the leaf node (e.g. 4.1.1).
                // calculateControlCompliance('4.1.1') returns its status because it filters standard.includes('4.1.1').
                this.setState({ percentage: data.status, findings: data.findings || '' });
            } else {
                // Fallback if not found (should not happen)
                this.setState({ percentage: calculateControlCompliance(standard.standard) });
            }
        } else {
            const percentage = calculateControlCompliance(standard.standard)
            this.setState({ percentage })
        }
    }

    getStatusText = (percentage) => {
        if (percentage === 100) return 'Conforme'
        if (percentage === 75) return 'Partiellement conforme'
        if (percentage === 25) return 'Partiellement non conforme'
        if (percentage === 0) return 'Non conforme'
        if (percentage === -1) return 'Non applicable'
        return `${percentage}%`
    }

    handleCommentChange = (e) => {
        this.setState({ findings: e.target.value });
    }

    saveComment = () => {
        const { standard } = this.props;
        const { findings } = this.state;
        const currentData = getSubSubControl(standard.standard);
        if (currentData) {
            saveDataForSubSubControl(standard.standard, currentData.checklistValue, findings, currentData.status);
        }
    }

    render = () => {
        const { percentage, findings } = this.state
        const { type } = this.props

        return (
            <tr>
                <td>{this.props.standard.standard}</td>
                <td>{this.props.standard.description}</td>
                <td>
                    {
                        type === 'control' ?
                            this.getStatusText(percentage) :
                            `${percentage}%`
                    }
                </td>
                {
                    type === 'control' &&
                    <td>
                        <Input
                            type="textarea"
                            rows="2"
                            value={findings}
                            onChange={this.handleCommentChange}
                            onBlur={this.saveComment}
                            placeholder="Ajouter un commentaire..."
                            style={{ fontSize: '12px' }}
                        />
                    </td>
                }
            </tr>
        )
    }
}

export default StandardComponent