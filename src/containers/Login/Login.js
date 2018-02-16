import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { login } from '../../store/actions/auth.action'

import './Login.scss'

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleInputChange (state, event) {
    this.setState({ [state]: event.target.value })
  }

  redirect () {
    if (this.props.auth) {
      return <Redirect to='/manage/today' />
    }
  }

  render () {
    return (
      <div className='page-login'>
        {this.redirect()}
        <header className='header'>
          <img src='https://s3-ap-southeast-1.amazonaws.com/dd-express-assets/dd-biz-logo.png' className='App-logo' alt='logo' />
        </header>
        <div className='input-element'>
          <label>Email</label>
          <input type='text'
            value={this.state.email}
            onChange={(e) => this.handleInputChange('email', e)} />
        </div>
        <div className='input-element'>
          <label>Password</label>
          <input type='password'
            value={this.state.password}
            onChange={(e) => this.handleInputChange('password', e)} />
        </div>
        <button className='btn'
          disabled={this.props.isSubmitting}
          onClick={() => this.props.login(this.state)}>
          Login
        </button>
      </div>
    )
  }
}

// function mapStateToProps ({ app }) {
//   return { app }
// }
function mapStateToProps ({ app }) {
  return {
    auth: app.auth,
    isSubmitting: app.isSubmitting
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)