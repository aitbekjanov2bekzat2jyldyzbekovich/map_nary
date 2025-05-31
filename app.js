import content from "./layout/content.js";
const app = Vue.createApp({});
app.component("content", content);
app.mount("#app");
