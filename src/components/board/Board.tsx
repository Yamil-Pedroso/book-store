import Square from './square/Square'
import CalculateWinner from './calculate-winner/CalculateWinner'
import { bot } from '../../assets/images/index'

const Board = ({ xIsNext, squares, onPlay }: any) => {
  const handleClick = (i: any) => {
    if (CalculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[i] = '🤖'
      console.log(typeof nextSquares)
    } else {
      nextSquares[i] = '😀'
    }
    onPlay(nextSquares)
  }

  const winner = CalculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status = 'Next player: ' + (xIsNext ? 'Bot' : 'User')
  }

  return (
    <div className="board-container">
      <img src={bot} alt="bot" className="bot" width={64} />
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  )
}

export default Board
