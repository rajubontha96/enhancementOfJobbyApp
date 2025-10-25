import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <div className="header-content">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
            role="img"
          />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link" role="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link" role="link">
              Jobs
            </Link>
          </li>

          <li>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
              role="button"
            >
              <FiLogOut className="logout-icon" />
              <span className="logout-text">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
