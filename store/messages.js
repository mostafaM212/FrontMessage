import conversation from '@/store/message'

export const state = ()=>({
  conversations : [] ,
  loadingConversations : false
})


export const getters = {
  allConversations(state){
    return state.conversations
  },
  getLoading(state){
    return state.loadingConversations
  }
}
 export const mutations = {

  setConversations(state , conversations){
    state.conversations = conversations
  },
  setLoadingConversations(state , conversations){
    state.loadingConversations = !state.loadingConversations
  },
  addNewConversation(state , conversation){
    return state.conversations.unshift(conversation)
  }
}

export const actions = {

  async getConversation({ dispatch , commit} , page=1){
    commit('setLoadingConversations')
    await this.$axios.$get('/conversations').then(res =>{

      commit('setConversations',res.data ,{root : false})
      commit('setLoadingConversations',{root : false})
    }).catch(err=>{
      console.log(err)
    })
  },
  prependToConversations(state , conversation){
    console.log(conversation)
  },
   async  setOneConversation({dispatch , commit},form){
      let res = await this.$axios.$post('/conversations',form).then(res=>{
        commit('addNewConversation',res.data)
      })
   }
}


export const modules = {
  conversation : conversation
}
