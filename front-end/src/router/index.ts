import {
  createRouter,
  createWebHistory,
  type NavigationGuard,
} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PlaylistView from "@/views/PlaylistView.vue";
import LoginView from "@/views/LoginView.vue";
import ApplicationView from "@/views/ApplicationView.vue";
import FavoriteTracksView from "@/views/FavoriteTracksView.vue";
import { useAuthStore } from "@/stores/auth";

const handleLoginRoute: NavigationGuard = function (to, _, next) {
  const authStore = useAuthStore();

  const token = to.query.token?.toString();
  const expiration = parseInt(to.query.expiration?.toString() ?? "0");
  const error = to.query.error?.toString();

  if (token && expiration) {
    authStore.login(token, expiration);
    authStore.$patch({ token, expiration, error });
  }

  if (authStore.token) {
    authStore.$patch({ authenticated: true });
    next({ name: "home" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: handleLoginRoute,
    },
    {
      path: "/",
      name: "application",
      component: ApplicationView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
          // component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/search",
          name: "search",
          component: HomeView,
        },
        {
          path: "/collection",
          name: "collection",
          children: [
            {
              path: "tracks",
              name: "favorite",
              component: FavoriteTracksView,
            },
            //   {
            //     path: "",
            //     redirect: "/playlists",
            //   },
            //   {
            //     path: "/playlists",
            //     name: "playlists",
            //     component: HomeView,
            //   },
          ],
        },
        {
          name: "playlist",
          path: "/playlist/:id",
          component: PlaylistView,
        },
      ],
    },
  ],
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && to.name !== "login" && !authStore.authenticated)
    next({ name: "login" });
  else next();
});

export default router;
