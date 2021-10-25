import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
			name: 'Login',
			path: '/login',
			component: () => import('@/views/auth/Login'),
		},
    {
			name: 'Register',
			path: '/register',
			component: () => import('@/views/auth/Register'),
		},
		{
      path: '/',
      component: () => import('@/views/dashboard/Index'),
			redirect: 'Login',
			meta: {
				auth: true,
			},
			children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        // Questions list
        {
          name: 'Questions',
          path: 'questions',
          component: () => import('@/views/questions/Questions'),
        },
        {
          name: 'Questions.soal',
          path: 'questions/:id',
          props: true,
          component: () => import('@/views/questions/QuestionsSoal'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
      ],
    },
  ],
})
/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.auth)) {
    if (!loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
	} else next()
})

export default router
