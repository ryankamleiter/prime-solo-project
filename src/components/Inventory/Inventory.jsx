import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Inventory() {
    const user = useSelector((store) => store.user);
    const cards = useSelector((store) => store.card);
    console.log(cards)

    const [player_name, setPlayerName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [series, setSeries] = useState('');
    const [year, setYear] = useState('')
    const [grade, setGrade] = useState('')
    const [date_purchased, setDatePurchased] = useState('')
    const [purchase_price, setPurchasePrice] = useState('')
    const [status, setStatus] = useState('inventory')
    const [id, setId] = useState('')
    // const [date_sold, setDateSold] = useState('')
    // const [sale_price, setSalePrice] = useState('')
    const [moveDateSold, setMoveDateSold] = useState('');
    const [moveSalePrice, setMoveSalePrice] = useState('');

 

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_CARDS' }),
        closeAddForm(),
        closeEditForm(),
        closeMoveForm()
    }, [])


    // filter cards out cards that the user does not own
    const filteredCards = cards.filter(card => card.user_id === user.id && card.status === 'inventory')

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

    function openMoveForm(card) {
        setId(card.card_id);
        document.getElementById("moveForm").style.display = "block";
    }

    function closeMoveForm() {
        document.getElementById("moveForm").style.display = "none";
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
                            <button className="open-button" onClick={() => openEditForm(card)}>Edit Card</button>
                            <button className="open-button" onClick={() => openMoveForm(card)}>Move to Sold</button>
                            <button onClick={() => deleteCard(card)}>Delete Card</button>
                        </tr>
                    ))}
                    <button className="open-button" onClick={(event) => openAddForm()}>Add New Card</button>
                </tbody>
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
                            date_purchased,
                            purchase_price,
                            status,
                        }
                    });
                    setPlayerName('');
                    setManufacturer('');
                    setSeries('');
                    setYear('');
                    setGrade('');
                    setDatePurchased('');
                    setPurchasePrice('');
                }}>
                    <h1>Enter New Card</h1>

                    <input type="text" placeholder="Player Name" value={player_name} onChange={(event) => setPlayerName(event.target.value)} />
                    <input type="text" placeholder="Manufacturer" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)} />
                    <input type="text" placeholder="Series" value={series} onChange={(event) => setSeries(event.target.value)} />
                    <input type="text" placeholder="Year" value={year} onChange={(event) => setYear(event.target.value)} />
                    <input type="text" placeholder="Grade" value={grade} onChange={(event) => setGrade(event.target.value)} />
                    <input type="text" placeholder="Date Purchased" value={date_purchased} onChange={(event) => setDatePurchased(event.target.value)} />
                    <input type="text" placeholder="Purchase Price" value={purchase_price} onChange={(event) => setPurchasePrice(event.target.value)} />

                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeAddForm()}>Cancel</button>
                </form>
            </div>

            {/* start of edit form */}
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
                            date_purchased,
                            purchase_price,
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
                    <input type="text" placeholder="Date Purchased" value={date_purchased} onChange={(event) => setDatePurchased(event.target.value)} />
                    <input type="text" placeholder="Purchase Price" value={purchase_price} onChange={(event) => setPurchasePrice(event.target.value)} />

                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeEditForm()}>Cancel</button>
                </form>
            </div>

            {/* start of add to sold form */}
            <div className="form-popup" id="moveForm">
                <form className="form-container" onSubmit={(event) => {
                    event.preventDefault();
                    setStatus('sold')
                    dispatch({
                        type: "EDIT_CARD",
                        payload: {
                            card_id: id,
                            player_name,
                            manufacturer,
                            series,
                            year,
                            grade,
                            date_purchased,
                            purchase_price,
                            status,
                            date_sold: moveDateSold,
                            sale_price: moveSalePrice
                        }
                    });
                }}>
                    <h1>Move to Sold</h1>

                    <input type="text" placeholder="Date Sold" value={moveDateSold} onChange={(event) => setMoveDateSold(event.target.value)} />
                    <input type="text" placeholder="Sale Price" value={moveSalePrice} onChange={(event) => setMoveSalePrice(event.target.value)} />
                   
                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeMoveForm()}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default Inventory;
