import axios from 'axios';

import {apiUrl} from 'src/constants/apiUrl';
import {AdminStorage} from 'src/storages/admins_storage';

export default class ConsumApi {
  static api = axios.create();

  // eslint-disable-next-line class-methods-use-this
  static async createCompetition({base64, name_file, title, describe}) {
    try {
      const token = AdminStorage.getTokenAdmin();
      const {admin_id} = AdminStorage.getInfoAdmin();
      const body = {base64: base64.split(',')[1], name_file, title, describe, admin_id};
      const response = await this.api.post(apiUrl.createCompetition, body, {headers: {'Authorization': `Bearer ${token}`}});
      if (response.status === 200) {
        const { data , success, message = ''} = response.data;
          if(success) {
            AdminStorage.saveCompetition(data);
            return { data , success}
          }
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
      }
      return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  static async setNominate({nominate}) {
    try {
      const token = AdminStorage.getTokenAdmin();
      const {admin_id} = AdminStorage.getInfoAdmin();
      const { id } = AdminStorage.getInfoEdition();
      const body = {candidates: nominate, event_id: id, admin_id};
      const response = await this.api.post(apiUrl.setNominate, body, {headers: {'Authorization': `Bearer ${token}`}});
      if (response.status === 200) {
        const { data , success, message = ''} = response.data;
          if(success) {
            AdminStorage.validateNominate();
            return { data , success}
          }
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
      }
      return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  static async createEvent({base64, name_file, beginDate, endDate, price, devise, location, typeTicket}) {
    try {
      const token = AdminStorage.getTokenAdmin();
      const {admin_id} = AdminStorage.getInfoAdmin();
      const { id } = AdminStorage.getInfoCompetition();
      const body = {base64: base64.split(',')[1], name_file, beginDate, competition_id:id, endDate, price, devise, location, typeTicket, admin_id};
      console.log(body);
      const response = await this.api.post(apiUrl.createEvent, body, {headers: {'Authorization': `Bearer ${token}`}});
      console.log(response.data);
      if (response.status === 200) {
        const { data , success, message = ''} = response.data;
          if(success) {
            AdminStorage.saveInfoEdition(data);
            return { data , success}
          }
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
      }
      return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  static async getDetailsEvent({eventId}) {
    try {
      
      const token = AdminStorage.getTokenAdmin();
      console.log({
        url: `${apiUrl.detailEvent}/${eventId}`,
      })
      console.log(token);
        const response = await this.api.get(`${apiUrl.detailEvent}/${eventId}`, {headers: {'Authorization': `Bearer ${token}`}});
        if (response.status === 200) {
          const { data , success, message = ''} = response.data;
          if(success) return { data , success}
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
        }
        return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  static async getAllActuality() {
    try {
      
      const token = AdminStorage.getTokenAdmin();
        const response = await this.api.get(apiUrl.getAllactuality, {headers: {'Authorization': `Bearer ${token}`}});
        if (response.status === 200) {
          const { data , success, message = ''} = response.data;
          if(success) return { data , success}
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
        }
        return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  static async createActuality({base64, title, autherName, name_file, content, hat}) {
    try {
      const token = AdminStorage.getTokenAdmin();
      const body = {base64: base64.split(',')[1], name_file, title, autherName, content, hat};
        const response = await this.api.post(apiUrl.postactuality, body, {headers: {'Authorization': `Bearer ${token}`}});
        if (response.status === 200) {
          const { data , success, message = ''} = response.data;
          if(success) return { data , success}
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
        }
        return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  
  

  static async login({email, password}) {
      try {
          const response = await this.api.post(apiUrl.authentication, {email, password});
          if (response.status === 200) {
            const { data , success, message = ''} = response.data;
            if(success) {
              const {name:nom_complet, email:emailData, access_token, gravatars, role, admin_id } = data;
              AdminStorage.saveInfoAdmin({nom_complet, email:emailData, gravatars, role, admin_id });
              AdminStorage.saveTokenAdmin(access_token);
              return { data , success};
            }
            return { message , success};
            
            
          }
          return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
      } catch (error) {
        return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
      }
  }

  static async toogleEvent({event_id, display}) {
    try {
      const token = AdminStorage.getTokenAdmin();
      const {admin_id} = AdminStorage.getInfoAdmin();
      console.log({event_id, display, admin_id});
      const response = await this.api.post(apiUrl.toogleDisplayEvent, {event_id, display, admin_id}, {headers: {'Authorization': `Bearer ${token}`}});
      if (response.status === 200) {
        const { data , success, message = ''} = response.data;
          if(success) {
            return { data , success}
          }
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
      }
      return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  static async setNumberNominate({event_id, ranking, candidate_id}) {
    try {
      const token = AdminStorage.getTokenAdmin();
      console.log({event_id, ranking, candidate_id});
      const response = await this.api.post(apiUrl.addNumberNominate, {event_id, ranking, candidate_id}, {headers: {'Authorization': `Bearer ${token}`}});
      if (response.status === 200) {
        const { data , success, message = ''} = response.data;
          if(success) {
            return { data , success}
          }
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
      }
      return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  // Gestion departements

  static async getAllDepartement() {
    try {
      const token = AdminStorage.getTokenAdmin();
        const response = await this.api.get(apiUrl.allDepartements, {headers: {'Authorization': `Bearer ${token}`}});
        if (response.status === 200) {
          const { data , success, message = ''} = response.data;
          if(success) return { data , success}
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
        }
        return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  static async createDepartement({nom_departement}) {
    try {
      const token = AdminStorage.getTokenAdmin();
        const response = await this.api.post(apiUrl.createDepartement, {nom_departement}, {headers: {'Authorization': `Bearer ${token}`}});
        if (response.status === 200) {
          const { data , success, message = ''} = response.data;
          if(success) return { data , success}
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
        }
        return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  // Gestion Candidate

  static async getAllCandidateActive() {
    try {
      const token = AdminStorage.getTokenAdmin();
        const response = await this.api.get(apiUrl.allCandidateActive, {headers: {'Authorization': `Bearer ${token}`}});
        if (response.status === 200) {
          const { data , success, message = ''} = response.data;
          if(success) return { data , success}
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
        }
        return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  // Gestion Competitions
  static async getCompisition() {
    try {
      const token = AdminStorage.getTokenAdmin();
      const {admin_id} = AdminStorage.getInfoAdmin();
        const response = await this.api.get(`${apiUrl.getCompetition}/${admin_id}`, {headers: {'Authorization': `Bearer ${token}`}});
        if (response.status === 200) {
          const { data , success, message = ''} = response.data;
          if(success) return { data , success}
          if(!success && message.indexOf('token') !== -1) {
            AdminStorage.clearStokage();
            return { message: "Session Expiré veuillez vous réconnecter" , success};
          } 
          return { message , success};
        }
        return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

    // Gestion departements

    static async getAllAdmin() {
      try {
        const token = AdminStorage.getTokenAdmin();
          const response = await this.api.get(apiUrl.getAlladmin, {headers: {'Authorization': `Bearer ${token}`}});
          if (response.status === 200) {
            const { data , success, message = ''} = response.data;
            if(success) return { data , success}
            if(!success && message.indexOf('token') !== -1) {
              AdminStorage.clearStokage();
              return { message: "Session Expiré veuillez vous réconnecter" , success};
            } 
            return { message , success};
          }
          return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
      } catch (error) {
        return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
      }
    }
  
    static async createAdmin({nom_complet, email, password, departement_id, role_id, gravatars, contact}) {
      try {
        const token = AdminStorage.getTokenAdmin();
        const body = {nom_complet, email, password, departement_id, role_id, gravatars, contact};
        console.log({body, token, url:apiUrl.addadmin });
          const response = await this.api.post(apiUrl.addadmin, {nom_complet, email, password, departement_id, role_id, gravatars, contact}, {headers: {'Authorization': `Bearer ${token}`}});
          if (response.status === 200) {
            const { data , success, message = ''} = response.data;
            if(success) return { data , success}
            if(!success && message.indexOf('token') !== -1) {
              AdminStorage.clearStokage();
              return { message: "Session Expiré veuillez vous réconnecter" , success};
            } 
            return { message , success};
          }
          return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
      } catch (error) {
        return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
      }
  }

}