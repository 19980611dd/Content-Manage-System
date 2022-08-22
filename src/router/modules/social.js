import Layout from '@/layout'

export default {
  path: '/social_securitys',
  component: Layout,
  name: 'social_securitys',
  children: [
    {
      name: 'social_securitys',
      path: '',
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
