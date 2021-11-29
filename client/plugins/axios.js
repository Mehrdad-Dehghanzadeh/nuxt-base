export default ({ $axios, redirect, $auth }) => {
  $axios.onRequest((config) => {
    // if ($auth.loggedIn) {
    //   $axios.setToken($auth.strategy.token, 'Bearer')
    // }
  })

  $axios.onError((error) => {
    console.log(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/auth')
    }
  })
}
