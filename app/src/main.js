// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import the vue instance
import Vue from 'vue'
//import the App component
import App from './App'
//import the vue router
import VueRouter from 'vue-router'
import Tasks from "./components/Tasks";
import EditTask from "./components/EditTask";
import Folders from "./components/Folders";
import Login from "./components/Login";
import store from './store/store';
import auth from './middleware/auth';
import notAuth from "./middleware/notAuth";
//tell vue to use the router
Vue.use(VueRouter)
//define your routes
const routes = [
  {path: '/', component: Tasks, name: 'tasks', meta: {middleware: auth}},
  {path: '/tasks/:id', component: EditTask, name: 'tasks_edit', meta: {middleware: auth}},
  {path: '/folders', component: Folders, name: 'folders', meta: {middleware: auth}},
  {path: '/folders/:id', component: Tasks, name: 'folder_tasks', meta: {middleware: auth}},
  {path: '/login', component: Login, name: 'login', meta: {middleware: notAuth}}
]

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'hash'
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({...context, next: nextMiddleware});
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({...context, next: nextMiddleware});
  }
  return next();
});
//instatinat the vue instance
new Vue({
//define the selector for the root component
  el: '#app',
  //pass the template to the root component
  template: '<App/>',
  //declare components that the root component can access
  components: {App},
  //pass in the router to the Vue instance
  router,
  store
}).$mount('#app')//mount the router on the
