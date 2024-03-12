import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function SoldCards() {
    const user = useSelector((store) => store.user);
    const cards = useSelector((store) => store.card);

    const [player_name, setPlayerName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [series, setSeries] = useState('');
    const [year, setYear] = useState('')
    const [grade, setGrade] = useState('')
    const [date_sold, setDateSold] = useState('')
    const [sale_price, setSalePrice] = useState('')
    const [status, setStatus] = useState('sold')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_CARDS' });
    }, [])

    // filter cards out cards that the user does not have in their wishlist
    const filteredCards = cards.filter(card => card.user_id === user.id && card.status === 'sold')

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
                        <th>Date Sold</th>
                        <th>Sale Price</th>
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
                            <td>{new Date(card.date_sold).toLocaleDateString()}</td>
                            <td>{card.sale_price}</td>
                        </tr>
                    ))}
                </tbody>
                    <button className="open-button" onClick={(event) => openForm()}>Add New Card</button>
            </table>
            <div className="form-popup" id="myForm">
                <form className="form-container" onSubmit={(event) => {
                    event.preventDefault();
                    dispatch({
                        type: "ADD_CARD",
                        payload: {
                            player_name,
                            manufacturer,
                            series,
                            year,
                            grade,
                            date_sold,
                            sale_price,
                            status,
                        }
                    });
                    setPlayerName('');
                    setManufacturer('');
                    setSeries('');
                    setYear('');
                    setGrade('');
                    setDateSold('');
                    setSalePrice('');
                }}>
                    <h1>Enter New Card</h1>

                    <input type="text" placeholder="Player Name" value={player_name} onChange={(event) => setPlayerName(event.target.value)} />
                    <input type="text" placeholder="Manufacturer" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)} />
                    <input type="text" placeholder="Series" value={series} onChange={(event) => setSeries(event.target.value)} />
                    <input type="text" placeholder="Year" value={year} onChange={(event) => setYear(event.target.value)} />
                    <input type="text" placeholder="Grade" value={grade} onChange={(event) => setGrade(event.target.value)} />
                    <input type="text" placeholder="Date Sold" value={date_sold} onChange={(event) => setDateSold(event.target.value)} />
                    <input type="text" placeholder="Sale Price" value={sale_price} onChange={(event) => setSalePrice(event.target.value)} />

                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeForm()}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default SoldCards;