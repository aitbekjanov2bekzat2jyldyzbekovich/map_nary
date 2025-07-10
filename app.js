import content from "./layout/content.js";

const Home = {
  template: `<layout-content></layout-content>`,
};
const Admin = {
  template: `<layout-content></layout-content>`,
};
const Category = {
  template: `<layout-content></layout-content>`,
};

const routes = [
  { path: "/", component: Home },
  { path: "/admin", component: Admin },
  { path: "/:pathMatch(.*)*", redirect: "/" },
  { path: "/filter=/:name", component: Category, name: "category" },
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({});
app.component("layout-content", content);

app.use(router);
app.mount("#app");
