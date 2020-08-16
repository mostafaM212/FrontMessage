<template>
  <div class="container mt-5">
    <div class="alert alert-danger" role="alert" v-if="error">
      make sure that your email and password is correctly written.
    </div>
    <h2 class="text-primary">Login</h2>
    <form v-on:submit.prevent="submit">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control"  v-model.lazy="form.email" v-on:keydown="displayMethod">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control"  v-model.lazy="form.password" v-on:change="displayMethod">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="this.display">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      form : {
        email: '',
        password : ''
      },
      display : true,
      error : false
    }
  },
  methods : {
    async submit(){
      let res = await this.$auth.loginWith('local',{
        data : this.form
      }).then(res =>{
        this.$router.push('/')
        this.display =false
      }).catch(e=>{
        this.error = true
      })


    },
    displayMethod(){

      if(this.form.email.length > 3 && this.form.password.length > 3){
        console.log(this.form.email.length )
        this.display =false
      }
    }
  }
}
</script>

<style scoped>

</style>
