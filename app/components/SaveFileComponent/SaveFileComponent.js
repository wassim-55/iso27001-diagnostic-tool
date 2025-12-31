import React, { Component } from 'react'
import { Button, Label } from 'reactstrap'
import { retrieveFileInLocalStorage, saveToLocalStorageFromFileRead, calculateControlCompliance } from '../../providers/Storage/storage';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Chart from 'chart.js';
import * as consts from '../SectionComplianceTable/consts';


class SaveFileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fileName: 'ISO27001-2022-',
            loaded: false
        }
    }

    loadDataFromLocalStorage = () => {
        const fileFromLocalStorage = retrieveFileInLocalStorage()
        const newFileName = `${this.state.fileName}${fileFromLocalStorage.fileConfig.filename || 'Audit'}`
        this.setState({ fileName: newFileName, loaded: true })
    }

    componentDidMount = () => {
        this.loadDataFromLocalStorage()
    }

    getStatusText = (status) => {
        switch (status) {
            case 100: return 'Conforme';
            case 75: return 'Partiellement conforme';
            case 25: return 'Partiellement non conforme';
            case 0: return 'Non conforme';
            case -1: return 'Non applicable';
            default: return 'Non défini';
        }
    }

    generateChartImage = () => {
        return new Promise((resolve) => {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');

            // Prepare chart data
            const labels = [];
            const dataValues = [];
            const backgroundColors = [];

            consts.standards.forEach(section => {
                const percentage = calculateControlCompliance(section.standard);
                labels.push(section.standard);
                dataValues.push(percentage);

                // Color based on compliance level
                if (percentage >= 75) {
                    backgroundColors.push('rgba(75, 192, 192, 0.6)'); // Green
                } else if (percentage >= 50) {
                    backgroundColors.push('rgba(255, 206, 86, 0.6)'); // Yellow
                } else if (percentage >= 25) {
                    backgroundColors.push('rgba(255, 159, 64, 0.6)'); // Orange
                } else {
                    backgroundColors.push('rgba(255, 99, 132, 0.6)'); // Red
                }
            });

            // Create chart
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Pourcentage de Conformité (%)',
                        data: dataValues,
                        backgroundColor: backgroundColors,
                        borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    animation: {
                        onComplete: function () {
                            // Convert canvas to base64 image
                            const imageData = canvas.toDataURL('image/png');
                            resolve(imageData);
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: 100,
                                callback: function (value) {
                                    return value + '%';
                                }
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Conformité (%)'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Sections ISO 27001:2022'
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Conformité par Section ISO 27001:2022',
                        fontSize: 16
                    },
                    legend: {
                        display: false
                    }
                }
            });
        });
    }

    exportToPDF = async () => {
        try {
            const { fileName } = this.state;
            const data = retrieveFileInLocalStorage();
            const controlData = data.controlData;
            const fileConfig = data.fileConfig;

            const doc = new jsPDF();

            // Title
            doc.setFontSize(18);
            doc.text('Rapport d\'Audit ISO 27001:2022', 14, 22);

            doc.setFontSize(11);
            doc.text(`Client: ${fileConfig.client || fileConfig.filename || 'N/A'}`, 14, 32);
            doc.text(`Description: ${fileConfig.description || 'N/A'}`, 14, 38);
            doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 14, 44);

            // Summary Table
            const stats = {
                conforme: controlData.filter(c => c.status === 100).length,
                partiellementConforme: controlData.filter(c => c.status === 75).length,
                partiellementNonConforme: controlData.filter(c => c.status === 25).length,
                nonConforme: controlData.filter(c => c.status === 0).length,
                nonApplicable: controlData.filter(c => c.status === -1).length,
                total: controlData.length
            };

            const summaryData = [
                ['Conforme', stats.conforme],
                ['Partiellement conforme', stats.partiellementConforme],
                ['Partiellement non conforme', stats.partiellementNonConforme],
                ['Non conforme', stats.nonConforme],
                ['Non applicable', stats.nonApplicable],
                ['Total', stats.total]
            ];

            doc.autoTable({
                startY: 50,
                head: [['Statut', 'Nombre']],
                body: summaryData,
                theme: 'grid',
                headStyles: { fillColor: [41, 128, 185] },
                columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 50 } }
            });

            // Generate and add chart
            const chartImage = await this.generateChartImage();
            const finalY = doc.lastAutoTable.finalY || 50;

            // Add chart on the same page if there's space, otherwise new page
            if (finalY > 180) {
                doc.addPage();
                doc.setFontSize(14);
                doc.text('Graphique de Conformité par Section', 14, 20);
                doc.addImage(chartImage, 'PNG', 10, 30, 190, 95);
            } else {
                doc.setFontSize(14);
                doc.text('Graphique de Conformité par Section', 14, finalY + 15);
                doc.addImage(chartImage, 'PNG', 10, finalY + 25, 190, 95);
            }

            // Section Compliance Table
            doc.addPage();
            doc.setFontSize(14);
            doc.text('Conformité par Section', 14, 20);

            const sectionTableData = [];
            consts.standards.forEach(section => {
                const percentage = calculateControlCompliance(section.standard);
                sectionTableData.push([
                    section.standard,
                    section.description,
                    `${percentage}%`
                ]);
            });

            doc.autoTable({
                startY: 30,
                head: [['Section', 'Description', 'Conformité']],
                body: sectionTableData,
                theme: 'striped',
                headStyles: { fillColor: [52, 73, 94] },
                columnStyles: {
                    0: { cellWidth: 20 },
                    1: { cellWidth: 120 },
                    2: { cellWidth: 30 }
                }
            });

            // Detail Table
            doc.addPage();
            doc.setFontSize(14);
            doc.text('Détails des Contrôles', 14, 20);

            const tableColumn = ["Standard", "Description", "Statut", "Commentaire"];
            const tableRows = [];

            controlData.forEach(control => {
                const controlDataRow = [
                    control.standard,
                    control.description,
                    this.getStatusText(control.status),
                    control.findings || ''
                ];
                tableRows.push(controlDataRow);
            });

            doc.autoTable({
                startY: 30,
                head: [tableColumn],
                body: tableRows,
                theme: 'striped',
                headStyles: { fillColor: [52, 73, 94] },
                columnStyles: {
                    0: { cellWidth: 25 },
                    1: { cellWidth: 60 },
                    2: { cellWidth: 40 },
                    3: { cellWidth: 'auto' }
                },
                styles: { fontSize: 8, overflow: 'linebreak' }
            });

            doc.save(`${fileName}.pdf`);
        } catch (error) {
            console.error('Erreur lors de l\'export PDF:', error);
            alert('Une erreur est survenue lors de l\'export PDF. Veuillez réessayer.');
        }
    }

    exportToExcel = () => {
        try {
            const { fileName } = this.state;
            const data = retrieveFileInLocalStorage();
            const controlData = data.controlData;
            const fileConfig = data.fileConfig;

            const wb = XLSX.utils.book_new();

            // Sheet 1: Summary Statistics
            const stats = {
                conforme: controlData.filter(c => c.status === 100).length,
                partiellementConforme: controlData.filter(c => c.status === 75).length,
                partiellementNonConforme: controlData.filter(c => c.status === 25).length,
                nonConforme: controlData.filter(c => c.status === 0).length,
                nonApplicable: controlData.filter(c => c.status === -1).length,
                total: controlData.length
            };

            const summaryData = [
                { 'Statut': 'Conforme', 'Nombre': stats.conforme },
                { 'Statut': 'Partiellement conforme', 'Nombre': stats.partiellementConforme },
                { 'Statut': 'Partiellement non conforme', 'Nombre': stats.partiellementNonConforme },
                { 'Statut': 'Non conforme', 'Nombre': stats.nonConforme },
                { 'Statut': 'Non applicable', 'Nombre': stats.nonApplicable },
                { 'Statut': 'Total', 'Nombre': stats.total }
            ];

            const wsSummary = XLSX.utils.json_to_sheet(summaryData);
            wsSummary['!cols'] = [{ wch: 30 }, { wch: 15 }];
            XLSX.utils.book_append_sheet(wb, wsSummary, "Résumé");

            // Sheet 2: Section Compliance
            const sectionData = consts.standards.map(section => ({
                'Section': section.standard,
                'Description': section.description,
                'Conformité (%)': calculateControlCompliance(section.standard)
            }));

            const wsSection = XLSX.utils.json_to_sheet(sectionData);
            wsSection['!cols'] = [{ wch: 10 }, { wch: 50 }, { wch: 15 }];
            XLSX.utils.book_append_sheet(wb, wsSection, "Conformité par Section");

            // Sheet 3: Detailed Controls
            const excelData = controlData.map(control => ({
                Standard: control.standard,
                Description: control.description,
                Statut: this.getStatusText(control.status),
                Score: control.status === -1 ? 'N/A' : control.status,
                Commentaire: control.findings || ''
            }));

            const wsDetails = XLSX.utils.json_to_sheet(excelData);
            wsDetails['!cols'] = [
                { wch: 10 },
                { wch: 50 },
                { wch: 25 },
                { wch: 10 },
                { wch: 50 }
            ];
            XLSX.utils.book_append_sheet(wb, wsDetails, "Détails des Contrôles");

            XLSX.writeFile(wb, `${fileName}.xlsx`);
        } catch (error) {
            console.error('Erreur lors de l\'export Excel:', error);
            alert('Une erreur est survenue lors de l\'export Excel. Veuillez réessayer.');
        }
    }

    render = () => {
        const { loaded } = this.state
        return (
            <div className="wrapper center-aligning pd-10px">
                {
                    loaded && this.props.type === 'save' &&
                    <div className="wrapper center-aligning" style={{ gap: '15px' }}>
                        <Label><strong>EXPORTER LE RAPPORT</strong></Label>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                            <Button color='danger' onClick={this.exportToPDF}>
                                EXPORTER EN PDF
                            </Button>
                            <Button color='success' onClick={this.exportToExcel}>
                                EXPORTER EN EXCEL
                            </Button>
                        </div>
                    </div>
                }
                {/* Note: Save to text feature removed as per request "remove save to text file" */}
            </div>
        )
    }
}

export default SaveFileComponent