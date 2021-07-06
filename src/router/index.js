import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        name: 'Home',
        meta: { title: '首页', active: true }
      }
    ]
  },
  {
    path: '/login',
    component: Layout,
    hidden: true,
    redirect: '/login/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/login'),
        name: 'Login',
        meta: { title: '登录' }
      }
    ]
  },
  {
    path: '/register',
    component: Layout,
    hidden: true,
    redirect: '/register/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/register'),
        name: 'Register',
        meta: { title: '注册' }
      }
    ]
  },
  {
    path: '/square',
    component: Layout,
    redirect: '/square/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/square'),
        name: 'Square',
        meta: { title: '广场' }
      }
    ]
  },
  {
    path: '/site-list',
    component: Layout,
    redirect: '/site-list/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/site-list'),
        name: 'SiteList',
        meta: { title: '导航' }
      }
    ]
  },
  {
    path: '/questions',
    component: Layout,
    redirect: '/questions/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/questions'),
        name: 'Questions',
        meta: { title: '问答' }
      }
    ]
  },
  {
    path: '/knowledge',
    component: Layout,
    redirect: '/knowledge/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/knowledge'),
        name: 'Knowledge',
        meta: { title: '体系' }
      }
    ]
  },
  {
    path: '/project-list',
    component: Layout,
    redirect: '/project-list/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/project-list'),
        name: 'ProjectList',
        meta: { title: '项目' }
      }
    ]
  },
  {
    path: '/wechat-articles',
    component: Layout,
    redirect: '/wechat-articles/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/wechat-articles'),
        name: 'WeChatArticles',
        meta: { title: '公众号' }
      }
    ]
  },
  {
    path: '/favorite-list',
    component: Layout,
    hidden: true,
    redirect: '/favorite-list/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/favorite-list'),
        name: 'FavoriteList',
        meta: { title: '收藏列表' }
      }
    ]
  },
  {
    path: '/ranking-list',
    component: Layout,
    hidden: true,
    redirect: '/ranking-list/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/ranking-list'),
        name: 'RankingList',
        meta: { title: '排行榜' }
      }
    ]
  },
  {
    path: '/search-result',
    component: Layout,
    hidden: true,
    redirect: '/search-result/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/search-result'),
        name: 'SearchResult',
        meta: { title: '搜索结果' }
      }
    ]
  },
  {
    path: '/todo',
    component: Layout,
    hidden: true,
    redirect: '/todo/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/todo'),
        name: 'Todo',
        meta: { title: '待办清单' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/user'),
        name: 'User',
        meta: { title: '用户分享' }
      }
    ]
  },
  {
    path: '/share-list',
    component: Layout,
    hidden: true,
    redirect: '/share-list/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/share-list'),
        name: 'ShareList',
        meta: { title: '分享列表' }
      }
    ]
  },
  {
    path: '/notifications',
    component: Layout,
    hidden: true,
    redirect: '/notifications/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/notifications'),
        name: 'Notifications',
        meta: { title: '站内消息' }
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
