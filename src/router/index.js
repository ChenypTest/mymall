import vue from 'vue'
import Router from 'vue-router'


const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};


const Home=()=>import('../views/home/Home')
const Category=()=>import('../views/category/Category')
const Card=()=>import('../views/card/Card.vue')
const Profile=()=>import('../views/profile/Profile')
const Detail=()=>import('../views/detail/Detail')

//1.安装插件
vue.use(Router)

//2.创建router

const router=new Router({
  routes: [
    {
      path: '/',
      meta:{
        title:'首页'
      },
      redirect:'/home'
    },
    {
      path: '/home',
      component:Home,
      meta:{
        title:'首页'
      }
    },
    {
      path: '/category',
      component:Category,
      meta:{
        title:'分类'
      }
    },
    {
      path: '/card',
      component:Card,
      meta:{
        title:'购物车'
      }
    },
    {
      path: '/profile',
      component:Profile,
      meta:{
        title:'我的'
      }
    },
    {
      path: '/detail',
      component:Detail,
      meta:{
        title:'详情'
      }
    },
  ],
  mode:'history',
  // base: '/dome01/'
})


export default router
