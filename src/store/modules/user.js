import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user' // 引入登录接口
// 状态
const state = {
  // 设置token为共享状态
  token: getToken() //设置token为共享状态  初始化的时候，先从缓存里面读取
}
// 修改状态
const mutations = {
  setToken(state, token) {
    // 将数据设置给Vuex
    state.token = token
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null //将vuex的数据置空
    removeToken()
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data)
    if (result) {
      console.log(result)
      // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
      // 现在有用户token
      // actions 修改state 必须通过mutations
      context.commit('setToken', result)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
