import * as data from '../../components/ChecklistTable/consts'
import * as CD from './controlData'
const checklistData = data.checklistData
const HashMap = require('hashmap')

function createFileInLocalStorage(fileConfig) {
    const controlData = CD.controlData
    const file = {
        fileConfig: fileConfig,
        controlData: controlData
    }

    console.log(file)
    localStorage.setItem('iso-data', JSON.stringify(file))
}

function saveToLocalStorageFromFileRead(fileContent) {
    localStorage.setItem('iso-data', fileContent)
}

function retrieveFileInLocalStorage() {
    const data = localStorage.getItem('iso-data')
    if (data === null) {
        return {
            fileConfig: {},
            controlData: CD.controlData
        }
    }
    return JSON.parse(data)
}

function saveDataForSubSubControl(subSubControl, checklistValue, findings, status) {
    const data = retrieveFileInLocalStorage()

    let controlData = data.controlData.map((standard, index) => {
        if (standard.standard === subSubControl) {
            standard.checklistValue = checklistValue
            standard.findings = findings
            standard.status = status

            return standard
        } else return standard
    })

    data['controlData'] = controlData

    localStorage.setItem('iso-data', JSON.stringify(data))
    notifyListeners()
}

function getSubSubControl(subSubControl) {
    const controlData = retrieveFileInLocalStorage().controlData
    return controlData.filter(standard => standard.standard === subSubControl)[0]
}

function calculateControlCompliance(control) {
    const standardsArray = retrieveFileInLocalStorage().controlData.filter(standard => standard.standard.includes(control))

    // Filter out N/A (status -1)
    const applicableStandards = standardsArray.filter(standard => standard.status !== -1)
    const totalElements = applicableStandards.length

    if (totalElements === 0) return 0

    let sum = 0

    applicableStandards.forEach(standard => {
        sum = sum + standard.status
    })

    return Math.round(sum / totalElements)
}

function verifyFileCreated(history) {
    return new Promise((resolve, reject) => {
        if (localStorage.getItem('iso-data') === null) {
            history.push('/')
            reject('File not created')
        } else {
            resolve('File created')
        }
    })
}

// Event System
const listeners = [];

function subscribe(listener) {
    listeners.push(listener);
}

function unsubscribe(listener) {
    const index = listeners.indexOf(listener);
    if (index > -1) {
        listeners.splice(index, 1);
    }
}

function notifyListeners() {
    listeners.forEach(listener => listener());
}

export {
    createFileInLocalStorage,
    retrieveFileInLocalStorage,
    saveDataForSubSubControl,
    getSubSubControl,
    calculateControlCompliance,
    saveToLocalStorageFromFileRead,
    verifyFileCreated,
    subscribe,
    unsubscribe
}