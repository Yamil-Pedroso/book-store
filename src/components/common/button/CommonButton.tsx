import './styles.css'
import { FiExternalLink } from 'react-icons/fi'

interface IButton {
  text: string
  btnClassName?: string
}

const CommonButton = (props: IButton) => {
  return (
    <div className={`common-btn-container ${props.btnClassName}`}>
      <div className="common-btn-wrapper">
        <h4>{props.text}</h4>
        <FiExternalLink className="external-link-icon" />
      </div>
    </div>
  )
}

export default CommonButton
