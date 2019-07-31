import { ajax } from '@/utils';

/**
 * 发送手机验证码
 * @param {*} params { phone：手机号码}
 * @returns {*} {status:0 | -1,message: 发送状态消息, data: {},}
 */
export const sendSms = params => ajax.post('/user/send_sms', params);

/**
 * 用户注册
 * @param {*} params {phone: 手机号， sms_code： 手机验证码， password：密码，verify_password： 重复密码 }
 * @returns {*} {status:0 | -1,message: 注册状态消息, data: {},}
 */
export const register = async params => ajax.post('/user/register', params);

/**
 * 用户登录
 * @param {*} params { phone: 手机号, password: 密码}
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 * @data {*} {id, nickname, avatar, phone, mail, create_date:注册时间, gender: 用户性别[m, f, x]}
 */
export const login = async params => ajax.post('/user/login', params);

export const loginOut = async () => ajax.post('/user/logout');

/**
 * 上传用户头像文件
 * @param {*} data { avatar：头像文件}
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 * @data {*} {avatar: 'http.xxxx.com/image.png'（图像地址）}
 */
export const uploadAvatar = async data => ajax.post('/user/upload_avatar', data);

/**
 * 更改绑定电话
 * @param {*} params { phone：旧手机号, new_phone：新手机号，sms_code：验证码}
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const updatePhoneNumber = async params => ajax.post('/user/modify_phone', params);

/**
 * 更改用户信息
 * @param {*} params { nickname：用户名, gender：用户性别}
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const updateUserInfo = async params => ajax.post('/user/modify_user_info', params);

/**
 * 更改密码
 * @param {*} params { password: 旧密码, new_password: 新密码, new_verify_password: 重复新密码}
 * @returns {*} {status:0 | -1,message: 状态消息, data: {},}
 */
export const updatePassword = async params => ajax.post('/user/modify_password', params);

export const getUserInfo = async params => ajax.post('/user/get_user_info', params);

/**
 * 获取用户消息列表
 * @param {*} params { offset: 分页的游标, size: 每页的数量, message_type: 1: 动态点赞，2：动态评论，3：系统消息 }
 */
export const getUserMsg = async params => ajax.post('/user/get_messages', params);

/**
 * 用户将消息置为已读
 * @param {*} params { id: 消息id }
 */
export const setMsgRead = async params => ajax.post('/user/already_read', params);
