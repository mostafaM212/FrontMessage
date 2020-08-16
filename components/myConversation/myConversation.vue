<template>
  <div class="card card-default mt-5">
    <div class="card-header">
      All conversations
    </div>
    <div class="loader" v-if="loadingConversation">Loading...</div>
    <div class="card-body" v-else-if="conversations.length">
      <div class="media" v-for="(conversation,index) in conversations" :key="index">
        <div class="media-body">
          <a href="" v-on:click.prevent="show(conversation.id)">{{conversation.body}}</a>
          <p class="text-muted">
            You and {{conversation.participate_count}} others
          </p>
          <ul class="list-inline">
            <li>
              <img src="https://www.whittierfirstday.org/wp-content/uploads/default-user-image-e1501670968910.png"
                   style="height: 30px ; width: 30px ; border-radius: 30px"
                   v-for="user in conversation.users"
                   :alt="user.name"
                   :title="user.name"
              >
            </li>
            <li>last reply {{conversation.last_replay}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      No conversation
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  export default {
    name: "myConversation",

    computed : mapGetters({
        conversations : "messages/allConversations",
        loadingConversation : 'messages/getLoading'
    }),
    methods : {
      show(id){
        this.$store.dispatch('message/getConversation',id)
      }
    },
    mounted(){

      return this.$store.dispatch('messages/getConversation')
    }
  }
</script>
<style >
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #0080ff;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

</style>
