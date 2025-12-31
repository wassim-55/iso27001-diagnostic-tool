import React, { Component } from 'react'
import ConfigComponent from '../../components/ConfigComponent/ConfigComponent'

import './home.css'

class HomePage extends Component {
	constructor(props) {
		super(props)

		this.state = {}

		this.redirect = this.redirect.bind(this)
	}

	redirect = () => {
		this.props.history.push('/dashboard')
	}

	render = () => {
		return (
			<div className="home-wrapper">
				<div className="home-content">
					<div className="welcome-section">
						<h1 className="welcome-title">Bienvenue sur ISO 27001 Audit Tool</h1>
						<p className="welcome-subtitle">Votre solution complète pour la conformité ISO 27001:2022</p>
						<p className="welcome-description">
							Gérez, suivez et améliorez votre système de management de la sécurité de l'information
							avec notre plateforme intuitive et professionnelle.
						</p>
					</div>

					<div className="info-section">
						<div className="info-badge">
							🏆 Conforme à la norme ISO/IEC 27001:2022
						</div>
					</div>

					<div className="stats-section">
						<div className="stats-grid">
							<div className="stat-card">
								<div className="stat-number">10</div>
								<div className="stat-label">Chapitres</div>
							</div>
							<div className="stat-card">
								<div className="stat-number">93</div>
								<div className="stat-label">Contrôles</div>
							</div>
							<div className="stat-card">
								<div className="stat-number">100%</div>
								<div className="stat-label">Couverture</div>
							</div>
							<div className="stat-card">
								<div className="stat-number">2022</div>
								<div className="stat-label">Version</div>
							</div>
						</div>
					</div>

					<div className="features-grid">
						<div className="feature-card">
							<div className="feature-icon">📊</div>
							<h3 className="feature-title">Tableau de Bord</h3>
							<p className="feature-text">
								Visualisez votre conformité en temps réel avec des graphiques interactifs
							</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">✅</div>
							<h3 className="feature-title">Checklist Complète</h3>
							<p className="feature-text">
								Suivez tous les contrôles ISO 27001:2022 avec une interface moderne
							</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">📄</div>
							<h3 className="feature-title">Rapports PDF/Excel</h3>
							<p className="feature-text">
								Exportez vos audits en PDF ou Excel avec graphiques intégrés
							</p>
						</div>
					</div>

					<div className="config-container">
						<div className="config-header">
							<h2 className="config-title">Commencer un Nouvel Audit</h2>
							<p className="config-subtitle">
								Créez votre fichier d'audit pour démarrer l'évaluation de conformité
							</p>
						</div>
						<ConfigComponent withRedirect redirect={this.redirect} />
					</div>
				</div>
			</div>
		)
	}
}

export default HomePage