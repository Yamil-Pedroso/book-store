import './styles.css'
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'
import { IoMdStopwatch } from 'react-icons/io'
import { RiBookLine, RiMenu3Line } from 'react-icons/ri'
import { FiBookmark } from 'react-icons/fi'
import { logoLiterature } from '../../../assets/images'

const Aside = () => {
  return (
    <div className="aside-container">
      <div className="aside-wrapper">
        <div className="logo-wrapper">
          <img src={logoLiterature} alt="logo-img" width={70} />
        </div>
        <div className="icon-wrapper">
          <div className="icon">
            <a href="/">
              <IoHomeOutline className="my-icon" />
            </a>
          </div>
          <div className="icon">
            <a href="/book-slider">
              <RiBookLine className="my-icon" />
            </a>
          </div>
          <div className="icon">
            <IoMdStopwatch className="my-icon" />
          </div>
          <div className="icon">
            <FiBookmark className="my-icon" />
          </div>
          <div className="icon">
            <IoSettingsOutline className="my-icon" />
          </div>
          <div className="icon-menu-lines">
            <RiMenu3Line style={{ fontSize: '2rem', color: '#1d202e' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Aside
