import content from "./layout/content.js";

// Компоненты страниц
const Home = { template: `<layout-content></layout-content>` };
const Admin = { template: `<layout-content></layout-content>` };
const Category = { template: `<layout-content></layout-content>` };

// Маршруты
const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/admin", name: "admin", component: Admin },
  { path: "/filter=/:name", name: "category", component: Category },
  { path: "/:pathMatch(.*)*", redirect: "/" }, // catch-all для неизвестных маршрутов
];

// Создание роутера
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

// Создание приложения
const app = Vue.createApp({});
app.component("layout-content", content);

app.use(router);
app.mount("#app");
