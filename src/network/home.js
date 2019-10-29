import{request} from "./request";

export function getHomeMultidata() {
  return request({
    url:'/api/v1/home/multidata?type=pop'
  })
}
export function getHomeGoods(type,page) {
  return request({
    url:'/api/v1/home/data',
    params:{
      type,
      page
    }
    }
  )
}
