import { login, loginOut } from '../../api/user';
import session from '../../utils/session';

const user = {
  state: {
    info: session.getUser(),
  },
  mutations: {
    FLASH_INFO(state, info) {
      state.info = session.getUser();
    },
    CLEAN_INFO(state) {
      state.info = {};
    },
  },
  actions: {
    async userLogin({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        login(loginInfo).then(res => {
          session.setUser(res.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    },
    async userLogout({ commit }) {
      try {
        session.clear();
        commit('CLEAN_INFO');
        await loginOut();
      } catch (e) {
        console.log(e);
      }
    },
    flashInfo({ commit }) {
      commit('FLASH_INFO');
    },
  },
};
export default user;
