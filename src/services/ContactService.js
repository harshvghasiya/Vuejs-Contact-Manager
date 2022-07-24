import axios from 'axios';

export class ContactService{
    static serverUrl= `http://localhost:9000`;

    static getAllContacts(){
        let dataUrl= `${this.serverUrl}/contacts/`;
        return axios.get(dataUrl);
    }
    static getSingleContacts(id){
        let dataUrl= `${this.serverUrl}/contacts/${id}`;
        return axios.get(dataUrl);
    }

    static createContacts(contact){
        let dataUrl= `${this.serverUrl}/contacts/`;
        return axios.post(dataUrl,contact);
    }
    static updateContacts(contact,id){
        let dataUrl= `${this.serverUrl}/contacts/${id}`;
        return axios.put(dataUrl,contact);
    }
    static deleteContacts(id){
        let dataUrl= `${this.serverUrl}/contacts/${id}`;
        return axios.delete(dataUrl);
    }

    static getAllGroups(){
        let dataUrl= `${this.serverUrl}/groups`;
        return axios.get(dataUrl);
    }

    static getSingleGroups(id){
        let dataUrl= `${this.serverUrl}/groups/${id}`;
        return axios.get(dataUrl);
    }

    
}
