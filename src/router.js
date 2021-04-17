import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 定义路由
const routes = [{
  path: '/',
  name: 'index',
  component: () => import('@/views/index/index.vue'),
  redirect: '/index',
  //嵌套路由
  children: [{
    path: '/index',
    component: () => import('@/components/common/routerView.vue'),
    children: [{
      path: '/',
      component: () => import('@/views/tabIndex/index.vue'),
      meta: {
          background: "#f2f2f2"
      }
    }]
  }]
},{
  path: '/about',
  name: 'about',
  component: () => import('@/views/About.vue')
},{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/login.vue')
},{
  path: '/skeleton',
  name: 'skeleton',
  component: () => import('@/components/Skeleton/index.vue'),
},]
//实例化VueRouter
const router =new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
console.log(router)

//全局路由守卫
router.beforeEach((to,from,next)=>{
  //设置背景颜色

  let item = to.matched.find((e) => {
      return Object.keys(e.meta).length
  })

  to.query.storeId && localStorage.setItem("visitCId", to.query.storeId)

  if (item) {
      //设置背景颜色
      if (item.meta.background) {
          document.querySelector("body").style.background = item.meta.background;
      } else {
          document.querySelector("body").style.background = null;

      }
      if (item.meta.title) {
          document.title = item.meta.title;
      } else {
          document.title = '觅享相册';

      }

  } else {
      document.title = '觅享相册';
      document.querySelector("body").style.background = null;

  }
  if (to.query.title) {
      document.title = to.query.title;

  }

  next();
})

//导出路由对象
export default router

