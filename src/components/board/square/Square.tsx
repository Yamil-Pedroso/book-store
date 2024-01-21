const Square = ({ value, onSquareClick }: any) => {
  return (
    <div className="square" onClick={onSquareClick}>
      <div className="square-wrapper">{value}</div>
    </div>
  )
}

export default Square
