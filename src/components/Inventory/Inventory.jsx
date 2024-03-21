import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SellIcon from '@mui/icons-material/Sell';
import Stack from '@mui/material/Stack';

import './Inventory.css'


function Inventory() {
    const user = useSelector((store) => store.user);
    const cards = useSelector((store) => store.card);
    const editCard = useSelector((store) => store.editCard);

    const history = useHistory();
    console.log(cards)
    console.log(editCard)

    // local state for add new card functionality
    const [player_name, setPlayerName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [series, setSeries] = useState('');
    const [year, setYear] = useState('')
    const [grade, setGrade] = useState('')
    const [date_purchased, setDatePurchased] = useState('')
    const [purchase_price, setPurchasePrice] = useState('')
    // default status to inventory when adding from inventory
    const [status, setStatus] = useState('inventory')

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

    function openEditForm() {
        document.getElementById("editForm").style.display = "block";
    }

    function closeEditForm() {
        document.getElementById("editForm").style.display = "none";
    }


    function closeMoveForm() {
        document.getElementById("moveForm").style.display = "none";
    }

    const deleteCard = (card) => {
        // confirmation dialogue on delete
        Swal.fire({
            title: 'Are you sure you want to delete this card?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
        })
            .then((res) => {
                if (res.isConfirmed) {
                    dispatch({ type: 'DELETE_CARD', payload: card.card_id })
                }
            })
    }

    function handleChange(event, key) {
        // capture input changes while editing
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: key, value: event.target.value
            }
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        // send edited values to database, close forms, exit edit mode

        axios.put(`/api/inventory/${editCard.card_id}`, editCard)
            .then(response => {
                dispatch({ type: 'EDIT_CLEAR' });
                history.push('/inventory');
                dispatch({ type: 'FETCH_CARDS' });
            })
            .catch(error => {
                console.log('error on PUT: ', error);
            })
        closeEditForm();
        closeMoveForm();
    };

    function handleSubmitMoveToSold(event) {
        event.preventDefault();
        // send edited info to database, set status to sold to render on sold cards page

        const updatedCard = {
            ...editCard,
            status: 'sold'
        };

        axios.put(`/api/inventory/${editCard.card_id}`, updatedCard)
            .then(response => {
                dispatch({ type: 'EDIT_CLEAR' });
                history.push('/inventory');
                dispatch({ type: 'FETCH_CARDS' });
            })
            .catch(error => {
                console.log('error on PUT: ', error);
            });
    }

    const handleClick = (card) => {
        // set edit mode on the clicked on card
        dispatch({
            type: 'SET_EDIT_CARD',
            payload: {
                card
            }
        })
        closeAddForm()
        // document.getElementById("editForm").style.display = "block";
        openEditForm();
        history.push('/inventory/edit')
    }

    const handleMoveClick = (card) => {
        dispatch({
            type: 'SET_EDIT_CARD',
            payload: {
                card
            }
        })
        document.getElementById("moveForm").style.display = "block";
        history.push('/inventory/edit')
    }

    return (
        <>
            <h1>Your Inventory</h1>
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
                            <td>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="outlined" onClick={() => handleClick(card)} startIcon={<EditIcon />}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" onClick={() => handleMoveClick(card)} endIcon={<SellIcon />}>
                                        Mark Sold
                                    </Button>
                                    <Button variant="contained" onClick={() => deleteCard(card)} endIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                    <button className="open-button" onClick={(event) => openAddForm()}>Add New Card</button>
                </tbody>
            </table>
            <div className="form-popup" id="addForm">
                <form className="form-container" onSubmit={(event) => {
                    event.preventDefault();
                    // send all info needed for inventory page
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
                <form className="form-container" onSubmit={handleSubmit} >
                    <h1>Edit Card</h1>

                    <input type="text" placeholder="Player Name" value={editCard.player_name} onChange={(event) => handleChange(event, 'player_name')} />
                    <input type="text" placeholder="Manufacturer" value={editCard.manufacturer} onChange={(event) => handleChange(event, 'manufacturer')} />
                    <input type="text" placeholder="Series" value={editCard.series} onChange={(event) => handleChange(event, 'series')} />
                    <input type="text" placeholder="Year" value={editCard.year} onChange={(event) => handleChange(event, 'year')} />
                    <input type="text" placeholder="Grade" value={editCard.grade} onChange={(event) => handleChange(event, 'grade')} />
                    <input type="text" placeholder="Date Purchased" value={editCard.date_purchased} onChange={(event) => handleChange(event, 'date_purchased')} />
                    <input type="text" placeholder="Purchase Price" value={editCard.purchase_price} onChange={(event) => handleChange(event, 'purchase_price')} />


                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeEditForm()}>Cancel</button>
                </form>
            </div>

            {/* start of add to sold form */}
            <div className="form-popup" id="moveForm">
                <form className="form-container" onSubmit={handleSubmitMoveToSold} >
                    <h1>Move to Sold</h1>

                    <input type="text" placeholder="Date Sold" value={editCard.date_sold} onChange={(event) => handleChange(event, 'date_sold')} />
                    <input type="text" placeholder="Sale Price" value={editCard.sale_price} onChange={(event) => handleChange(event, 'sale_price')} />

                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeMoveForm()}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default Inventory;
