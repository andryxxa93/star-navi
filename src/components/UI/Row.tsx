import { FC, memo } from "react";
import { Modes } from "../../models/Modes";
import '../../styles/row.scss'

interface RowProps {
  mode: Modes,
  clear: boolean
}

 const Row: FC<RowProps> = memo(({ children, mode, clear }) => {
  return ( <div className="row">
    { children }
  </div> );
}, (prevProp, newProp) => prevProp.mode === newProp.mode && prevProp.clear === newProp.clear)

export default Row;