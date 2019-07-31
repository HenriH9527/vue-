import { ajax } from '@/utils';

/**
 * 获取项目详情
 * @param {*} params {project_id: 项目id, offset: 分页游标, size: 分页查询每页大小 }
 */
export const getProject = async params => ajax.post('/project/list', params);

/**
 * 获取项目详情
 * @param {*} params {project_id: 项目id }
 */
export const getProjectInfo = async params => ajax.post('/project/item', params);

/**
 *  发布项目动态
 * @param {*} params {project_id: 项目ID, user_id: 用户ID, title:动态标题, content:动态内容  }
 */
export const publishNews = async params => ajax.post('/project/pub_dyna', params);

/**
 * 发布实战项目动态评论
 * @param {*} params {dynamic_id: 动态ID, user_id: 用户ID, comment: 评论内容  }
 */
export const publishNewsCmt = async params => ajax.post('/project/pub_dyna_cmt', params);

/**
 * 获取实战项目动态列表
 * @param {*} params {dynamic_id: 动态id}
 */
export const getProjectNews = async params => ajax.post('/project/dyna_list', params);

/**
 * 点赞项目动态
 * @param {*} params {user_id: 用户ID, project_dynamic_id: 动态ID}
 */
export const starNews = async params => ajax.post('/project/dyna_star', params);

/**
 * 取消点赞项目动态
 * @param {*} params {user_id: 用户ID, project_dynamic_id: 动态ID}
 */
export const unStarNews = async params => ajax.post('/project/dyna_unstar', params);

/**
 * 获取项目动态评论列表
 * @param {*} params {project_dynamic_id: 动态ID  }
 */
export const getNewsCmt = async params => ajax.post('/project/dyna_cmt_list', params);

/**
 * 收藏项目
 * @param {*} params {user_id: 用户ID, project_id: 项目ID }
 */
export const starProject = async params => ajax.post('/project/star', params);

/**
 * 取消收藏项目
 * @param {*} params {user_id: 用户ID, project_id: 项目ID }
 */
export const unStarProject = async params => ajax.post('/project/unstar', params);

/**
 *  参加实战
 * @param {*} params {user_id: 用户ID, project_id: 项目ID }
 */
export const joinProject = async params => ajax.post('/project/partake', params);

/**
 *  退出实战
 * @param {*} params {user_id: 用户ID, project_id: 项目ID }
 */
export const exitProject = async params => ajax.post('/project/unpartake', params);

