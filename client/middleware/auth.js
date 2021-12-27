export default function ({ $auth, redirect, route }) {
  if (!$auth.loggedIn()) {
    redirect(`/auth`, { redirect: route.path })
  }
}
