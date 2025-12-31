import React, { Component } from 'react'
import BarChartComponent from '../../components/BarChart/BarChartComponent';
import { verifyFileCreated } from '../../providers/Storage/storage';
import './dashboard.css';

class DashboardPage extends Component {
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
			<div className="dashboard-container">
				<div className="dashboard-header">
					<h1 className="dashboard-title">Tableau de Bord de Conformité</h1>
					<p className="dashboard-subtitle">
						Visualisez l'état actuel de votre conformité ISO 27001 par chapitre et par contrôle.
					</p>
				</div>

				{this.state.verifiedLoad && (
					<div className="chart-card">
						<h2 className="chart-title">
							Conformité par Chapitre
						</h2>

						<div className="chart-legend">
							<div className="legend-item">
								<span className="legend-color high"></span>
								<span>Conforme (&gt;80%)</span>
							</div>
							<div className="legend-item">
								<span className="legend-color med"></span>
								<span>Partiel (50-80%)</span>
							</div>
							<div className="legend-item">
								<span className="legend-color low"></span>
								<span>Non Conforme (&lt;50%)</span>
							</div>
						</div>

						<div className="chart-instruction">
							Cliquez sur une barre pour voir les détails des contrôles de ce chapitre.
						</div>

						<BarChartComponent type='section' />
					</div>
				)}
			</div>
		)
	}
}

export default DashboardPage