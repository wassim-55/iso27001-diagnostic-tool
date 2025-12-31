export const TABLE_HEADER_STANDARD = 'Contrôle'
export const TABLE_HEADER_CHECKLIST = 'Liste de contrôle'
export const TABLE_HEADER_FINDINGS = 'Constatations'
export const TABLE_HEADER_STATUS = 'Statut'

export const CHECKLIST_VALUES = [
    'Non initié',
    'Initié',
    'Défini',
    'Géré',
    'Optimisé'
]

export const checklistData = [
    {
        mainSection: '4',
        section: 'Contexte de l\'organisation',
        subSection: [
            {
                standard: '4.1',
                section: 'Compréhension de l\'organisation et de son contexte',
                standards: [
                    {
                        standard: '4.1.1',
                        description: 'Déterminer les enjeux internes et externes affectant le SMSI.'
                    }
                ]
            },
            {
                standard: '4.2',
                section: 'Compréhension des besoins et attentes des parties intéressées',
                standards: [
                    {
                        standard: '4.2.1',
                        description: 'Identifier les parties intéressées concernées.'
                    },
                    {
                        standard: '4.2.2',
                        description: 'Identifier leurs exigences pertinentes.'
                    },
                    {
                        standard: '4.2.3',
                        description: 'Déterminer quelles exigences seront traitées par le SMSI.'
                    }
                ]
            },
            {
                standard: '4.3',
                section: 'Détermination du domaine d\'application du système de management de la sécurité de l\'information',
                standards: [
                    {
                        standard: '4.3.1',
                        description: 'Définir les limites et l\'applicabilité du SMSI.'
                    },
                    {
                        standard: '4.3.2',
                        description: 'Considérer les enjeux internes/externes (4.1).'
                    },
                    {
                        standard: '4.3.3',
                        description: 'Considérer les exigences des parties intéressées (4.2).'
                    },
                    {
                        standard: '4.3.4',
                        description: 'Identifier interfaces et dépendances externes.'
                    },
                    {
                        standard: '4.3.5',
                        description: 'Documenter le domaine d\'application.'
                    }
                ]
            },
            {
                standard: '4.4',
                section: 'Système de management de la sécurité de l\'information',
                standards: [
                    {
                        standard: '4.4.1',
                        description: 'Établir, mettre en œuvre, tenir à jour et améliorer le SMSI.'
                    },
                    {
                        standard: '4.4.2',
                        description: 'Définir les processus nécessaires et leurs interactions.'
                    }
                ]
            }
        ]
    },
    {
        mainSection: '5',
        section: 'Leadership',
        subSection: [
            {
                standard: '5.1',
                section: 'Leadership et engagement',
                standards: [
                    {
                        standard: '5.1.1',
                        description: 'Assurer l’existence d’une politique et d’objectifs compatibles avec la stratégie.'
                    },
                    {
                        standard: '5.1.2',
                        description: 'Intégrer les exigences du SMSI dans les processus métiers.'
                    },
                    {
                        standard: '5.1.3',
                        description: 'Assurer la disponibilité des ressources nécessaires.'
                    },
                    {
                        standard: '5.1.4',
                        description: 'Communiquer l’importance de la sécurité de l’information.'
                    },
                    {
                        standard: '5.1.5',
                        description: 'S’assurer de l’atteinte des résultats du SMSI.'
                    },
                    {
                        standard: '5.1.6',
                        description: 'Soutenir les personnes dans l’efficacité du SMSI.'
                    },
                    {
                        standard: '5.1.7',
                        description: 'Promouvoir l\'amélioration continue.'
                    },
                    {
                        standard: '5.1.8',
                        description: 'Aider les managers à exercer leur leadership sécurité.'
                    }
                ]
            },
            {
                standard: '5.2',
                section: 'Politique',
                standards: [
                    {
                        standard: '5.2.1',
                        description: 'Établir une politique de sécurité appropriée.'
                    },
                    {
                        standard: '5.2.2',
                        description: 'Fournir un cadre pour les objectifs de sécurité.'
                    },
                    {
                        standard: '5.2.3',
                        description: 'S\'engager à satisfaire aux exigences applicables.'
                    },
                    {
                        standard: '5.2.4',
                        description: 'S\'engager à l\'amélioration continue du SMSI.'
                    },
                    {
                        standard: '5.2.5',
                        description: 'Documenter la politique.'
                    },
                    {
                        standard: '5.2.6',
                        description: 'Communiquer la politique en interne.'
                    },
                    {
                        standard: '5.2.7',
                        description: 'Rendre la politique disponible aux parties intéressées.'
                    }
                ]
            },
            {
                standard: '5.3',
                section: 'Rôles, responsabilités et autorités au sein de l\'organisation',
                standards: [
                    {
                        standard: '5.3.1',
                        description: 'Attribuer et communiquer les rôles et responsabilités.'
                    },
                    {
                        standard: '5.3.2',
                        description: 'Attribuer la responsabilité de conformité au SMSI.'
                    },
                    {
                        standard: '5.3.3',
                        description: 'Attribuer la responsabilité du reporting des performances.'
                    }
                ]
            }
        ]
    },
    {
        mainSection: '6',
        section: 'Planification',
        subSection: [
            {
                standard: '6.1.1',
                section: 'Généralités',
                standards: [
                    {
                        standard: '6.1.1.1',
                        description: 'Déterminer risques et opportunités liés aux enjeux 4.1 et 4.2.'
                    },
                    {
                        standard: '6.1.1.2',
                        description: 'Assurer atteinte des résultats du SMSI.'
                    },
                    {
                        standard: '6.1.1.3',
                        description: 'Prévenir ou réduire les effets indésirables.'
                    },
                    {
                        standard: '6.1.1.4',
                        description: 'Renforcer l\'amélioration continue.'
                    },
                    {
                        standard: '6.1.1.5',
                        description: 'Planifier les actions pour traiter risques/opportunités.'
                    },
                    {
                        standard: '6.1.1.6',
                        description: 'Intégrer les actions dans les processus du SMSI.'
                    },
                    {
                        standard: '6.1.1.7',
                        description: 'Évaluer l’efficacité de ces actions.'
                    }
                ]
            },
            {
                standard: '6.1.2',
                section: 'Appréciation des risques de sécurité de l\'information',
                standards: [
                    {
                        standard: '6.1.2.1',
                        description: 'Définir critères d’acceptation des risques.'
                    },
                    {
                        standard: '6.1.2.2',
                        description: 'Définir critères d’appréciation des risques.'
                    },
                    {
                        standard: '6.1.2.3',
                        description: 'Assurer cohérence et validité des appréciations.'
                    },
                    {
                        standard: '6.1.2.4',
                        description: 'Identifier les risques de CIA sur le périmètre.'
                    },
                    {
                        standard: '6.1.2.5',
                        description: 'Identifier les propriétaires des risques.'
                    },
                    {
                        standard: '6.1.2.6',
                        description: 'Analyser les conséquences des risques.'
                    },
                    {
                        standard: '6.1.2.7',
                        description: 'Évaluer la vraisemblance d’apparition.'
                    },
                    {
                        standard: '6.1.2.8',
                        description: 'Déterminer les niveaux de risques.'
                    },
                    {
                        standard: '6.1.2.9',
                        description: 'Comparer avec critères de risques.'
                    },
                    {
                        standard: '6.1.2.10',
                        description: 'Prioriser les risques pour traitement.'
                    },
                    {
                        standard: '6.1.2.11',
                        description: 'Conserver les informations documentées.'
                    }
                ]
            },
            {
                standard: '6.1.3',
                section: 'Traitement des risques de sécurité de l\'information',
                standards: [
                    {
                        standard: '6.1.3.1',
                        description: 'Choisir options de traitement adaptées.'
                    },
                    {
                        standard: '6.1.3.2',
                        description: 'Déterminer mesures de sécurité nécessaires.'
                    },
                    {
                        standard: '6.1.3.3',
                        description: 'Comparer mesures avec Annexe A.'
                    },
                    {
                        standard: '6.1.3.4',
                        description: 'Établir la Déclaration d’Applicabilité (SoA).'
                    },
                    {
                        standard: '6.1.3.5',
                        description: 'Élaborer un plan de traitement des risques.'
                    },
                    {
                        standard: '6.1.3.6',
                        description: 'Obtenir approbation du plan par les propriétaires.'
                    },
                    {
                        standard: '6.1.3.7',
                        description: 'Conserver les informations documentées.'
                    }
                ]
            },
            {
                standard: '6.2',
                section: 'Objectifs de sécurité de l\'information et plans pour les atteindre',
                standards: [
                    {
                        standard: '6.2.1',
                        description: 'Définir des objectifs conformes à la politique.'
                    },
                    {
                        standard: '6.2.2',
                        description: 'Rendre les objectifs mesurables (si possible).'
                    },
                    {
                        standard: '6.2.3',
                        description: 'Tenir compte des exigences et des résultats des risques.'
                    },
                    {
                        standard: '6.2.4',
                        description: 'Surveiller les objectifs.'
                    },
                    {
                        standard: '6.2.5',
                        description: 'Communiquer les objectifs.'
                    },
                    {
                        standard: '6.2.6',
                        description: 'Mettre à jour les objectifs si nécessaire.'
                    },
                    {
                        standard: '6.2.7',
                        description: 'Documenter les objectifs.'
                    },
                    {
                        standard: '6.2.8',
                        description: 'Définir actions, ressources, responsables, échéances, évaluation.'
                    }
                ]
            },
            {
                standard: '6.3',
                section: 'Planification des modifications',
                standards: [
                    {
                        standard: '6.3.1',
                        description: 'Planifier les modifications du SMSI.'
                    }
                ]
            }
        ]
    },
    {
        mainSection: '7',
        section: 'Supports',
        subSection: [
            {
                standard: '7.1',
                section: 'Ressources',
                standards: [
                    {
                        standard: '7.1.1',
                        description: 'Identifier et fournir les ressources nécessaires.'
                    }
                ]
            },
            {
                standard: '7.2',
                section: 'Compétences',
                standards: [
                    {
                        standard: '7.2.1',
                        description: 'Déterminer les compétences requises.'
                    },
                    {
                        standard: '7.2.2',
                        description: 'S\'assurer de la compétence via formation/expérience.'
                    },
                    {
                        standard: '7.2.3',
                        description: 'Prendre actions pour combler les écarts de compétence.'
                    },
                    {
                        standard: '7.2.4',
                        description: 'Conserver preuves des compétences.'
                    }
                ]
            },
            {
                standard: '7.3',
                section: 'Sensibilisation',
                standards: [
                    {
                        standard: '7.3.1',
                        description: 'Sensibiliser à la politique de sécurité.'
                    },
                    {
                        standard: '7.3.2',
                        description: 'Sensibiliser à sa contribution au SMSI.'
                    },
                    {
                        standard: '7.3.3',
                        description: 'Sensibiliser aux implications des non-conformités.'
                    }
                ]
            },
            {
                standard: '7.4',
                section: 'Communication',
                standards: [
                    {
                        standard: '7.4.1',
                        description: 'Définir sujets, moments, destinataires et moyens de communication.'
                    }
                ]
            },
            {
                standard: '7.5.1',
                section: 'Généralités',
                standards: [
                    {
                        standard: '7.5.1.1',
                        description: 'Inclure les informations documentées requises.'
                    },
                    {
                        standard: '7.5.1.2',
                        description: 'Ajouter celles nécessaires à l’efficacité du SMSI.'
                    }
                ]
            },
            {
                standard: '7.5.2',
                section: 'Création et mise à jour',
                standards: [
                    {
                        standard: '7.5.2.1',
                        description: 'Définir identification et description des documents.'
                    },
                    {
                        standard: '7.5.2.2',
                        description: 'Définir formats et supports.'
                    },
                    {
                        standard: '7.5.2.3',
                        description: 'Revoir et approuver les documents.'
                    }
                ]
            },
            {
                standard: '7.5.3',
                section: 'Contrôle des informations documentées',
                standards: [
                    {
                        standard: '7.5.3.1',
                        description: 'Assurer disponibilité et utilisation appropriée.'
                    },
                    {
                        standard: '7.5.3.2',
                        description: 'Assurer protection contre perte/confidentialité/intégrité.'
                    },
                    {
                        standard: '7.5.3.3',
                        description: 'Gérer distribution et accès.'
                    },
                    {
                        standard: '7.5.3.4',
                        description: 'Gérer stockage et conservation.'
                    },
                    {
                        standard: '7.5.3.5',
                        description: 'Gérer les modifications.'
                    },
                    {
                        standard: '7.5.3.6',
                        description: 'Définir durée de conservation et suppression.'
                    },
                    {
                        standard: '7.5.3.7',
                        description: 'Contrôler documents externes.'
                    }
                ]
            }
        ]
    },
    {
        mainSection: '8',
        section: 'Fonctionnement',
        subSection: [
            {
                standard: '8.1',
                section: 'Planification et contrôle opérationnels',
                standards: [
                    {
                        standard: '8.1.1',
                        description: 'Planifier et contrôler les processus opérationnels.'
                    },
                    {
                        standard: '8.1.2',
                        description: 'Établir critères pour les processus.'
                    },
                    {
                        standard: '8.1.3',
                        description: 'Documenter l\'exécution des processus.'
                    },
                    {
                        standard: '8.1.4',
                        description: 'Contrôler les modifications prévues et imprévues.'
                    },
                    {
                        standard: '8.1.5',
                        description: 'Contrôler produits/services externes.'
                    }
                ]
            },
            {
                standard: '8.2',
                section: 'Appréciation des risques de sécurité de l\'information',
                standards: [
                    {
                        standard: '8.2.1',
                        description: 'Réaliser les appréciations des risques périodiquement.'
                    },
                    {
                        standard: '8.2.2',
                        description: 'Documenter les résultats.'
                    }
                ]
            },
            {
                standard: '8.3',
                section: 'Traitement des risques de sécurité de l\'information',
                standards: [
                    {
                        standard: '8.3.1',
                        description: 'Mettre en œuvre le plan de traitement.'
                    },
                    {
                        standard: '8.3.2',
                        description: 'Documenter les résultats du traitement.'
                    }
                ]
            }
        ]
    },
    {
        mainSection: '9',
        section: 'Évaluation de la performance',
        subSection: [
            {
                standard: '9.1',
                section: 'Surveillance, mesurages, analyse et évaluation',
                standards: [
                    {
                        standard: '9.1.1',
                        description: 'Déterminer ce qui doit être surveillé/mesuré.'
                    },
                    {
                        standard: '9.1.2',
                        description: 'Définir méthodes valides et comparables.'
                    },
                    {
                        standard: '9.1.3',
                        description: 'Définir fréquence de surveillance/mesure.'
                    },
                    {
                        standard: '9.1.4',
                        description: 'Définir les responsables des mesures.'
                    },
                    {
                        standard: '9.1.5',
                        description: 'Définir analyse et évaluation des résultats.'
                    },
                    {
                        standard: '9.1.6',
                        description: 'Documenter les résultats.'
                    },
                    {
                        standard: '9.1.7',
                        description: 'Évaluer performances et efficacité du SMSI.'
                    }
                ]
            },
            {
                standard: '9.2.1',
                section: 'Généralités',
                standards: [
                    {
                        standard: '9.2.1.1',
                        description: 'Réaliser audits internes planifiés.'
                    },
                    {
                        standard: '9.2.1.2',
                        description: 'Vérifier conformité aux exigences internes et ISO.'
                    },
                    {
                        standard: '9.2.1.3',
                        description: 'Vérifier mise en œuvre et maintien du SMSI.'
                    }
                ]
            },
            {
                standard: '9.2.2',
                section: 'Programme d\'audit interne',
                standards: [
                    {
                        standard: '9.2.2.1',
                        description: 'Planifier et maintenir un programme d’audit.'
                    },
                    {
                        standard: '9.2.2.2',
                        description: 'Définir critères et périmètre d’audit.'
                    },
                    {
                        standard: '9.2.2.3',
                        description: 'Sélectionner auditeurs impartiaux.'
                    },
                    {
                        standard: '9.2.2.4',
                        description: 'Communiquer les résultats.'
                    },
                    {
                        standard: '9.2.2.5',
                        description: 'Documenter programmes et résultats.'
                    }
                ]
            },
            {
                standard: '9.3.1',
                section: 'Généralités',
                standards: [
                    {
                        standard: '9.3.1.1',
                        description: 'Réaliser revue de direction périodiquement.'
                    }
                ]
            },
            {
                standard: '9.3.2',
                section: 'Éléments d\'entrée de la revue de direction',
                standards: [
                    {
                        standard: '9.3.2.1',
                        description: 'Examiner actions précédentes.'
                    },
                    {
                        standard: '9.3.2.2',
                        description: 'Examiner modifications enjeux internes/externes.'
                    },
                    {
                        standard: '9.3.2.3',
                        description: 'Examiner modifications besoins des parties.'
                    },
                    {
                        standard: '9.3.2.4',
                        description: 'Examiner performances (NC, surveillance, audit, objectifs).'
                    },
                    {
                        standard: '9.3.2.5',
                        description: 'Examiner retours des parties intéressées.'
                    },
                    {
                        standard: '9.3.2.6',
                        description: 'Examiner résultats des risques et plans associés.'
                    },
                    {
                        standard: '9.3.2.7',
                        description: 'Examiner opportunités d’amélioration.'
                    }
                ]
            },
            {
                standard: '9.3.3',
                section: 'Résultats des revues de direction',
                standards: [
                    {
                        standard: '9.3.3.1',
                        description: 'Décider opportunités d’amélioration et changements.'
                    },
                    {
                        standard: '9.3.3.2',
                        description: 'Documenter les résultats des revues.'
                    }
                ]
            }
        ]
    },
    {
        mainSection: '10',
        section: 'Amélioration',
        subSection: [
            {
                standard: '10.1',
                section: 'Amélioration continue',
                standards: [
                    {
                        standard: '10.1.1',
                        description: 'Améliorer en continu le SMSI.'
                    }
                ]
            },
            {
                standard: '10.2',
                section: 'Non-conformité et action corrective',
                standards: [
                    {
                        standard: '10.2.1',
                        description: 'Réagir aux non-conformités.'
                    },
                    {
                        standard: '10.2.2',
                        description: 'Contrôler et corriger la non-conformité.'
                    },
                    {
                        standard: '10.2.3',
                        description: 'Traiter les conséquences.'
                    },
                    {
                        standard: '10.2.4',
                        description: 'Rechercher causes et non-conformités similaires.'
                    },
                    {
                        standard: '10.2.5',
                        description: 'Mettre en œuvre actions nécessaires.'
                    },
                    {
                        standard: '10.2.6',
                        description: 'Vérifier efficacité des actions correctives.'
                    },
                    {
                        standard: '10.2.7',
                        description: 'Modifier le SMSI si nécessaire.'
                    },
                    {
                        standard: '10.2.8',
                        description: 'Documenter NC et actions prises.'
                    },
                    {
                        standard: '10.2.9',
                        description: 'Documenter résultats des actions correctives.'
                    }
                ]
            }
        ]
    }
]