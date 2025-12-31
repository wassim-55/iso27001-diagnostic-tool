import React, { Component } from 'react'
import { Table, Input } from 'reactstrap'

import * as consts from './consts'
import StandardComponent from './StandardComponent';
import './checklist.css';

class ChecklistTable extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render = () => {
        return (
            <div className="wrapper checklist-wrapper">
                <Table hover size="sm" responsive className="checklist-table">
                    <thead className="checklist-thead-sticky">
                        <tr className="checklist-header-row">
                            <th className="checklist-th">Liste de contrôle</th>
                            <th className="checklist-th">Standard</th>
                            <th className="checklist-th">Section</th>
                            <th className="checklist-th">Points d'évaluation initiaux</th>
                            <th className="checklist-th">Constatations</th>
                            <th className="checklist-th">Statut</th>
                        </tr>
                    </thead>

                    {
                        consts.checklistData.map((mainSection, index) => {
                            return (
                                <tbody key={index}>
                                    <tr className="checklist-main-section-row">
                                        <th scope="row"></th>
                                        <th scope="row">{mainSection.mainSection}</th>
                                        <th scope="row" colSpan="4">{mainSection.section}</th>
                                    </tr>

                                    {
                                        mainSection.subSection.map((subSection, idx) => {
                                            const firstTr = (
                                                <tr key={subSection.standard} className="checklist-sub-section-row">
                                                    <th scope="row"></th>
                                                    <td>{subSection.standard}</td>
                                                    <td colSpan="4">{subSection.section}</td>
                                                </tr>
                                            );

                                            return [firstTr, ...subSection.standards].map((standard, i) => {
                                                const uniqueKey = i === 0 ? subSection.standard : standard.standard;
                                                return (
                                                    <StandardComponent key={uniqueKey} index={i} standard={standard} />
                                                )
                                            })
                                        })
                                    }
                                </tbody>
                            )
                        })
                    }
                </Table>
            </div>
        )
    }
}

export default ChecklistTable