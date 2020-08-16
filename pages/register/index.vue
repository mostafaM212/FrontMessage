<template>
  <div class="container mt-5">
    <h2 class="text-primary">Register</h2>
    <form v-on:submit.prevent="submit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" aria-describedby="Name" v-model="form.name" v-on:change="change">
        <small  class="form-text text-danger" v-if="error.hasOwnProperty('name')" v-text="error.name[0]" ></small>
      </div>
      <div class="form-group" v-on:change="change">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form.email">
        <small  class="form-text text-danger" v-if="error.hasOwnProperty('email')" v-text="error.email[0]"></small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password">
        <small  class="form-text text-danger" v-if="error.hasOwnProperty('password')" v-text="error.password[0]"></small>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>


export default {
  name: "index",
  data(){
    return {
      form : {
        name : '',
        email : '',
        password : ''
      },
      error : {},
      url : {}
    }
  },

  methods : {

    async submit(){
      let formData = new FormData()
      formData.append('name',this.form.name)
      formData.append('email',this.form.email)
      formData.append('password',this.form.password)

      let res = await this.$axios.post('/register',formData)

      if(res.data.hasOwnProperty('email') || res.data.hasOwnProperty('password')||res.data.hasOwnProperty('name')){
        this.$router.push('/register')
        this.error = res.data
      }
      await this.$auth.loginWith('local',{
        data : this.form
      })
    },
    change(){
      this.error.password = ''
      this.error.name = ''
      this.error.email = ''
    },

  },



}
</script>

<style scoped>
.image{
  border-radius: 40px;
  height: 40px;
  width: 40px;
}
</style>
