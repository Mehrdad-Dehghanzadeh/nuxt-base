export default function ({ $auth, redirect, route }) {
  if (!$auth.loggedIn()) {
    redirect('/auth')
    $auth.pathTo = route.path
  }
}
