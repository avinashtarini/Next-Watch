import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  BackgroundContainer,
  InsideContainer,
  WebsiteImage,
  LoginLabel,
  LoginInput,
  LoginButton,
} from './styledComponent'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPasswordState: false,
    errorMsg: '',
    errorDisplay: false,
  }

  renderSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    history.replace('/')
  }

  getLoginApiRequest = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const userInfo = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const userRequest = await fetch('https://apis.ccbp.in/login', userInfo)
    const userResponse = await userRequest.json()
    if (userRequest.ok === true) {
      this.renderSuccess(userResponse.jwt_token)
    } else {
      this.setState({
        errorMsg: userResponse.error_msg,
        errorDisplay: true,
      })
    }
  }

  showPassword = () => {
    this.setState(prevSate => ({
      showPasswordState: !prevSate.showPasswordState,
    }))
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  goToLogin = event => {
    event.preventDefault()
    this.getLoginApiRequest()
  }

  render() {
    const {showPasswordState, errorMsg, errorDisplay} = this.state
    const typeOfInput = showPasswordState ? 'text' : 'password'
    return (
      <BackgroundContainer>
        <InsideContainer>
          <WebsiteImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.goToLogin}>
            <div className="login-input-container">
              <LoginLabel htmlFor="user">USERNAME</LoginLabel>
              <br />
              <LoginInput
                type="text"
                id="user"
                onChange={this.updateUsername}
              />
            </div>
            <div className="login-input-container">
              <LoginLabel htmlFor="pass">PASSWORD</LoginLabel>
              <br />
              <LoginInput
                type={typeOfInput}
                id="pass"
                onChange={this.updatePassword}
              />
            </div>
            <div className="show-password">
              <LoginInput
                type="checkbox"
                id="show"
                onClick={this.showPassword}
              />
              <LoginLabel htmlFor="show">Show Password</LoginLabel>
            </div>
            <LoginButton type="submit">Login</LoginButton>
            {errorDisplay && <p className="error-msg">{errorMsg}</p>}
          </form>
        </InsideContainer>
      </BackgroundContainer>
    )
  }
}

export default Login
