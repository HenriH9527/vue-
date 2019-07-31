import { ajax } from '@/utils';

/**
 * 获取任务列表
 * @param {*} params {project_id: 项目ID }
 */
export const getTasks = async params => ajax.post('/project/task_list', params);

/**
 * 获取任务信息
 * @param {*} params {task_id: 任务ID  }
 */
export const getTaskInfo = async params => ajax.post('/project/task', params);

/**
 *  发布任务动态
 * @param {*} params {task_id: 任务ID,user_id: 用户ID,content: 动态内容}
 */
export const publishTaskNews = async params => ajax.post('/project/task_pub_dyna', params);

/**
 *  获取任务动态列表
 * @param {*} params {task_id: 任务id  }
 */
export const getTaskNews = async params => ajax.post('/project/task_dyna_list', params);

/**
 *  发布任务动态评论
 * @param {*} params {dynamic_id: 任务动态ID, content: 动态内容, release_user: 用户id  }
 */
export const publishTaskCmt = async params => ajax.post('/project/task_pub_dyna_cmt', params);

/**
 *  获取任务动态评论
 * @param {*} params {dynamic_id: 任务动态ID}
 */
export const getTaskCmt = async params => ajax.post('/project/task_dyna_cmt_list', params);

/**
 *  获取签到列表
 * @param {*} params {data: 签到列表,message:状态消息，offset:分页查询的游标，最开始可以传0 ,size:分页查询的每页大小，最大100}
 */
export const getStudy = async params => ajax.post('/study/list', params);

/**
 * 签到打卡
 * @param {*} params {content:打卡内容}
 */
export const pushStudy = async params => ajax.post('/study/check_in', params);

/**
 * 获取评论列表
 * @param {*} params {checkin_id:签到打卡ID}
 */
export const getCmt = async params => ajax.post('/study/cmt_list', params);

/**
 * 点赞
 * @param {*} params {checkin_id:签到打卡ID}
 */
export const bitStar = async params => ajax.post('/study/star', params);

/**
 * 取消赞
 * @param {*} params {checkin_id:签到打卡ID}
 */
export const unStar = async params => ajax.post('/study/unstar', params);

/**
 * 评论
 * @param {*} params {checkin_id:签到打卡ID}
 */
export const pushCmt = async params => ajax.post('/study/pub_cmt', params);
