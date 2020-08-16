<template>
  <div v-if="loading">
    <div class="loader"></div>
  </div>
  <div class="container mt-5" v-else-if="conversation && conversation.user">
    <ul v-if="conversation.users.length"  class="list-inline row">
      <li><strong>in conversation : </strong></li>
      <li v-for="user in conversation.users" class="ml-2" >{{user.name}}</li>
      <li><button class="btn btn-outline-primary ml-3 btn-sm" v-on:click="setshowMe">add users</button></li>
    </ul>

    <hr>
    <reply-form :id="conversation.id" />

    <div v-if="showMe" >
      <new-users  :conversation="conversation" />
    </div>
    <div class="card" >
        <div class="card-body">
          <div class="row" style="height: 25px">
            <img src="https://www.whittierfirstday.org/wp-content/uploads/default-user-image-e1501670968910.png"
                 v-if="conversation.user.name"
                 style="height: 30px ;width: 30px ; border-radius: 30px"

            > <p v-if="conversation.user.name" class="text-wrap ml-3 ">{{ conversation.user.name }} </p>
            <ul>{{conversation.created_at}}</ul>
          </div>
          <div>
            <p class="mt-2">{{conversation.body}}</p>
          </div>
        </div>
      <div class="container" v-if="conversation.replies" v-for="(reply , index) in conversation.replies" :key="index">
        <hr>
        <div class="row" v-if="reply.user">
          <img src="https://www.whittierfirstday.org/wp-content/uploads/default-user-image-e1501670968910.png"

               style="height: 30px ;width: 30px ; border-radius: 30px"
               :title="reply.user.name"
          > <p class="text-wrap ml-3">{{ reply.user.name }} </p>
          <p class="ml-2">{{reply.created_at}}</p>
        </div>
        <div class="card-body">
          {{reply.body}}
        </div>
      </div>
      <div v-else>no comments yet</div>
    </div>
  </div>
  <div v-else>select conversation</div>
</template>

<script>
import ReplyForm from "@/components/Conversation/ReplyForm";
import {mapGetters} from 'vuex'
import AddUserToConversation from "@/components/ConversationUser/AddUserToConversation";
export default {
  name: "Conversation",
  data(){
    return {
      showMe : false
    }
  },
  computed : mapGetters({
    conversation :"message/getConversation" ,
    loading : 'message/getLoadingConversation'
  }),

  props : {
    id : {
      default : null
    }
  },
  mounted() {

    if (this.$route.params.id){
      this.$store.dispatch('message/getConversation',this.id)
    }
  },
  components : {
    'reply-form': ReplyForm,
    'new-users':AddUserToConversation
  },
  methods : {
    setshowMe(){
      this.showMe = true
      setTimeout(()=>{
        this.showMe = false
      },15000)

    }
  }
}
</script>

<style scoped>

</style>
