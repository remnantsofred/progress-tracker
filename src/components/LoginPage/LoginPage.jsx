import './LoginPage.css';



export const LoginPage = () => {
  return (
    <div className='main-page'>
      <h1>Login</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  )
}