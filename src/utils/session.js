
const setItem = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));
const getItem = key => JSON.parse(sessionStorage.getItem(key));
const removeItem = key => sessionStorage.removeItem(key);
const clear = () => sessionStorage.clear();

const setUser = value => setItem('user', value);
const getUser = () => (!getItem('user') ? {} : getItem('user'));
const removeUser = () => removeItem('user');

const isLogin = () => !!getUser().id;

export default {
  setItem,
  getItem,
  removeItem,
  clear,
  setUser,
  getUser,
  isLogin,
  removeUser,
};
