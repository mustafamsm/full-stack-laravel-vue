import DefaultLayout from "@/components/DefaultLayout.vue";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import MyImages from "@/pages/MyImages.vue";
import Signup from "@/pages/Signup.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: DefaultLayout,
    children: [
      { path: "/", name: "Home", component: Home },
      { path: "/images", name: "MyImages", component: MyImages },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Sigup",
    component: Signup,
  },{
    
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
