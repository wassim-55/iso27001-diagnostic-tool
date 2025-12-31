import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Sidebar from '../../components/Sidebar/Sidebar'
import HomePage from '../HomePage/index'
import ChecklistPage from '../ChecklistPage/ChecklistPage'
import SectionCompliancePage from '../SectionCompliancePage/SectionCompliancePage'
import ConfigPage from '../Config/Config'
import DashboardPage from '../DashboardPage/DashboardPage'
import AboutPage from '../AboutPage/AboutPage'

const ControlCompliancePage = (props) => { return (<SectionCompliancePage type='control' {...props} />) }

export default function App() {
	const [sidebarOpen, setSidebarOpen] = React.useState(false);

	return (
		<div>
			<Sidebar onToggle={setSidebarOpen} />
			<div style={{
				marginLeft: sidebarOpen ? 300 : 100,
				padding: 40,
				paddingTop: 100,
				transition: 'margin-left 0.3s ease'
			}}>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/about" component={AboutPage} />
					<Route exact path="/config" component={ConfigPage} />
					<Route exact path="/dashboard" component={DashboardPage} />
					<Route exact path="/checklist" component={ChecklistPage} />
					<Route exact path="/section-compliance" component={SectionCompliancePage} />
					<Route exact path="/control-compliance" component={ControlCompliancePage} />
					<Route component={HomePage} />
				</Switch>
			</div>
		</div>
	);
}
