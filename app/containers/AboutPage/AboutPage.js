import React, { Component } from 'react'
import { verifyFileCreated } from '../../providers/Storage/storage'
import { Table } from 'reactstrap'

import * as consts from './consts'

class AboutPage extends Component {
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
            <div className='wrapper center-aligning pd-10px'>
                {
                    this.state.verifiedLoad &&
                    <Table size="sm" responsive>
                        {
                            consts.infoData.map((value, index) => {
                                return (
                                    <tbody key={index}>
                                        {
                                            value.title && value.type === 'single-col' &&
                                            <tr>
                                                <th scope="row" colSpan="2">{value.text}</th>
                                            </tr>
                                        }
                                        {
                                            !value.title && value.type === 'single-col' &&
                                            value.text.map((v, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td scope="row" colSpan="2">{v}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            !value.title && value.type === 'bi-col' &&
                                            value.text.map((v, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td scope="row" style={{ width: '250px' }}>{v.title}</td>
                                                        <td scope="row">{v.text}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                )
                            })
                        }
                    </Table>
                }
            </div>
        )
    }
}

export default AboutPage