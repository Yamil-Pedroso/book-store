const CalculateWinner = (squares: any) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    console.log(a, b, c)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

//const CalculateWinner = (squares: any) => {
//  const lines = {
//    line1: [0, 1, 2],
//    line2: [3, 4, 5],
//    line3: [6, 7, 8],
//    line4: [0, 3, 6],
//    line5: [1, 4, 7],
//    line6: [2, 5, 8],
//    line7: [0, 4, 8],
//    line8: [2, 4, 6],
//  }
//
//  for (const key in lines) {
//    const [a, b, c] = lines[key]
//    console.log(a, b, c)
//    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//      return squares[a]
//    }
//  }
//
//  return null
//}

export default CalculateWinner
