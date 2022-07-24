<template>
     <div class="container">
    <div class="row my-3 ">
      <div class="col-lg-5">
        <div class="card">
           <div class="card-header">
            <p class="text-success h4 fw-bold">Edit Contact</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitform(this.id)">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" v-model="contact.email" id="exampleInputEmail1" aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" v-model="contact.name" id="name" aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="contact_number" class="form-label">Contact Number</label>
                <input type="text" class="form-control" v-model="contact.mobile" id="contact_number" aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="photo_url" class="form-label">Photo Url</label>
                <input type="text" class="form-control" v-model="contact.photo_url" id="photo_url" aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="photo_url" class="form-label">Select Group</label>
                <!-- <input type="text" class="form-control" id="photo_url" aria-describedby="emailHelp"> -->
                <select class="form-select" v-model="contact.groupid" aria-label="Default select example">
                  <!-- <option selected>Select Group</option> -->
                  <option  v-for="sgroup in allgroup" :key="sgroup" :value="sgroup.id" >{{sgroup.name}}</option>
                 
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <img :src="contact.photo_url" class="img" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {ContactService} from '@/services/ContactService.js'
// import { group } from 'console';

export default {
  name: 'EditContact',
  data:function(){
    return{
      contact:{
          name:null,
       email:null,
       mobile:null,
       groupid:null,
       photo_url:null,
      },
      errormessage:null,
      allgroup:null,
      signlegroup:null,
      id:this.$route.params.contactId
    }
  },
  created: async function(){
    try{
        let response = await ContactService.getSingleContacts(this.id);
        this.contact=response.data;
        let groups= await ContactService.getAllGroups();
        this.allgroup=groups.data;
    

    }catch(error){
      this.errormessage=error;
    }
  },
  methods:{
    submitform(id){

      let response=ContactService.updateContacts(this.contact,id);
      if(response != null){
        this.$router.push('/');
      }
    }
  }
 
}
</script>
<style>
.img{
  width: 150px;
}
</style>