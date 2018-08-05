import instance from './instance';
import { convertRESTAPI } from '../util';

/** 获取账号信息 */
function user_info_get(opts) {
  return instance({
    method: 'get',
    url:  '/user/info',
    opts: opts
  });
}

/** 登出 */
function logout_post(opts) {
  return instance({
    method: 'post',
    url:  '/logout',
    opts: opts
  });
}

/** 删除分类 */
function admin_categories_delete(opts) {

  return instance({
    method: 'delete',
    url:  '/admin/categories',
    opts: opts
  });
}

/** 修改分类 */
function admin_categories_put(opts) {
  return instance({
    method: 'put',
    url:  '/admin/categories',
    opts: opts
  });
}

/** 添加分类 */
function admin_categories_post(opts) {
  return instance({
    method: 'post',
    url:  '/admin/categories',
    opts: opts
  });
}

/** 删除文章 */
function admin_articles_delete(opts) {
  return instance({
    method: 'delete',
    url:  convertRESTAPI('/admin/articles/{id}',opts),
    opts: opts
  });
}
/** 单篇文章 */
function admin_article_id_get(data,opts) {

  return instance({
    method: 'get',
    url: convertRESTAPI('/admin/articles/{id}', {path:{id:data}}),
    opts: opts
  });
}

/** 修改文章 */
function admin_articles_put(id,opts) {
  return instance({
    method: 'put',
    url:  convertRESTAPI('/admin/articles/{id}', {path:{id}}),
    opts: opts
  });
}

/** 添加一篇文章 */
function admin_articles_post(opts) {
  return instance({
    method: 'post',
    url:  '/admin/articles',
    opts: opts
  });
}

/** 获取全部文章(当前页，每页个数，查询条件) */
function admin_articles_get(opts) {
  return instance({
    method: 'get',
    url:  '/admin/articles',
    opts: opts
  });
}

/** 获取全部评论 */
function admin_comments_get(opts) {
  return instance({
    method: 'get',
    url:  '/admin/comments',
    opts: opts
  });
}

/** 获取全部分类 */
function admin_categories_get(opts) {
  return instance({
    method: 'get',
    url:  '/admin/categories',
    opts: opts
  });
}

/** 返回登录token */
function login_post(opts) {
  return instance({
    method: 'post',
    url:  '/login',
    opts: opts
  });
}
/** 获取文章数量 */
function count_articles_get(opts) {
  return instance({
    method: 'get',
    url:  '/admin/articles/numbers',
    opts: opts
  });
}

/** 获取分类数量 */
function count_categories_get(opts) {
  return instance({
    method: 'get',
    url:  '/admin/categories/numbers',
    opts: opts
  });
}
/** 上传图片 */
function upload_file_post(opts){
  return instance({
    method: 'post',
    url:  '/admin/uploadFile',
    opts: opts
  });
}
/** 关于页获取 */
function admin_about_get(opts){
  return instance({
    method: 'get',
    url:  '/admin/about',
    opts: opts
  });
}
/** 关于页修改 */
function admin_adbout_put(opts){
  return instance({
    method: 'put',
    url:  '/admin/about',
    opts: opts
  });
}
export {
  user_info_get,
  logout_post,
  admin_categories_delete,
  admin_categories_put,
  admin_categories_post,
  admin_articles_delete,
  admin_articles_put,
  admin_articles_post,
  admin_articles_get,
  admin_comments_get,
  admin_categories_get,
  admin_article_id_get,
  login_post,
  count_articles_get,
  count_categories_get,
  upload_file_post,
  admin_about_get,
  admin_adbout_put
};
