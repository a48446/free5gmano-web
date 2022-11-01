import { createRouter, createWebHistory } from "vue-router";
import dashboard from "../views/dashboard.vue";
import App from "../App.vue";
const routes = [
  {
    path: "/",
    name: "app",
    component: App,
    redirect: "/login",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { requireAuth: true },
        component: dashboard,
      },
      {
        path: "nfv_mano_plugin",
        name: "nfv_mano_plugin",
        meta: { requireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "nfv_mano_plugin" */ "../views/nfv_mano_plugin.vue"
          ),
      },
      {
        path: "VNF_Template",
        name: "VNF_Template",
        meta: { requireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "VNF_Template" */ "../views/VNF_Template.vue"
          ),
      },
      {
        path: "NSD_Template",
        name: "NSD_Template",
        meta: { requireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "NSD_Template" */ "../views/NSD_Template.vue"
          ),
      },
      {
        path: "NRM_Template",
        name: "NRM_Template",
        meta: { requireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "NRM_Template" */ "../views/NRM_Template.vue"
          ),
      },
      {
        path: "NSS_Template",
        name: "NSS_Template",
        meta: { requireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "NSS_Template" */ "../views/NSS_Template.vue"
          ),
      },
      {
        path: "NSS_Instance",
        name: "NSS_Instance",
        meta: { requireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "NSS_Instance" */ "../views/NSS_Instance.vue"
          ),
      },
      {
        path: "nssi_topology",
        name: "nssi_topology",
        meta: { requireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "nssi_topology" */ "../views/nssi_topology.vue"
          ),
      },
      {
        path: "setting",
        name: "setting",
        meta: { requireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "nssi_topology" */ "../views/setting.vue"
          ),
      },
      {
        path: "authAccount",
        name: "authAccount",
        meta: { requireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "nssi_topology" */ "../views/auth_account.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/login2",
    name: "login2",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login_fido.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
