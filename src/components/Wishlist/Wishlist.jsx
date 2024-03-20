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
import SellIcon from '@mui/icons-material/Sell';
import Stack from '@mui/material/Stack';

function Wishlist() {
    const user = useSelector((store) => store.user);
    const cards = useSelector((store) => store.card);
    const editCard = useSelector((store) => store.editCard);

    const [player_name, setPlayerName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [series, setSeries] = useState('');
    const [year, setYear] = useState('');
    const [status, setStatus] = useState('wishlist');
    const [id, setId] = useState('')


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
    
        function openMoveForm(card) {
            setId(card.card_id);
            document.getElementById("moveForm").style.display = "block";
        }
    
        function closeMoveForm() {
            document.getElementById("moveForm").style.display = "none";
        }
    
        const deleteCard = (card) => {
            Swal.fire({
                title:'Are you sure you want to delete this card?',
                showDenyButton:true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
            }) 
            .then((res) => {
                if(res.isConfirmed) {
                    dispatch({type: 'DELETE_CARD', payload: card.card_id})
                }
            })
        }
        function handleChange(event, key) {
            dispatch({
              type: 'EDIT_ONCHANGE',
              payload: {
                property: key, value: event.target.value
              }
            });
          }
          function handleSubmit(event) {
            event.preventDefault();
        
            axios.put(`/api/inventory/${editCard.card_id}`, editCard)
              .then(response => {         
                dispatch({ type: 'EDIT_CLEAR' });
                history.push('/wishlist');
                dispatch({ type: 'FETCH_CARDS'});
              })
              .catch(error => {
                console.log('error on PUT: ', error);
              })
              closeEditForm();
          };

          function handleSubmitMoveToInventory(event) {
            event.preventDefault();
    
            const updatedCard = {
                ...editCard,
                status: 'inventory'
              };
          
            axios.put(`/api/inventory/${editCard.card_id}`, updatedCard)
              .then(response => {         
                dispatch({ type: 'EDIT_CLEAR' });
                history.push('/wishlist');
                dispatch({ type: 'FETCH_CARDS'});
                closeMoveForm()
              })
              .catch(error => {
                console.log('error on PUT: ', error);
              });
            }
    
          const handleClick = (card) => {
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
    
                        <input type="text" placeholder="Player Name" value={player_name} onChange={(event) => setPlayerName(event.target.value)} />
                        <input type="text" placeholder="Manufacturer" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)} />
                        <input type="text" placeholder="Series" value={series} onChange={(event) => setSeries(event.target.value)} />
                        <input type="text" placeholder="Year" value={year} onChange={(event) => setYear(event.target.value)} />

    
                        <button type="submit" className="btn">Add</button>
                        <button type="button" className="btn cancel" onClick={() => closeAddForm()}>Cancel</button>
                    </form>
                </div>
                <div className="form-popup" id="editForm">
                <form className="form-container" onSubmit={handleSubmit} >
                    <h1>Edit Card</h1>

                    <input type="text" placeholder="Player Name" value={editCard.player_name} onChange={(event) => handleChange(event, 'player_name')} />
                    <input type="text" placeholder="Manufacturer" value={editCard.manufacturer} onChange={(event) => handleChange(event, 'manufacturer')} />
                    <input type="text" placeholder="Series" value={editCard.series} onChange={(event) => handleChange(event, 'series')} />
                    <input type="text" placeholder="Year" value={editCard.year} onChange={(event) => handleChange(event, 'year')} />
                   

                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeEditForm()}>Cancel</button>
                </form>
            </div>

            <div className="form-popup" id="moveForm">
            <form className="form-container" onSubmit={handleSubmitMoveToInventory} >
                    <h1>Move to Inventory</h1>

                    <input type="text" placeholder="Grade" value={editCard.grade} onChange={(event) => handleChange(event, 'grade')} />
                    <input type="text" placeholder="Date Purchased" value={editCard.date_purchased} onChange={(event) => handleChange(event, 'date_purchased')} />
                    <input type="text" placeholder="Purchase Price" value={editCard.purchase_price} onChange={(event) => handleChange(event, 'purchase_price')} />
                   
                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeMoveForm()}>Cancel</button>
                </form>
            </div>
                </>
    )
}

export default Wishlist;