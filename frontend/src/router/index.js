import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import auth from "../auth";
import PostPage from "../views/PostPage.vue";
import addPost from "../views/addPost.vue";




const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    {
        path: '/posts/:id', // Dynamic route for specific post
        name: "PostPage",
        component: PostPage,
        props: true,
        beforeEnter: async (to, from, next) => {
          let authResult = await auth.authenticated();
          if (!authResult) {
            next('/login'); // Redirect to login if not authenticated
          } else {
            next();
          }
        }
    },
      
      {
        path: "/posts/addPost",
        name: "addPost",
        component: addPost,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
      },
    
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;