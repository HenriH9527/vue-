const task = {
  state: {
    taskNum: '',
    showPagination: 'none',
  },
  mutations: {
    sendTaskNum(state, num) {
      state.taskNum = num;
    },
    showPagi(state) {
      state.showPagination = 'block';
    },
    hidePagi(state) {
      state.showPagination = 'none';
    },
  },
};

export default task;
