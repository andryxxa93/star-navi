import { FC } from "react";
import '../../styles/listItem.scss';

interface ListItemProps {
  rowNum: number,
  colNum: number,
}
 
const ListItem: FC<ListItemProps> = ({rowNum, colNum}) => {
  return ( <li className="list-item">
    {`row ${rowNum} col ${colNum}`}
  </li> );
}
 
export default ListItem;