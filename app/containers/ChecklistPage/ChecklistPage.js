import React, { Component } from 'react'
import './checklist.css'
import ChecklistTable from '../../components/ChecklistTable/ChecklistTable'
import { verifyFileCreated } from '../../providers/Storage/storage';

class ChecklistPage extends Component {
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
                    <ChecklistTable />
                }
            </div>
        )
    }
}

export default ChecklistPage