<template>
   <div class="container">
    <div class="row my-3 ">
      <div class="col-lg-5">
         
        <div class="card">
          <div class="card-header">
            <p class="text-success h4 fw-bold">View Contact</p>
          </div>
          <div class="card-body" v-if="contact != null">
            <!-- <form> -->
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" :value="contact.email" readonly disabled id="exampleInputEmail1" aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" :value="contact.name" readonly disabled  id="name" aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="contact_number" class="form-label">Contact Number</label>
                <input type="text" class="form-control" :value="contact.mobile" readonly disabled  id="contact_number" aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="contact_number" class="form-label">Group</label>
                <input type="text" class="form-control" :value="groupname.name" readonly disabled  id="contact_number" aria-describedby="emailHelp">
              </div>
              <!-- <div class="mb-3">
                <label for="photo_url" class="form-label">Photo Url</label>
                <input type="text" class="form-control" :value="contact.photo_url" readonly disabled  id="photo_url" aria-describedby="emailHelp">
              </div> -->
              
            <!-- </form> -->
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
  name: 'ViewContact',
  data:function(){

    return{ 
      contact:null,
      errormessage:null,
      groupname:null,
      id:this.$route.params.contactId
    }
  },
  created:async function(){
    try{
        let response = await ContactService.getSingleContacts(this.id);
        this.contact=response.data;
        let group= await ContactService.getSingleGroups(this.contact.groupid);
        this.groupname=group.data;
        
    }catch(error){
      this.errormessage=error;
    }
  }
 
}
</script>
<style>
.img{
  width: 150px;
}
</style>