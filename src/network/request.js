import axios from 'axios'
//123.207.32.32.8000/api/v1/home/data
export function request(config) {
  //1.创建axios的实例
  const instance=axios.create({
      baseURL:'http://123.207.32.32:8000',
      timeout:5000
    })
  //2.设置拦截器

  instance.interceptors.request.use(config=>{
    return config
  },error => {
    console.log('request拦截失败请求');
    return error
  })

  instance.interceptors.response.use(response=>{
    console.log('response拦截成功响应');
    return response.data
  },error => {
    console.log('response拦截失败响应');
    return error
  })

  //3.发送真正的请求
  return instance(config)
}
