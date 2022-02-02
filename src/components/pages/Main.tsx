import { FC, useCallback, useEffect, useState } from "react";
import Square from "../Square";
import Row from "../UI/Row";
import { Select, Button, Typography } from 'antd';
import { Mode, Modes } from "../../models/Modes";
import ListItem from "../UI/ListItem";
import { correctName } from "../../utils/functions";

import '../../styles/main.scss';

const { Option } = Select;
const { Title } = Typography;
 
const MainPage: FC = () => {
  const [data, setData] = useState<Mode[]>([]);
  const [mode, setMode] = useState<Modes>(data[0]?.name || Modes.EASY_MODE);
  const [rows, setRows] = useState<number[]>([]);
  const [cols, setCols] = useState<number[]>([]);
  const [start, setStart] = useState(true);
  const [clear, setClear] = useState(false);
  const [touched, setTouched] = useState<Array<number[]>>([]);

  useEffect(() => {
    (async () => {
      let response = await fetch('https://demo1030918.mockable.io/');
      let json = await response.json();
      const transformedData = Object.keys(json).map(key =>{ return { name: key, field: json[key].field }}) 
      setData(transformedData as Mode[]);
    })()
  }, [])

  useEffect(() => {
    console.log('render');
  })

  useEffect(() => {
    if (!start || !data.length) {
      return
    }
    let rowsCount = 1;
    let colsCount = 1;
    const fieldCount = data.find(item => item?.name === mode)!.field;
    setRows(Array.from({length: fieldCount}, () => rowsCount++))
    setCols(Array.from({length: fieldCount}, () => colsCount++))
    setClear(false);
  }, [start, mode, clear, data])

  const modeChangeHandler = (mode: Modes) => {
    setStart(false);
    setMode(mode as React.SetStateAction<Modes>);
  }

  const setStartHandler = () => {
    setTouched([]);
    setClear(true);
    setStart(true);
  }

  const setTouchedHandler = useCallback((row: number, col: number) => {
    setTouched(prev => [...prev, [row, col]])
  }, [])

  const renderOptions = () => {
    return Object.keys(data).map((el: any) => {
      return <Option key={data[el].name}>{correctName(data[el].name)}</Option>
    })
  }

  const renderCell = () => {
    return rows.map((row) => {
      return <Row mode={mode} key={row} clear={clear}>
        {cols.map((sq) => {
            return <Square touchedHandler={setTouchedHandler} clear={clear} colNum={sq} rowNum={row} key={sq}/>
        })}
      </Row>
    })
  }

  const renderListItems = () => {
    if (!touched.length) {
      return <div>No squares hovered</div>
    }
    return touched.reverse().map(([row, col], index) => {
      return <ListItem key={index} rowNum={row} colNum={col}/>
    })
  }

  return (
    <div className="main">
      <div className="main__cell">
        <div className="main__cell-control">
        <Select defaultValue={correctName(Modes.EASY_MODE)} onChange={modeChangeHandler}>
          {renderOptions()}
        </Select>
        <Button onClick={setStartHandler} type="primary">
          Start
        </Button>
        </div>
          <div className="main__cell-content">
            {renderCell()}
          </div>
      </div>
      <div className="main__info">
        <Title level={1}>
          Hover Squares
        </Title>
        <ul className="main__info-content">
          {renderListItems()}
        </ul>
      </div>
    </div>);
}
 
export default MainPage;