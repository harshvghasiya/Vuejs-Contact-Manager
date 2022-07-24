<template>
    <div class="container">
      <div class="row mt-3">
        <div class="col">
          <p class="h3 text-success">Contact Manager
          <router-link class="btn btn-sm btn-success" to="/add-contact">Add</router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="alert alert-success" v-if="this.deleted" role="alert">
           Contact Deleted Successfully.
        </div>
      {{this.errromessage}}
      <div class="row" >

        <div class="col-md-6"  v-for="contact in contacts" :key="contact" >
          <div class="card my-2 list-group-item-success shadow-lg">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-4">
                  <img :src="contact.photo_url" alt="user" class="photo_url">
                </div>
                <div class="col-sm-7">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <b>Name : {{contact.name}}</b>
                    </li>
                    <li class="list-group-item">
                      <b>Email : {{contact.email}} </b>
                    </li>
                    <li class="list-group-item">
                      <b>Mobile Number : {{contact.mobile}}</b>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-1 ">
                  <router-link  class="btn btn-warning my-1" :to="{path: '/view-contact/' + contact.id}" ><i class="bi bi-eye"></i></router-link>
                  <router-link class="btn btn-primary my-1" :to="{ path: '/edit-contact/' +contact.id}"><i class="bi bi-pencil"></i></router-link>
                  <a class="btn btn-danger my-1" @click="deletecontact(contact.id)"><i class="bi bi-trash"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {ContactService} from '@/services/ContactService.js'

export default {
  name: 'ContactManager',
  data:function(){
    return {
      contacts:[],
      errromessage:null,
      iserror:false,
      deleted:false    
      }
  },
  created : async function(){
    console.log(ContactService)
      try{
          let response= await ContactService.getAllContacts();
          this.contacts=response.data;
      }catch(error){
        this.errromessage=error;
        this.iserror=true;
      }
  },
  methods:{
    deletecontact: async function(id){
          let response= await ContactService.deleteContacts(id);
          if(response != null){
            this.deleted=true;
             let response= await ContactService.getAllContacts();
          this.contacts=response.data;
          }
    }
  }
}
</script>

<style>
.photo_url{
  width: 150px;;
}
</style>