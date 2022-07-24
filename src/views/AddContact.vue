<template>
  <div class="container">
    <div class="row my-3 ">
      <div class="col-lg-5">
        <div class="alert alert-success" v-if="submitmessage != null" role="alert">
          {{this.submitmessage}}
        </div>
        <div class="card">
           <div class="card-header">
            <p class="text-success h4 fw-bold">Add Contact</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" v-model="contact.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
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
              <div class="mb-3" v-if="groups.length>0">
                <label for="photo_url" class="form-label">Select Group</label>
                <!-- <input type="text" class="form-control" id="photo_url" aria-describedby="emailHelp"> -->
                <select class="form-select" v-model="contact.groupid"  aria-label="Default select example">
                  <option selected>Select Group</option>
                  <option v-for="group in groups" :key="group" :value="group.id">{{group.name}}</option>
                 
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
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

export default {
  name: 'AddContact',
  data:function(){
    return{

      contact: {
        name:null,
       email:null,
       mobile:null,
       groupid:null,
       photo_url:null,
      },
       submitmessage:null,
       groups:[],
       errromessage:null
    }
  },
   created : async function(){
    console.log(ContactService)
      try{
          let response= await ContactService.getAllGroups();
          console.log(response.data)
          this.groups=response.data;
      }catch(error){
        this.errromessage=error;
      }
  },
  methods:{
    submitForm(event){
      console.log(this.contact)
      if(this.contact != null){
        let submitform= ContactService.createContacts(this.contact);
        if(submitform != null){
          this.submitmessage="Form Submited Successfull";
        }
            event.target.reset();

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