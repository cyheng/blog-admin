import axios from 'axios';
import store from '@/store'
import {  Message  } from 'iview'
const instance = axios.create({ timeout: 5000});

instance.interceptors.request.use((config)=>{
  const token = store.getters.token
  if(token)
    config.headers['Authorization'] = token
  return config
},(error)=>{
  console.log(error)
  return Promise.reject(error);
})
//全局失败提示
instance.interceptors.response.use((response)=>{
  //TODO: 多端登录 无效token 过期token
  return response
},(error)=>{
  if(error.response.data.message){
    Message.error(error.response.data.message)
  }else{
    Message.error("失败")
  }
  return Promise.reject(error);
})

function createAPI(baseURL) {
  return function (conf) {
    conf = conf || {};
    return instance(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method
    }, conf.opts));
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export {
  createAPI,
  convertRESTAPI
};
