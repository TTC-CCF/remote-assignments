import { Component, createRef } from 'react';
import './LoginPage.css';
import { UserSignIn } from './script.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginButton() {
  return (
    <button onClick={UserSignIn} className="btn btn-primary">
      Sign Up
    </button>
  );
}

class NameField extends Component {
  constructor(props) {
    super(props);
    // Create a ref to store the reference to the input element
    this.nameInputRef = createRef();
  }

  componentDidMount() {
    // Access the input element using the ref and log it
    this.nameInputRef.current.addEventListener('input', function () {
      if (this.validity.patternMismatch) {
          this.setCustomValidity('不支援的字元');
      } else {
          this.setCustomValidity('');
      }
  });
  }

  render () {
    return (
      <div className="form-group">
        <label htmlFor="name" className="font-weight-bold">Name:</label>
        <input 
          type="text" 
          className="form-control" 
          id="name" 
          ref={this.nameInputRef} 
          required 
          pattern="^[a-zA-Z0-9]+$"
        />
      </div>
    );
  }
}

class EmailField extends Component {
  constructor(props) {
    super(props);
    // Create a ref to store the reference to the input element
    this.emailInputRef = createRef();
  }

  componentDidMount() {
    // Access the input element using the ref and log it
    this.emailInputRef.current.addEventListener('input', function () {
      if (this.validity.typeMismatch) {
        this.setCustomValidity('必須是 email 格式');
      } else {
        this.setCustomValidity('');
      }
    });
  }

  render () {
    return (
      <div className="form-group">
        <label htmlFor="email" className="font-weight-bold">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          ref={this.emailInputRef}
          required
        />
      </div>
    )
  }
}

class PasswordField extends Component {
  constructor(props) {
    super(props);
    // Create a ref to store the reference to the input element
    this.passwordInputRef = createRef();
  }

  componentDidMount() {
    // Access the input element using the ref and log it
    this.passwordInputRef.current.addEventListener('input', function () {
      if (this.validity.patternMismatch) {
          this.setCustomValidity('必須包含8個字元以上，並包含大、小寫英文、數字、特殊字元其中三種');
      } else {
          this.setCustomValidity('');
      }
  });
  }

  render () {
    return (
      <div className="form-group">
        <label htmlFor="password" className="font-weight-bold">Password:</label>
        <input 
          type="password"
          className="form-control" 
          id="password" 
          ref={this.passwordInputRef} 
          required 
          pattern="^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-z])(?=.*[\-~`!@#$%\[\]\{\}\?\\\/\(\)^_+\|])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\-~`!@#$%\[\]\{\}\?\\\/\(\)^_+\|])).{8,}$"
        />
      </div>
    )
  }
}

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="font-weight-bold">User Sign Up</h1>
        <NameField />
        <EmailField />
        <PasswordField />
        <LoginButton />
      </form>
    );
  }
}

function LoginPage() {
  return (
    <div className="container vertical-center">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
