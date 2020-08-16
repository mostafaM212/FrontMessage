<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-5 mt-5">
        <app-create />
        <app-conversations/>
      </div>
      <div class="col-sm-7" >
        <app-conversation :id="id"/>

      </div>
    </div>
  </div>
</template>

<script>
import myConversation from "@/components/myConversation/myConversation";
import Conversation from "@/components/Conversation/Conversation";
import createConversation from "@/components/create/createConversation";
export default {
name: "index",
  data(){
  return {
    id : this.$route.params.id
  }
  },
  components : {
    'app-conversations':myConversation ,
    'app-conversation':Conversation,
    'app-create': createConversation
  },
  async asyncData(context){
    context.store.dispatch('loadUsers')
  }
}
</script>

<style scoped>

</style>
