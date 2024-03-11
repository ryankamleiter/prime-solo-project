import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Inventory() {
    const cards = useSelector((store) => store.card);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({type: 'FETCH_CARDS'});
    }, [])
    
    console.log('card data: ', cards)
    return (
        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Manufacturer</th>
                    <th>Series</th>
                    <th>Year</th>
                    <th>Grade</th>
                    <th>Date Purchased</th>
                    <th>Purchase Price</th>
                </tr>
            </thead>
            <tbody>
            {cards.map((card, index) => (
                    <tr key={index}>
                        <td>{card.player_name}</td>
                        <td>{card.manufacturer}</td>
                        <td>{card.series}</td>
                        <td>{card.year}</td>
                        <td>{card.grade}</td>
                        <td>{new Date(card.date_purchased).toLocaleDateString()}</td>
                        <td>{'$' + card.purchase_price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Inventory