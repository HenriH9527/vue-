const msg = {
  state: {
    sortFlag: false,
    dynamicId: 0,
    // pagination分页的各类消息总数量
    cmtNum: '',
    praiseNum: '',
    sysMsgNum: '',
    showCmtPagination: 'none',
    showPraisePagination: 'none',
    showMsgPagination: 'none',
    // 各位消息未读数量
    cmtUnreadNum: 0,
    praiseUnreadNum: 0,
    sysMsgUnreadNum: 0,
    // 所有消息
    allMsgRead: false,
    // 点赞评论
    cmtAndPraiseRead: false,
    // 系统消息
    SysMsgRead: false,
    // 系统消息（显示数目的）
    SysMsgNumRead: false,
    // 我的评论
    cmtMsgRead: false,
    // 我的点赞
    praiseMsgRead: false,
  },
  mutations: {
    // 将动态数据排序flag设为true，即需要排序
    handleSortFlag(state) {
      state.sortFlag = true;
    },
    // 将动态数据排序flag设为false,即不需要排序
    cancelSortFlag(state) {
      state.sortFlag = false;
    },
    // 发送需要置顶的动态id
    sendDynamicId(state, num) {
      state.dynamicId = num;
    },
    // 检查是否有未读消息，若无，则各消息界面不显示红点
    checkAllMsgIsRead(state) {
      // 若所有消息为0，则navbar的消息处红点不显示
      if (state.cmtUnreadNum === 0 && state.praiseUnreadNum === 0 && state.sysMsgUnreadNum === 0) {
        state.allMsgRead = false;
      } else state.allMsgRead = true;
      // 若评论及点赞消息为0，则点赞评论处红点不显示
      if (state.cmtUnreadNum === 0 && state.praiseUnreadNum === 0) {
        state.cmtAndPraiseRead = false;
      } else state.cmtAndPraiseRead = true;
      // 若评论消息为0，则评论数目不显示
      if (state.cmtUnreadNum === 0) {
        state.cmtMsgRead = false;
      } else state.cmtMsgRead = true;
      // 若点赞消息为0，则点赞数目不显示
      if (state.praiseUnreadNum === 0) {
        state.praiseMsgRead = false;
      } else state.praiseMsgRead = true;
      // 若系统消息为0，则系统消息红点及数目不显示
      if (state.sysMsgUnreadNum === 0) {
        state.SysMsgRead = false;
        state.SysMsgNumRead = false;
      } else {
        state.SysMsgRead = true;
        state.SysMsgNumRead = true;
      }
    },
    checkCmtAndPraiseIsRead(state) {
      if (state.cmtUnreadNum === 0 && state.praiseUnreadNum === 0) {
        state.cmtAndPraiseRead = false;
      } else state.cmtAndPraiseRead = true;
    },
    checkSysMsgRead(state) {
      if (state.sysMsgUnreadNum === 0) {
        state.SysMsgRead = false;
      } else state.SysMsgRead = true;
    },
    // 将各类未读消息总数目传送至vuex
    sendUnreadCmtNum(state, num) {
      state.cmtUnreadNum = num;
    },
    sendUnreadPraiseNum(state, num) {
      state.praiseUnreadNum = num;
    },
    sendUnreadSysMsgNum(state, num) {
      state.sysMsgUnreadNum = num;
    },
    // 将各类未读消息+1
    addUnreadCmtNum(state) {
      state.cmtUnreadNum += 1;
    },
    addUnreadPraiseNum(state) {
      state.praiseUnreadNum += 1;
    },
    addUnreadSysMsgNum(state) {
      state.sysMsgUnreadNum += 1;
    },
    // 各消息-1
    handleCmtUnreadNum(state) {
      if (state.cmtUnreadNum >= 1) {
        state.cmtUnreadNum -= 1;
      }
    },
    handlePraiseUnreadNum(state) {
      if (state.praiseUnreadNum >= 1) {
        state.praiseUnreadNum -= 1;
      }
    },
    handleSysMsgUnreadNum(state) {
      if (state.sysMsgUnreadNum >= 1) {
        state.sysMsgUnreadNum -= 1;
      }
    },
    // 将各类消息设为未读，留备用
    unReadAllMsg(state) {
      state.allMsgRead = true;
    },
    unReadcmtAndPraise(state) {
      state.cmtAndPraiseRead = true;
    },
    unReadcmt(state) {
      state.cmtMsgRead = true;
    },
    unReadPraise(state) {
      state.praiseMsgRead = true;
    },
    unReadSysMsg(state) {
      state.SysMsgRead = true;
    },
    // 将各类消息设为已读，留备用
    readcmt(state) {
      state.cmtMsgRead = false;
    },
    readPraise(state) {
      state.praiseMsgRead = false;
    },
    readSysMsg(state) {
      state.SysMsgRead = false;
    },
    // 将各类消息总数目传送至vuex
    sendCmtNum(state, num) {
      state.cmtNum = num;
    },
    sendPraiseNum(state, num) {
      state.praiseNum = num;
    },
    sendSysMsgNum(state, num) {
      state.sysMsgNum = num;
    },
    // 显示各类消息页面分页器
    showCmtPagi(state) {
      state.showCmtPagination = 'block';
    },
    hideCmtPagi(state) {
      state.showCmtPagination = 'none';
    },
    showPraisePagi(state) {
      state.showPraisePagination = 'block';
    },
    // 隐藏各类消息页面分页器
    hidePraisePagi(state) {
      state.showPraisePagination = 'none';
    },
    showSysMsgPagi(state) {
      state.showMsgPagination = 'block';
    },
    hideSysMsgPagi(state) {
      state.showMsgPagination = 'none';
    },
  },
  actions: {
    async modifyData({ commit }) {
      commit('SEND_MODIFY_DATA');
    },
  },
};

export default msg;
