<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        add user to conversation
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="create()">
          <div class="form-group">
            <label >select user to add to conversation</label>
            <select class="form-control" multiple v-model="form.users">
              <option  v-for="user in Myusers" :id="user.id" :value="user.id" v-if="select(user)">{{user.name}}</option>
            </select>
            <button class="btn btn-outline-success  mt-3"><i class="fa fa-plus"></i>add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "createConversation",
  data(){
    return {
      form : {
        users : [],
      }
    }
  },
  computed : mapGetters({
    Myusers : 'getUsers'
  }),
  methods : {
    create(){
      this.$store.dispatch('message/addUsersToConversation',{
        users : this.form.users,
        conversation : this.conversation
      })

    },
    select(user){
      let i = 0
      while (i < this.conversation.users.length){
        if(this.conversation.users[i].id === user.id){
          return false
        }else {
          i++
        }
      }
      return true
    }
  },
  props : {
    conversation : {
      required : true,
      type : Object
    }
  }
}
</script>

<style scoped>

</style>
