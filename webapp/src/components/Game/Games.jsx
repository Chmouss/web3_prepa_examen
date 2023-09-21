import { Context } from "contexts/gameSalesContext"
import React, {  useContext } from "react";

import { Link } from 'react-router-dom';
import { List} from 'antd';


const Games = ()=>{
    const {games} = useContext(Context)
return(
    <div>
    <h1>Games</h1>
    {games.map(game => 
    <List.Item key={game.id}>
    <Link to={`/games/${game.id}`}>{game.name} : il en reste {game.stock}</Link>
    </List.Item>

    )}

    </div>
    
)
}
export default Games