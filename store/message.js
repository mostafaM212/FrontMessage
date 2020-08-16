import api from '@/store/messages'
export const state = ()=>({
  conversation : null ,
  loadingConversation: false
})


export const getters = {
  getConversation(state){
    return  state.conversation
  },
  getLoadingConversation(state){
    return  state.loadingConversation
  }
}
export const mutations = {
  setConversation(state,conversation){
    state.conversation =conversation
  },
  setLoadingConversation(state){
    state.loadingConversation =  !state.loadingConversation
  },
  appendToConversation(state , reply){

    return  state.conversation.replies.unshift(reply)

  }
}

export const actions = {

  async getConversation({dispatch,commit},id){

    commit('setLoadingConversation')
    let res = await this.$axios.$get('conversations/'+id).then(res =>{
      window.history.pushState(null,null,'/conversations/'+id)
      commit('setLoadingConversation')

      commit('setConversation',res.data)
    })
  },
  async createConversationReply({dispatch , commit},{id, body}){
    commit('setLoadingConversation')
    let res = await this.$axios.post('/conversations/'+ id +'/reply',{body : body}).then(res =>{
      commit('appendToConversation',res.data.data)

      commit('setLoadingConversation')
    }).catch(err =>{
      console.log(err)
    })
  },
  async addUsersToConversation({dispatch , commit},form){

    let res = await this.$axios.$post('/conversations/'+ form.conversation.id +'/users',{users : form.users}).then(res=>{
      commit('setConversation',res.data)
    })
  }
}
