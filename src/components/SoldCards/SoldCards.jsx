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
    const [id, setId] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_CARDS' }),
        closeAddForm(),
        closeEditForm()
    }, [])

    // filter cards out cards that the user does not have in their wishlist
    const filteredCards = cards.filter(card => card.user_id === user.id && card.status === 'sold')

    function openAddForm() {
        document.getElementById("addForm").style.display = "block";
    }

    function closeAddForm() {
        document.getElementById("addForm").style.display = "none";
    }

    function openEditForm(card) {
        setId(card.card_id);
        document.getElementById("editForm").style.display = "block";
    }

    function closeEditForm() {
        document.getElementById("editForm").style.display = "none";
    }

    const deleteCard = (card) => {
        dispatch({type: 'DELETE_CARD', payload: card.card_id})
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
                            <button className="open-button" onClick={() => openEditForm(card)}>Edit Card</button>
                            <button onClick={() => deleteCard(card)}>Delete Card</button>
                        </tr>
                    ))}
                </tbody>
                    <button className="open-button" onClick={(event) => openAddForm()}>Add New Card</button>
            </table>
            <div className="form-popup" id="addForm">
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
                    <button type="button" className="btn cancel" onClick={() => closeAddForm()}>Cancel</button>
                </form>
            </div>
            <div className="form-popup" id="editForm">
                <form className="form-container" onSubmit={(event) => {
                    event.preventDefault();
                    console.log(cards)
                    dispatch({
                        type: "EDIT_CARD",
                        payload: {
                            card_id: id,
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
                }}>
                    <h1>Edit Card</h1>

                    <input type="text" placeholder="Player Name" value={player_name} onChange={(event) => setPlayerName(event.target.value)} />
                    <input type="text" placeholder="Manufacturer" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)} />
                    <input type="text" placeholder="Series" value={series} onChange={(event) => setSeries(event.target.value)} />
                    <input type="text" placeholder="Year" value={year} onChange={(event) => setYear(event.target.value)} />
                    <input type="text" placeholder="Grade" value={grade} onChange={(event) => setGrade(event.target.value)} />
                    <input type="text" placeholder="Date Sold" value={date_sold} onChange={(event) => setDateSold(event.target.value)} />
                    <input type="text" placeholder="Sale Price" value={sale_price} onChange={(event) => setSalePrice(event.target.value)} />
                   
                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeEditForm()}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default SoldCards;