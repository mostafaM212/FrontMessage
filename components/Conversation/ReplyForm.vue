<template>
  <div class="container">
    <div class="alert alert-danger" v-if="dis" role="alert">
      Write an message
    </div>
    <form v-on:submit.prevent="reply">
        <div class="form-group">
          <textarea  cols="30" rows="4" class="form-control" placeholder="Reply" v-model="body"></textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-outline-success">Replay</button>
        </div>
    </form>
  </div>
</template>

<script>
export default {
name: "ReplyForm",
  data(){
  return {
      body : null,
      dis : false
  }
  },
  methods : {
    reply(){
      if (this.body !== null){
        this.dis=false
        try {
          this.$store.dispatch('message/createConversationReply',{id : this.id , body : this.body})
        }catch (e) {
          console.log(e)
        }
      }else {
        this.dis=true
      }
    },

  },
  props : {
    id : {
      required : true
    }
  }
}
</script>

<style scoped>

</style>
