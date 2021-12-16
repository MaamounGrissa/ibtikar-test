import React, { useEffect, useState } from 'react';
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";

// Confirm Modal Component

const ConfirmModal = ({show, yes, no}) => {
    return (
        <div className={show ? 'modal show' : 'modal'}>
            <div className='modal-content'>
                <div className='modal-header'>
                    Confirm
                </div>
                <div className='modal-body'>
                    Are you sure you want to delete this building?
                </div>
                <div className='modal-footer'>
                    <button className='btn' onClick={yes} >Yes</button>
                    <button className='btn' onClick={no}>No</button>
                </div>
            </div>
        </div>
    )
}

// Building List Component

function BuildingsList(props) {
    /* Get selected user from props */
    const { selectedUser, buildings, selectedBuilding } = props;
    /* Define state for filtred buildings */
    const [myBuildings, setMyBuilding] = useState([]);
    /* Define state for shoing confirm modal */
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        if (buildings && selectedUser) {
            /* Filter buildings by selected user */
            setMyBuilding(buildings.filter((building) => parseInt(building.userId) === parseInt(selectedUser)));
        }
    }, [buildings, selectedUser])

    return (
        <div className='list-container'>
            <div className='list-header'>
                Buildings List
            </div>
            <div className='list-content'>
                {   /* If no buildings or selected user, show loading */
                    !buildings || !selectedUser ? (
                        <div className='loading'><img src="/images/loading.gif" alt="loading" /></div>
                    ) : (
                        myBuildings?.map(building =>
                            /* Building Item */
                            <div className='list-item' key={building.id} 
                                onClick={() => props.selectBuilding(building)}
                                style={selectedBuilding?.id === building.id ? {background: "#172f42e3"} : {background: "none"} }>
                                <span>{building.name}</span>
                                <div className='item-actions'>
                                    <BsFillPencilFill onClick={(e) => {
                                        /* Building Edit Button */
                                        e.stopPropagation();
                                        props.selectBuilding(building);
                                        props.openForm();
                                    }} />
                                    <BsFillTrashFill onClick={(e) => {
                                        /* Building Delete Button */
                                        e.stopPropagation();
                                        setShowConfirmModal(true);
                                    }} />
                                </div>
                            </div>    
                        )
                    )
                }
            </div>
            <div className='list-action'>
                {/* Button Add Building  */}
                <button className='btn' onClick={(e) => {
                    e.preventDefault();
                    if (!selectedUser) {
                        alert("Please select user");
                    } else {
                        props.selectBuilding(null);
                        props.openForm();
                    }
                    }}>Add building</button>
            </div>
            {/* Modal - To confirm Deleting building  */}
            <ConfirmModal show={showConfirmModal}
                no={() => setShowConfirmModal(false)} 
                yes={() => {
                    props.deleteBuilding()
                    setShowConfirmModal(false);
                }} />
        </div>
    )
}

export default BuildingsList
