const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  userId: (state) => state.user.userInfo.userId,
  name: (state) => state.user.userInfo.username,
  staffPhoto: (state) => state.user.userInfo.staffPhoto,
  companyId: (state) => state.user.userInfo.companyId // 建立对于user模块的companyId的快捷访问
}
export default getters
