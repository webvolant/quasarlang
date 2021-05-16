
const routes = [
  /*{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },*/
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    //component: () => import('pages/Items.vue'),
    children: [
      { name: '', path:'', component: () => import('pages/Items.vue') },
    ]
  },




  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
