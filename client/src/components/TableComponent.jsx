import "./table.css"
import { shortenAddress } from "../utils/shortenAddress"
import { Link } from "react-router-dom"

function TableComponent({data, column}){

    return (
        <table>
            <thead>
                <tr>
                    {column.map((item, index) => <TableHeadItem item={item} key={index} />)}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => <TableRow item={item} column={column}  key={index} />)}
            </tbody>
        </table>
    )
}


const TableHeadItem = ({ item }) => <th>{item.heading}</th>
const TableRow = ({ item, column }) => (
    <tr>
      {column.map((columnItem, index) => {
  
        if(columnItem.value == "accepted"){
            console.log(item[`${columnItem.value}`])
            return <td key={index}>{JSON.stringify(item[`${columnItem.value}`])}</td>
        }

        if(columnItem.value == "tarkista"){
            return <td key={index}><Link to={`${process.env.REACT_APP_BLOCKS}/${item["fromAddress"]}`}>Katso</Link></td>
        }

        if(columnItem.value.includes('.')) {
          const itemSplit = columnItem.value.split('.') //['address', 'city']
          return <td key={index}>{item[itemSplit[0]][itemSplit[1]]}</td>
        }

        return <td key={index}>{columnItem.value == "signature" || columnItem.value == "fromAddress" ?
                    shortenAddress(item[`${columnItem.value}`]) : item[`${columnItem.value}`]}</td>
      })}
    </tr>
  )

export default TableComponent