import './styles.css'
import { avatar } from '../../../assets/images'
import { IoMdNotificationsOutline } from 'react-icons/io'

interface IUser {
  name: string
  classColorName?: string
}

const UserProfilAccount = (props: IUser) => {
  return (
    <div className="user-wrapper">
      <div className="user-info-wrapper">
        <div className="user-info">
          <img src={avatar} alt="avatar-icon" className="user-avatar" />
        </div>
        <div className={`header-text ${props.classColorName}`}>
          {props.name}
        </div>
      </div>
      <IoMdNotificationsOutline className="notis-icon" />
    </div>
  )
}

export default UserProfilAccount
