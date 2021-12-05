export default function ({ $axios, redirect, $auth }) {
  $axios.onRequest((config) => {
    if (process.client) {
    }
  })

  $axios.onError((error) => {
    console.log(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/auth')
    }
  })
}
