import store from "../store/store";

export default function notAuth ({next, to, router}) {
  if (store.getters.getToken != null && to.name == 'login')
      return router.push('/')
  return next();
}
