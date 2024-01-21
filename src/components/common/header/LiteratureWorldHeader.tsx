import CommonButton from '../button/CommonButton'
import './styles.css'

interface ILiteratureWorldHeader {
  title: string
  subTitle: string
  btnClassName: string
}

const LiteratureWorldHeader = (props: ILiteratureWorldHeader) => {
  return (
    <div className="comment-header">
      <h1>{props.title}</h1>
      <div className="subtitle-wrapper">
        <p>{props.subTitle}</p>
      </div>
      <CommonButton text="Start reading" btnClassName={props.btnClassName} />
    </div>
  )
}

export default LiteratureWorldHeader
