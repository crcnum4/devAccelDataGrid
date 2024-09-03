import { FC } from "react"
import { ColumnOptions } from "../types/Grid"
import React from "react"

type Props = {
  value: string,
  columnOptions: ColumnOptions,
}

const DataCell: FC<Props> = ({value, columnOptions}) => {
  
  const {width = "180px"} = columnOptions

  return (
    <div style={{padding: "1rem", width}}>
      {value}
    </div>
  )
}

export default DataCell;