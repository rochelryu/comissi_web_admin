import {localStorageKey} from 'src/constants/localStorageKey';

export class AdminStorage {
    static saveInfoAdmin(infoAdmin) {
        localStorage.setItem(localStorageKey.adminInfo, JSON.stringify(infoAdmin));
    }

    static saveCompetition(infoCompetition) {
        localStorage.setItem(localStorageKey.competitionComici, JSON.stringify(infoCompetition));
    }

    static getInfoCompetition() {
        return JSON.parse(localStorage.getItem(localStorageKey.competitionComici) ?? '{}');
    }

    static saveInfoEdition(infoCompetition) {
        localStorage.setItem(localStorageKey.editionComici, JSON.stringify(infoCompetition));
    }

    static getInfoEdition() {
        return JSON.parse(localStorage.getItem(localStorageKey.editionComici) ?? '{}');
    }

    static getInfoAdmin() {
        return JSON.parse(localStorage.getItem(localStorageKey.adminInfo) ?? '{}');
    }
    
    static saveTokenAdmin(token) {
        localStorage.setItem(localStorageKey.tokenComici, token);
    }

    

    static getTokenAdmin() {
        return localStorage.getItem(localStorageKey.tokenComici);
    }

    static verifyAdminLogged() {
        const token = localStorage.getItem(localStorageKey.tokenComici);
        return token && token.trim().length > 0
    }

    static clearStokage() {
        localStorage.clear();
    }

    static validateNominate() {
        localStorage.setItem(localStorageKey.nomineeComici, '1');
    }

    static getNominate() {
        return localStorage.getItem(localStorageKey.nomineeComici) ?? '';
    }
}