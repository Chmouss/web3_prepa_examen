import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import gamesAPI from 'services/gamesApi';
import salesAPI from 'services/salesApi';

const Context = React.createContext(null);

const ProviderWrapper = ({ children }) => {

    const [games, setGames] = useState([]);
    const [sales, setSales] = useState([]);

    //initialisation par defaut
    const initialLoadAction = () => {
        gamesAPI.getAll().then((ac) => {
          setGames(ac);
        });
        salesAPI.getAll().then((ac) => {
          setSales(ac);
        });
      };
    useEffect(initialLoadAction, []);

    //fonction demandee (salewithgame ou gamewith sale ?)
    const getSaleWithGame = async (id) => {
        try {
          const sale = await salesAPI.getOneById(id);
          const gamesaled = await gamesAPI.getOneById(sale.game);
    
          const saleWithGame = {
            buyer: sale.buyer,
            date: sale.date,
            quantity: sale.quantity,
            total: sale.total,
            game: {
              name: gamesaled.name,
              price: gamesaled.price,
              stock: gamesaled.stock,
            },
          };
    
          return saleWithGame;
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération de la vente avec le jeu :", error);
          return null;
        }
      };

      //sur base id du jeu, on recupere toutes les ventes correspondant au jeu
      const getGameWithSales =(id)=>{
        return sales.filter((sale) => sale.game === id)
      } ;

      //delete vente dans db et dans 'navigateur'
      const deleteSale = (id) => {
        salesAPI.deleteOneById(id).then((r) => console.log(r));
        setSales(sales.filter((s) => s.id !== id));
      };

      //ajout sale, attente du resultat de la promise avant de faire
      const addNewSale = async (ns) => {
        try {
          const newSale = await salesAPI.createSale(ns);
          setSales([...sales, newSale]); // Mettre à jour l'état avec la nouvelle vente
        } catch (error) {
          console.error("Erreur lors de l'ajout de la vente :", error);
        }
      };



    //rendre valeurs accessibles (mettre stockage / struct donnees) plus les methodes de la classe
    const exposedValue = {
        games,    
        sales,
        getGameWithSales,
        deleteSale,
        addNewSale
    };

  return <Context.Provider value={exposedValue}>{children}</Context.Provider>;
};

export { Context, ProviderWrapper };
