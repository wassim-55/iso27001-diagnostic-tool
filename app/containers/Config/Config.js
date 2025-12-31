import React, { Component } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import ConfigComponent from '../../components/ConfigComponent/ConfigComponent';
import { retrieveFileInLocalStorage, verifyFileCreated } from '../../providers/Storage/storage';
import SaveFileComponent from '../../components/SaveFileComponent/SaveFileComponent';

class Config extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: '1',
            verifiedLoad: false
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    componentDidMount = () => {
        verifyFileCreated(this.props.history).then(
            this.setState({ verifiedLoad: true })
        ).catch(error => {
            this.setState({ verifiedLoad: false })
        })
    }

    render = () => {
        return (
            <div className="wrapper center-aligning pd-10px">
                {
                    this.state.verifiedLoad &&
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink onClick={() => { this.toggle('1') }}>Create document</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => { this.toggle('2') }}>Rapports & Chargement</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <ConfigComponent />
                            </TabPane>
                            <TabPane tabId="2">
                                <SaveFileComponent type={'save'} />
                            </TabPane>
                        </TabContent>
                    </div>
                }
            </div>
        )
    }
}

export default Config