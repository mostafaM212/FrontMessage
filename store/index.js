

export const state = ()=>({
  users : [] ,
})

export const getters = {

  getUsers(state){
    return state.users ;
  }
}

export const mutations = {

  setUsers(state,users){
    state.users = users
  }
}
export const actions = {

  async loadUsers({dispatch , commit}){


      let res = await this.$axios.$get('users').then(res =>{
        commit('setUsers',res.data)
      })

  },
}
