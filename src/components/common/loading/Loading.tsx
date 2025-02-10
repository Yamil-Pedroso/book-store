import "./styles.css";

interface LoadingProps {
    style?: React.CSSProperties;
}

const Loading: React.FC<LoadingProps> = ({ style }) => {
  return (
    <div
        style={style}
    className="loader"></div>
  )
}

export default Loading
