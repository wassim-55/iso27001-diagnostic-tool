import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { FaArrowLeft, FaArrowRight, FaChartBar, FaClipboardCheck, FaClipboardList, FaListOl, FaInfo, FaCog } from "react-icons/fa"
import isoLogo from '../../images/iso27001-logo.png'

import './sidebar.css'

class Sidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            pathname: this.props.history.location.pathname,
            showSideBar: true
        }
    }

    componentDidMount = () => {
        const { pathname } = this.state
    }

    toggleSidebar = () => {
        const { open } = this.state;
        const newState = !open;
        this.setState({ open: newState });
        if (this.props.onToggle) {
            this.props.onToggle(newState);
        }
    }

    handleMouseEnter = () => {
        this.setState({ open: true });
        if (this.props.onToggle) {
            this.props.onToggle(true);
        }
    }

    handleMouseLeave = () => {
        this.setState({ open: false });
        if (this.props.onToggle) {
            this.props.onToggle(false);
        }
    }

    render = () => {
        const { open, showSideBar } = this.state
        const currentPath = this.props.history.location.pathname.substr(1);
        const pageTitle = currentPath ? currentPath.replace(/-/g, ' ').toUpperCase() : 'ACCUEIL';

        return (
            <div>
                {
                    showSideBar &&
                    <div>
                        <div className={`header flex-center font-family ${open ? 'sidebar-open-header-offset' : ''}`}>
                            <img src={isoLogo} alt="ISO 27001" className="header-logo" />
                            <span className="header-title">{pageTitle}</span>
                        </div>
                        {
                            open &&
                            <div className='sidebar-container-open' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                                <div className="sidebar-brand">
                                    <img src={isoLogo} alt="ISO 27001" className="sidebar-logo-large" />
                                    <h2 className="sidebar-title">ISO 27001</h2>
                                    <p className="sidebar-subtitle">Audit & Compliance</p>
                                </div>

                                <div className="sidebar-divider"></div>

                                <div className="sidebar-menu">
                                    <div className='sidebar-option font-family' onClick={() => this.props.history.push('/dashboard')}>
                                        <FaChartBar className="icon-separator-sidebar" />Tableau de bord
                                    </div>
                                    <div className='sidebar-option font-family' onClick={() => this.props.history.push('/checklist')}>
                                        <FaClipboardCheck className="icon-separator-sidebar" />Liste de contrôle
                                    </div>
                                    <div className='sidebar-option font-family' onClick={() => this.props.history.push('/section-compliance')}>
                                        <FaClipboardList className="icon-separator-sidebar" />Conformité par section
                                    </div>
                                    <div className='sidebar-option font-family' onClick={() => this.props.history.push('/control-compliance')}>
                                        <FaListOl className="icon-separator-sidebar" />Conformité par contrôle
                                    </div>
                                    <div className='sidebar-option font-family' onClick={() => this.props.history.push('/about')}>
                                        <FaInfo className="icon-separator-sidebar" />Information
                                    </div>
                                    <div className='sidebar-option font-family' onClick={() => this.props.history.push('/config')}>
                                        <FaCog className="icon-separator-sidebar" />Configuration
                                    </div>
                                </div>

                                <div className="sidebar-footer">
                                    <img src={isoLogo} alt="ISO 27001" className="sidebar-logo-small" />
                                    <p className="sidebar-footer-text">v1.0.0</p>
                                </div>

                                <div className='sidebar-arrow-container-open' onClick={this.toggleSidebar}>
                                    <FaArrowLeft />
                                </div>
                            </div>
                        }

                        {
                            !open &&
                            <div className='sidebar-container-closed' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                                <div className="sidebar-brand-closed">
                                    <img src={isoLogo} alt="ISO 27001" className="sidebar-logo-icon" />
                                </div>

                                <div className="sidebar-menu">
                                    <div className='sidebar-option' onClick={() => this.props.history.push('/dashboard')}>
                                        <FaChartBar />
                                    </div>
                                    <div className='sidebar-option' onClick={() => this.props.history.push('/checklist')}>
                                        <FaClipboardCheck />
                                    </div>
                                    <div className='sidebar-option' onClick={() => this.props.history.push('/section-compliance')}>
                                        <FaClipboardList />
                                    </div>
                                    <div className='sidebar-option' onClick={() => this.props.history.push('/control-compliance')}>
                                        <FaListOl />
                                    </div>
                                    <div className='sidebar-option' onClick={() => this.props.history.push('/about')}>
                                        <FaInfo />
                                    </div>
                                    <div className='sidebar-option' onClick={() => this.props.history.push('/config')}>
                                        <FaCog />
                                    </div>
                                </div>

                                <div className='sidebar-arrow-container-closed' onClick={this.toggleSidebar}>
                                    <FaArrowRight />
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(Sidebar)