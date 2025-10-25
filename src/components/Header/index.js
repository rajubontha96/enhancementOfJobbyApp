import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
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
        <Link to="/" className="logo-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
            role="img"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link" role="link">
              <AiFillHome className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link" role="link">
              <BsBriefcaseFill className="nav-icon" />
              <span className="nav-text">Jobs</span>
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-button"
          onClick={onClickLogout}
          role="button"
        >
          <FiLogOut className="logout-icon" />
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
