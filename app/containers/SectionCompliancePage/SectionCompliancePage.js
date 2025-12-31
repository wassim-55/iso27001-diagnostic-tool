import React, { Component } from 'react'
import SectionComplianceTable from '../../components/SectionComplianceTable/SectionComplianceTable'
import ComplianceCharts from '../../components/ComplianceCharts/ComplianceCharts'
import { verifyFileCreated } from '../../providers/Storage/storage';
import * as consts from '../../components/SectionComplianceTable/consts'

class SectionCompliancePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            verifiedLoad: false
        }
    }

    componentDidMount = () => {
        this.setState({ verifiedLoad: true })
    }

    render = () => {
        return (
            <div className="wrapper center-aligning pd-10px">
                {
                    this.state.verifiedLoad &&
                    <React.Fragment>
                        <ComplianceCharts standards={consts.standards} type={this.props.type || 'section'} />
                        <SectionComplianceTable type={this.props.type || 'section'} />
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default SectionCompliancePage