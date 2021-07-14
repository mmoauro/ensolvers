import store from "../store/store";
export default function auth({ next, to, router }) {
  console.log(store.getters.getToken);
  if (store.getters.getToken != null && to.name != 'login')
      return next();
  return router.push('/login')

}
