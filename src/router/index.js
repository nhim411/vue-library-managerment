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
      requiresAuth: true,
      requiresPermission: true
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'User Manager',
      requiresPermission: true,
      requiresAuth: true
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
      title: 'Profile',
      requiresAuth: true

    },
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
  },

  // User manager
  {
    meta: {
      title: 'New Users',
      requiresPermission: true,
      requiresAuth: true
    },
    path: '/users/new',
    name: 'users.new',
    component: () =>
      import(/* webpackChunkName: "create-user-form" */ '@/views/CreateUserForm.vue')
  },
  {
    meta: {
      title: 'Edit User',
      requiresPermission: true,
      requiresAuth: true
    },
    path: '/users/:id',
    name: 'users.edit',
    component: () =>
      import(/* webpackChunkName: "client-form" */ '@/views/CreateUserForm.vue'),
    props: true
  },

  // Book manager
  {
    meta: {
      title: 'Book Manager',
      requiresAuth: true
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
      title: 'Book',
      requiresAuth: true
    },
    path: '/book/:id',
    name: 'book.show',
    component: () =>
      import(/* webpackChunkName: "BookManagerForm" */ '@/views/BookCart.vue'),
    props: true
  },
  {
    meta: {
      title: 'New Book',
      requiresPermission: true,
      requiresAuth: true
    },
    path: '/books/new',
    name: 'books.new',
    component: () =>
      import(/* webpackChunkName: "BookManagerForm" */ '@/views/BookManagerForm.vue')
  },
  {
    meta: {
      title: 'Edit Book',
      requiresPermission: true,
      requiresAuth: true
    },
    path: '/books/:id',
    name: 'books.edit',
    component: () =>
      import(/* webpackChunkName: "BookManagerForm" */ '@/views/BookManagerForm.vue'),
    props: true
  },

  // Category manager
  {
    meta: {
      title: 'Category Manager',
      requiresPermission: true,
      requiresAuth: true
    },
    path: '/category',
    name: 'CategoryManager',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "CategoryManager" */ '@/views/CategoryManager.vue')
  },
  {
    meta: {
      title: 'New Category',
      requiresPermission: true,
      requiresAuth: true
    },
    path: '/category/new',
    name: 'category.new',
    component: () =>
      import(/* webpackChunkName: "CategoryManagerForm" */ '@/views/CategoryManagerForm.vue')
  },
  {
    meta: {
      title: 'Edit Category',
      requiresPermission: true,
      requiresAuth: true
    },
    path: '/category/:id',
    name: 'category.edit',
    component: () =>
      import(/* webpackChunkName: "CategoryManagerForm" */ '@/views/CategoryManagerForm.vue'),
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
    console.log(to.meta)
    if (!store.state.user) {
      next({ name: 'login' })
    } else {
      if (to.matched.some((record) => record.meta.requiresPermission)) {
        if (store.state.user.role === 'admin') {
          next()
        } else {
          next({ name: 'NotFound' })
        }
      } else { next() }
    }
  } else {
    next()
  }
})

export default router

export function useRouter () {
  return router
}
