import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './SoldCards.css'
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

function SoldCards() {
    const user = useSelector((store) => store.user);
    const cards = useSelector((store) => store.card);
    const editCard = useSelector((store) => store.editCard);

      // local state for add new card functionality
    const [player_name, setPlayerName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [series, setSeries] = useState('');
    const [year, setYear] = useState('')
    const [grade, setGrade] = useState('')
    const [date_sold, setDateSold] = useState('')
    const [sale_price, setSalePrice] = useState('')
    // default status to sold when adding from sold page
    const [status, setStatus] = useState('sold')

    const dispatch = useDispatch();
    const history = useHistory();

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


    function closeEditForm() {
        document.getElementById("editForm").style.display = "none";
    }

    // move to inventory to be added

    // function closeMoveForm() {
    //     document.getElementById("moveForm").style.display = "none";
    // }

    const deleteCard = (card) => {
        // confirmation dialogue on delete
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
            history.push('/sold');
            dispatch({ type: 'FETCH_CARDS'});
          })
          .catch(error => {
            console.log('error on PUT: ', error);
          })
          closeEditForm();
      };

      const handleClick = (card) => {
        dispatch({
          type: 'SET_EDIT_CARD',
          payload: {
            card
          }
        })
        document.getElementById("editForm").style.display = "block";
        history.push('/sold/edit')
      }

    return (
        <>
        <h1>Sold Cards</h1>
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
                            <td>{'$' + card.sale_price}</td>
                            <td>
                            <Stack direction="row" spacing={2}>
                                    <Button variant="outlined" onClick={() => handleClick(card)} startIcon={<EditIcon />}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" onClick={() => deleteCard(card)} endIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
                    <button className="open-button" onClick={(event) => openAddForm()}>Add New Card</button>
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

    <div className="form-group">
        <label htmlFor="playerName">Player Name:</label>
        <input type="text" id="playerName" placeholder="Enter player name" value={player_name} onChange={(event) => setPlayerName(event.target.value)} />
    </div>

    <div className="form-group">
        <label htmlFor="manufacturer">Manufacturer:</label>
        <input type="text" id="manufacturer" placeholder="Enter manufacturer" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)} />
    </div>

    <div className="form-group">
        <label htmlFor="series">Series:</label>
        <input type="text" id="series" placeholder="Enter series" value={series} onChange={(event) => setSeries(event.target.value)} />
    </div>

    <div className="form-group">
        <label htmlFor="year">Year:</label>
        <input type="text" id="year" placeholder="Enter year" value={year} onChange={(event) => setYear(event.target.value)} />
    </div>

    <div className="form-group">
        <label htmlFor="grade">Grade:</label>
        <input type="text" id="grade" placeholder="Enter grade" value={grade} onChange={(event) => setGrade(event.target.value)} />
    </div>

    <div className="form-group">
        <label htmlFor="dateSold">Date Sold:</label>
        <input type="date" id="dateSold" placeholder="Enter date sold" value={date_sold} onChange={(event) => setDateSold(event.target.value)} />
    </div>

    <div className="form-group">
        <label htmlFor="salePrice">Sale Price:</label>
        <input type="text" id="salePrice" placeholder="Enter sale price" value={sale_price} onChange={(event) => setSalePrice(event.target.value)} />
    </div>

    <button type="submit" className="btn">Add</button>
    <button type="button" className="btn cancel" onClick={() => closeAddForm()}>Cancel</button>
</form>
            </div>
            {/* Start of edit form */}
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

    <div className="form-group">
        <label htmlFor="grade">Grade:</label>
        <input type="text" id="grade" placeholder="Enter grade" value={editCard.grade} onChange={(event) => handleChange(event, 'grade')} />
    </div>

    <div className="form-group">
        <label htmlFor="dateSold">Date Sold:</label>
        <input type="date" id="dateSold" placeholder="Enter date sold" value={editCard.date_sold} onChange={(event) => handleChange(event, 'date_sold')} />
    </div>

    <div className="form-group">
        <label htmlFor="salePrice">Sale Price:</label>
        <input type="text" id="salePrice" placeholder="Enter sale price" value={editCard.sale_price} onChange={(event) => handleChange(event, 'sale_price')} />
    </div>

    <button type="submit" className="btn">Save</button>
    <button type="button" className="btn cancel" onClick={() => closeEditForm()}>Cancel</button>
</form>
            </div>
        </>
    )
}

export default SoldCards;