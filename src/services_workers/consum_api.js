import axios from 'axios';

import {apiUrl} from 'src/constants/apiUrl';
import {AdminStorage} from 'src/storages/admins_storage';

export default class ConsumApi {
  static api = axios.create();

  // eslint-disable-next-line class-methods-use-this
  static async createCompetition({base64Cover, base64LastMiss, name_file_cover, name_file_last_miss, title, describe}, router) {
    try {
      const token = AdminStorage.getTokenAdmin();
      const body = {base64Cover: base64Cover.split(',')[1],base64LastMiss: base64LastMiss.split(',')[1], name_file_cover,name_file_last_miss, title, describe, };
      console.log(body);
      const response = await this.api.post(apiUrl.createCompetition, body, {headers: {'Authorization': `Bearer ${token}`}});
      if (response.status === 200) {
        const { data , success, message = ''} = response.data;
          if(success) {
            AdminStorage.saveCompetition(data);
            return { data , success}
          }
          if(!success && message.indexOf('token') !== -1) {
            console.log(message);
            // AdminStorage.clearStokage();
            // router.reload();
            return { error: Error(message) , success};
          }
          return { message , success};
      }
      return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
    } catch (error) {
      return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
    }
  }

  static async setNominate({nominate, event_id}) {
    try {
      const token = AdminStorage.getTokenAdmin();
      const body = {candidates: nominate, event_id, };
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

  static async createEvent({base64, name_file, admin_id ,beginDate, endDate, price, devise, location, typeTicket, level, title}) {
    try {
      const token = AdminStorage.getTokenAdmin();
      const { id } = AdminStorage.getInfoCompetition();
      const body = {base64: base64.split(',')[1], name_file, beginDate, competition_id: id, endDate, price, devise, location, typeTicket,admin_id, level, title: title.trim()};
      const response = await this.api.post(apiUrl.createEvent, body, {headers: {'Authorization': `Bearer ${token}`}});
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
              const {name:nom_complet, email:emailData, access_token, gravatars, role,  } = data;
              AdminStorage.saveInfoAdmin({nom_complet, email:emailData, gravatars, role,  });
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
      const response = await this.api.post(apiUrl.toogleDisplayEvent, {event_id, display, }, {headers: {'Authorization': `Bearer ${token}`}});
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

  static async getAllRole() {
    try {
      const token = AdminStorage.getTokenAdmin();
        const response = await this.api.get(apiUrl.allRoles, {headers: {'Authorization': `Bearer ${token}`}});
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
            console.log(message);
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
  static async getCompetition(router) {
    try {
      const token = AdminStorage.getTokenAdmin();
        const response = await this.api.get(`${apiUrl.getCompetition}`, {headers: {'Authorization': `Bearer ${token}`}});
        if (response.status === 200) {
          const { data , success, message = ''} = response.data;
          console.log({ data , success, message})
          if(success) return { data , success}
          if(!success && (message.indexOf('token') !== -1 || message.indexOf('Erreur') !== -1)) {
            AdminStorage.clearStokage();
            router.reload();
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

    static async getAllAdmin(router) {
      try {
        const token = AdminStorage.getTokenAdmin();
          const response = await this.api.get(apiUrl.getAlladmin, {headers: {'Authorization': `Bearer ${token}`}});
          if (response.status === 200) {
            const { data , success, message = ''} = response.data;
            if(success) return { data , success}
            if(!success && message.indexOf('token') !== -1) {
              AdminStorage.clearStokage();
              router.reload();
              return { message: "Session Expiré veuillez vous réconnecter" , success};
            } 
            return { message , success};
          }
          return {etat: false, error: Error("Un problème avec le serveur. Veuillez réssayer ultérieurement")}
      } catch (error) {
        if(error.message === "Request failed with status code 401") {
          localStorage.clear();
          return {etat: false, error: Error("Session Expiré veuillez vous réconnecter")}
        }
        return {etat: false, error: Error("Un problème lors de l'envoie. Veuillez vérifier votre connexion internet")}
      }
    }
  
    static async createAdmin({nom_complet, email, password, departement_id, role_id, gravatars, contact}) {
      try {
        const token = AdminStorage.getTokenAdmin();
        const body = {nom_complet, email, password, departement_id, role_id, gravatars, contact};
        console.log(body);
          const response = await this.api.post(apiUrl.addadmin, body, {headers: {'Authorization': `Bearer ${token}`}});
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