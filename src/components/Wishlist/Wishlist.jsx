import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

function Wishlist() {
    const user = useSelector((store) => store.user);
    const cards = useSelector((store) => store.card);
    const editCard = useSelector((store) => store.editCard);

    // local state for add new card functionality
    const [player_name, setPlayerName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [series, setSeries] = useState('');
    const [year, setYear] = useState('');
    // default status to wishlist when adding from wishlist
    const [status, setStatus] = useState('wishlist');



    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_CARDS' }),
            closeAddForm(),
            closeEditForm(),
            closeMoveForm()
    }, [])

    // filter cards out cards that the user does not have in their wishlist
    const filteredCards = cards.filter(card => card.user_id === user.id && card.status === 'wishlist')



    function openAddForm() {
        document.getElementById("addForm").style.display = "block";
    }

    function closeAddForm() {
        document.getElementById("addForm").style.display = "none";
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
                history.push('/wishlist');
                dispatch({ type: 'FETCH_CARDS' });
            })
            .catch(error => {
                console.log('error on PUT: ', error);
            })
        closeEditForm();
    };

    function handleSubmitMoveToInventory(event) {
        event.preventDefault();
        // send edited info to database, set status to inventory to render on inventory page

        const updatedCard = {
            ...editCard,
            status: 'inventory'
        };

        axios.put(`/api/inventory/${editCard.card_id}`, updatedCard)
            .then(response => {
                dispatch({ type: 'EDIT_CLEAR' });
                history.push('/wishlist');
                dispatch({ type: 'FETCH_CARDS' });
                closeMoveForm()
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
        document.getElementById("editForm").style.display = "block";
        history.push('/wishlist/edit')
    }

    const handleMoveClick = (card) => {
        dispatch({
            type: 'SET_EDIT_CARD',
            payload: {
                card
            }
        })
        document.getElementById("moveForm").style.display = "block";
        history.push('/wishlist/edit')
    }



    return (
        <>
            <h1>Wishlist</h1>
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
                            <td>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="outlined" onClick={() => handleClick(card)} startIcon={<EditIcon />}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" onClick={() => handleMoveClick(card)} endIcon={<InventoryIcon />}>
                                        Mark Purchased
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
                    // send all info needed for wishlist page
                    dispatch({
                        type: "ADD_CARD",
                        payload: {
                            player_name,
                            manufacturer,
                            series,
                            year,
                            status,
                        }
                    });
                    setPlayerName('');
                    setManufacturer('');
                    setSeries('');
                    setYear('');
                    document.getElementById("addForm").style.display = "none";
                }}>
                    <h1>Enter New Card</h1>

                    <div className="form-group">
                        <label htmlFor="playerName">Player Name:</label>
                        <input type="text" id="playerName"  value={player_name} onChange={(event) => setPlayerName(event.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="manufacturer">Manufacturer:</label>
                        <input type="text" id="manufacturer"  value={manufacturer} onChange={(event) => setManufacturer(event.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="series">Series:</label>
                        <input type="text" id="series"  value={series} onChange={(event) => setSeries(event.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Year:</label>
                        <input type="text" id="year"  value={year} onChange={(event) => setYear(event.target.value)} />
                    </div>

                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeAddForm()}>Cancel</button>
                </form>
            </div>
            {/* start of edit form */}
            <div className="form-popup" id="editForm">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h1>Edit Card</h1>

                    <div className="form-group">
                        <label htmlFor="playerName">Player Name:</label>
                        <input type="text" id="playerName" placeholder="Enter player name" value={editCard.player_name} onChange={(event) => handleChange(event, 'player_name')} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="manufacturer">Manufacturer:</label>
                        <input type="text" id="manufacturer" placeholder="Enter manufacturer" value={editCard.manufacturer} onChange={(event) => handleChange(event, 'manufacturer')} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="series">Series:</label>
                        <input type="text" id="series" placeholder="Enter series" value={editCard.series} onChange={(event) => handleChange(event, 'series')} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Year:</label>
                        <input type="text" id="year" placeholder="Enter year" value={editCard.year} onChange={(event) => handleChange(event, 'year')} />
                    </div>

                    <button type="submit" className="btn">Save</button>
                    <button type="button" className="btn cancel" onClick={() => closeEditForm()}>Cancel</button>
                </form>
            </div>

            {/* start of move form */}
            <div className="form-popup" id="moveForm">
                <form className="form-container" onSubmit={handleSubmitMoveToInventory}>
                    <h1>Move to Inventory</h1>

                    <div className="form-group">
                        <label htmlFor="grade">Grade:</label>
                        <input type="text" id="grade" placeholder="Enter grade" value={editCard.grade} onChange={(event) => handleChange(event, 'grade')} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="datePurchased">Date Purchased:</label>
                        <input type="date" id="datePurchased" placeholder="Enter date purchased" value={editCard.date_purchased} onChange={(event) => handleChange(event, 'date_purchased')} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="purchasePrice">Purchase Price:</label>
                        <input type="text" id="purchasePrice" placeholder="Enter purchase price" value={editCard.purchase_price} onChange={(event) => handleChange(event, 'purchase_price')} />
                    </div>

                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeMoveForm()}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default Wishlist;