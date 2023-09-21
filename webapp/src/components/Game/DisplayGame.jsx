import {  List } from 'antd';
import { Context } from "contexts/gameSalesContext";
import React, { useContext } from 'react';


const DisplayGame =({sale})=>{
    const{deleteSale} = useContext(Context);
    const handleButton=()=>{
        deleteSale(sale.id)

    }

return(
    <List.Item key={sale.id}>
      acheteur : {sale.buyer}<br/>
      date : {sale.date}<br/>
      quantity : {sale.quantity}<br/>
      total : {sale.total}<br/>
      <button  onClick={handleButton}>supprimer cette vente</button>
      </List.Item>
)

}
export default DisplayGame ;