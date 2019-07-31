import { ajax } from '@/utils';

/**
 * 管理员登录
 * @param {*} params { phone: 手机号, password: 密码}
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const login = async params => ajax.post('/admin/login', params);

/**
 * 获取实战项目列表
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 * @data {*} 项目列表
 */
export const getProjectList = async () => ajax.post('/admin/project_list');

/**
 * 增加一个实战项目
 * @param {*} params { name: 项目名称, avatar: 封面图, significance: 项目意义，document：说明文档链接，github：github 项目地址}
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const addProject = async params => ajax.post('/admin/append_project', params);

/**
 * 上传项目封面图
 * @param {*} data { avatar：项目封面图}
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 * @data {*} {avatar: 'http.xxxx.com/image.png'（图像地址）}
 */
export const uploadProjectAvatar = async data => ajax.post('/admin/upload_project_avatar', data);

/**
 * 修改实战项目
 * @param {*} params { project_id: 项目id，name: 项目名称, avatar: 封面图, significance: 项目意义，document：说明文档链接，github：github 项目地址}
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const updateProject = async params => ajax.post('/admin/modify_project', params);

/**
 * 删除实战项目
 * @param {*} params { project_id: 项目id }
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const delProject = async params => ajax.post('/admin/delete_project', params);


/**
 * 获取任务列表
 * @param {*} params {project_id: 项目id }
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 * @data {*} 项目列表
 */
export const getTaskList = async () => ajax.post('/admin/project_list');

/**
 * 增加一个实战任务
 * @param {*} params { project_id：项目id，name: 任务名称, target：任务目标，reason：任务原因 }
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const addTask = async params => ajax.post('/admin/append_task', params);

/**
 * 修改实战任务
 * @param {*} params {task_id：任务id，name: 任务名称, target：任务目标，reason：任务原因 }
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const updateTask = async params => ajax.post('/admin/modify_task', params);

/**
 * 删除实战任务
 * @param {*} params { task_id: 任务id }
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const delTask = async params => ajax.post('/admin/delete_task', params);
