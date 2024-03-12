import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Wishlist() {
    const user = useSelector((store) => store.user);
    const cards = useSelector((store) => store.card);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({type: 'FETCH_CARDS'});
    }, [])
    
        // filter cards out cards that the user does not have in their wishlist
        const filteredCards = cards.filter(card => card.user_id === user.id && card.status === 'wishlist')

    console.log('card data: ', cards)
    return (
        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Manufacturer</th>
                    <th>Series</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody>
            {filteredCards.map((card, index) => (
                    <tr key={index}>
                        <td>{card.player_name}</td>
                        <td>{card.manufacturer}</td>
                        <td>{card.series}</td>
                        <td>{card.year}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Wishlist;