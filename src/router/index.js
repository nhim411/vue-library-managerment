import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'User Manager'
    },
    path: '/users',
    name: 'UserManager',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "UserManager" */ '@/views/UserManager.vue')
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "tables" */ '@/views/Tables.vue')
  },
  {
    meta: {
      title: 'Forms',
      requiresAuth: true
    },
    path: '/forms',
    name: 'forms',
    component: () =>
      import(/* webpackChunkName: "forms" */ '@/views/Forms.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
  },
  {
    meta: {
      title: 'New Users'
    },
    path: '/users/new',
    name: 'users.new',
    component: () =>
      import(/* webpackChunkName: "create-user-form" */ '@/views/CreateUserForm.vue')
  },
  {
    meta: {
      title: 'Edit User'
    },
    path: '/users/:id',
    name: 'users.edit',
    component: () =>
      import(/* webpackChunkName: "client-form" */ '@/views/CreateUserForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'Book Manager'
    },
    path: '/books',
    name: 'BookManager',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "BookManager" */ '@/views/BookManager.vue')
  },
  {
    meta: {
      title: 'New Book'
    },
    path: '/books/new',
    name: 'books.new',
    component: () =>
      import(/* webpackChunkName: "BookManagerForm" */ '@/views/BookManagerForm.vue')
  },
  {
    meta: {
      title: 'Edit Book'
    },
    path: '/books/:id',
    name: 'books.edit',
    component: () =>
      import(/* webpackChunkName: "BookManagerForm" */ '@/views/BookManagerForm.vue'),
    props: true
  },
  {
    path: '/full-page',
    component: () =>
      import(/* webpackChunkName: "full-page" */ '@/views/FullPage.vue'),
    children: [
      {
        meta: {
          title: 'Login'
        },
        path: '/login',
        name: 'login',
        component: () =>
          import(
            /* webpackChunkName: "full-page" */ '@/views/full-page/Login.vue'
          )
      },
      {
        meta: {
          title: 'Not Found'
        },
        path: '/*',
        name: 'NotFound',
        component: () =>
          import(
            /* webpackChunkName: "NotFound" */ '@/views/NotFound.vue'
          )
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

export function useRouter () {
  return router
}
