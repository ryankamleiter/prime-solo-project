import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Inventory() {
    const user = useSelector((store) => store.user);
    const cards = useSelector((store) => store.card);

    const [player_name, setPlayerName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [series, setSeries] = useState('');
    const [year, setYear] = useState('')
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_CARDS' });
    }, [])

    console.log('card data: ', cards)

    // filter cards out cards that the user does not own
    const filteredCards = cards.filter(card => card.user_id === user.id && card.status === 'inventory')

    function openForm() {
        document.getElementById("myForm").style.display = "block";
      }
      
      function closeForm() {
        document.getElementById("myForm").style.display = "none";
      }

    return (
        <>
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
            {filteredCards.map((card, index) => (
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
                <button className="open-button" onClick={(event) => openForm()}>Add New Card</button>
            </tbody>
        </table>
        <div className="form-popup" id="myForm">
        <form className="form-container" onSubmit={(event) => {
            event.preventDefault();
            dispatch({type: "ADD_CARD", payload:{player_name, manufacturer, series, year}})
        }}>
          <h1>Enter New Card</h1>
      
          <input type="text" placeholder="Player Name" value={player_name} onChange={(event) => setPlayerName(event.target.value)}/>
          <input type="text" placeholder="Manufacturer" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)}/>
          <input type="text" placeholder="Series" value={series} onChange={(event) => setSeries(event.target.value)}/>
          <input type="text" placeholder="Year" value={year} onChange={(event) => setYear(event.target.value)}/>
      
          <button type="submit" className="btn">Add</button>
          <button type="button" className="btn cancel" onClick={() => closeForm()}>Cancel</button>
        </form>
      </div>
      </>
    )
}

export default Inventory