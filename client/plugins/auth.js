export default ({ $auth }) => {
  this.$auth.onError((error, name, endpoint) => {
    console.log(error, name, endpoint)
  })

  $auth.onRedirect((to, from) => {
    console.log(to, from)
  })
}
