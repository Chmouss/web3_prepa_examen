import React, {  useContext } from 'react';
import { Context } from "contexts/gameSalesContext";
import DisplayGame from './DisplayGame';
import CreateNewGame from './CreateNewGame';

const Game = ({ game }) => {
  
  const { getGameWithSales } = useContext(Context);
  /*
  if (!game ) {
    return <div>Chargement...</div>; 
  }
  */console.log(game)
  const sale = getGameWithSales(game.id)
  return (
    <div>
      <h2>{game.name}</h2>
      <p>ce jeu coûte : {game.price} $</p>
      <p>il en reste : {game.stock}</p>
      
      <h2>Vente de ce jeu</h2>
      {sale.map(sale => 
      <DisplayGame sale={sale}  key={sale.id}/>

    )}
      <CreateNewGame id ={game.id}/>
    </div>
  );
};

export default Game;

//pour fonction qui fait direct appel a api
  //const { getSaleWithGame } = useContext(Context);
  // État initial à null pour indiquer que les données ne sont pas encore disponibles
  //const [test, setTest] = useState(null); 
  //récupérer la data
 // useEffect(() => {
  //  const fetchSaleWithGame = () => {
   //   getSaleWithGame('64c0ce45862a1141f7e9e6ec')
    //    .then(result => {
     //     setTest(result);
     //   })
      //  .catch(error => {
       //   console.error("Erreur lors de la récupération des données :", error);
       //   setTest(null); // En cas d'erreur, nous définissons la valeur de test à null
      //  });
  //  };
   // fetchSaleWithGame();
 // }, [getSaleWithGame]);
 // console.log(test); // Afficher la valeur de test dans la console