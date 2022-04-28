export default [
  [
    {
      to: '/users',
      icon: 'account-cog',
      label: 'User Manager',
      authRequired: true
    },
    {
      to: '/books',
      icon: 'book-lock',
      label: 'Book Manager',
      authRequired: true

    }
  ],
  [
    {
      to: '/',
      icon: 'desktop-mac',
      label: 'Dashboard'
    }
  ],
  [
    {
      to: '/profile',
      label: 'Profile',
      icon: 'account-circle'
    },
    {
      to: '/login',
      label: 'Login',
      icon: 'lock'
    }
  ]
]
