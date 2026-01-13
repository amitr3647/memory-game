import { useEffect, useState } from "react";

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export default function App() {
  //tic tac toe
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [gridValue, setGridValue] = useState(new Array(9).fill(""));
  const [isGameOver,setIsGameOver] = useState(false);
  // console.log("gr8d value", gridValue);

 useEffect(()=>{
if(checkWinner()) {
  setIsGameOver(true);
    setTimeout(()=>window.alert(currentPlayer + " is winner"),100);
resetGame()
    return ;
   }
   if(checkDraw()){
    setIsGameOver(true);
    window.alert('match draw');
resetGame()
    return;
   }
   switchPlayer();
},[gridValue]);

function resetGame(){
  setGridValue(new Array(9).fill(''))
  setCurrentPlayer('x');
  setIsGameOver(false)
  console.log('rest runds')
}
  function onGridClick(gridIndex: any) {
    // console.log("grid cliked", currentPlayer, gridValue);
    if(isGameOver) return;
    if(gridValue[gridIndex]!== '') return;
    setGridValue((prev) => {
      const next = [...prev];
      next[gridIndex] = currentPlayer;
      return next;
    });
   
  }


  function checkDraw(){
   if(gridValue.every(val=>val!== '')) return true; 
  }

  function checkWinner() {
    console.log('grid value',gridValue)
    for(const comb of winningCombination) {
      // console.log("winner check", gridValue[comb[0]], gridValue[comb[1]], gridValue[comb[2]]);
      if  (
      gridValue[comb[0]] === currentPlayer &&
      gridValue[comb[1]] === currentPlayer &&
      gridValue[comb[2]] === currentPlayer
    ) {
        
        return true;
      }
    };
    return false;
  }
  function switchPlayer() {
    setCurrentPlayer((prev) => (prev === "x" ? "0" : "x"));
  }

  let arr = new Array(9).fill(undefined);
  //arr = [[0,0,0],[0,0,1],[0,1,0],[1,0,0],[1,1,0],[1,0,1],[0,1,1],[1,1,1]]
  //winningArr = [[]]
  return (
    <div className="App">
      <h1>tic tac toe</h1>
      <div
        className="gameBody"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridTemplateRows: "repeat(3,100px)",
        }}
      >
        {arr.map((_, i) => (
          <div key={i}
            className="grid"
            style={{
              border: "1px solid",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => onGridClick(i)}
          >
            {gridValue[i]}
          </div>
        ))}
      </div>
    </div>
  );
}
