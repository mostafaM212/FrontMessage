<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        create conversation
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="create">
          <div class="form-group">
            <label >select users to add to conversation</label>
            <select class="form-control" multiple v-model="form.users">
              <option  v-for="user in Myusers" :id="user.id" :value="user.id" v-if="$auth.user.email !== user.email">{{user.name}}</option>
            </select>
            <div class="form-group">
              <label for="exampleFormControlInput1">Conversation title</label>
              <input type="text" class="form-control" placeholder="title" v-model="form.body">
            </div>
            <button class="btn btn-outline-success">create</button>
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
        body : ''
      }
    }
  },
  computed : mapGetters({
    Myusers : 'getUsers'
  }),
  methods : {
    create(){
      this.$store.dispatch('messages/setOneConversation',this.form)
    }
  }
}
</script>

<style scoped>

</style>
