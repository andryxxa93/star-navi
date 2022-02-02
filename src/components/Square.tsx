import React, { FC, useEffect, useState, memo } from "react";
import '../styles/square.scss'

interface SquareProps {
  rowNum: number,
  colNum: number,
  clear: boolean,
  touchedHandler: (row: number, col: number) => void
}
 
const SquareInner: FC<SquareProps> = memo(({rowNum, colNum, clear, touchedHandler}) => {
  const [hover, setHover] = useState(false);

  const hoverHandler = () => {
    setHover(prev => !prev);
    touchedHandler(rowNum, colNum);
  }

  useEffect(() => {
    if (clear) {
      setHover(false);
    }
  }, [clear])

  return(
    <div
      onMouseEnter={hoverHandler} 
      className={'square ' + (hover && 'square_fill')}>
    </div>);
})
 
const Square = React.memo(SquareInner);
export default Square;