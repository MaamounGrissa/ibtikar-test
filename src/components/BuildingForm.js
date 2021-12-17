import React, { useCallback, useContext, useEffect, useState } from 'react';
import { actions } from '../Reducer';
import { BuildingsContext } from '../App';

function BuildingForm(props) {
    const { countriesList, building, selectedUser, show } = props;
    // Define Dispatch
    const { dispatch } = useContext(BuildingsContext);
    // Define State for loading (on Add and on Edit)
    const [loading, setLoading] = useState(false);
    // Define form data state
    const [formData, setFormData] = useState({
        id: null,
        userId: selectedUser,
        name: '',
        country: '',
    });
    // Function to clear form data
    const clear = useCallback(() => {
        setFormData({
            id: null,
            userId: selectedUser,
            name: '',
            country: '',
        });
    }, [selectedUser]);
    
    // checking for building(props) changing 
    // if is selected building so set formData to building else clear formData
    useEffect(() => {
        if (building) {
            setFormData({
                id: building.id,
                userId: building.userId,
                name: building.name,
                country: building.country,
            });
        } else {
            clear();
        }
    }, [building, clear]);

    // Function to handle Save event 
    // Edit if building is selected else Add
    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);
        if (building) {
            dispatch({ type: actions.EDIT_BUILDING, payload: formData });
        } else {
            dispatch({ type: actions.ADD_BUILDING, payload: formData });
            clear();
        }
        // props.close();
    }

    // UseEffect to check if loading is true

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [loading]);

    return (
        <div className={show ? 'form-container show' : 'form-container'}>
            <form>
                <div className='form-body'>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        {/* Name Building Input */}
                        <input type="text" className="input" id="name" placeholder="Building name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        {/* List Coutries Select - Mapping countries list  */}
                        <select className="input" id="location"
                                value={formData.country}
                                onChange={e => setFormData({ ...formData, country: e.target.value})}>
                            <option value="">Select country</option>
                            {countriesList.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-actions">
                    {/* Cancel Button */}
                    <button className="btn saveBtn" onClick={(e) => {
                        e.preventDefault()
                        props.close()
                    }}>Cancel</button>
                    {/* Save Button */}
                    <button type="submit" className="btn saveBtn" 
                            onClick={e => handleSave(e)}>
                    Save {loading && <img src="/images/loading2.gif" alt="loading" style={{ width: '20px', marginLeft: '8px' }} />}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BuildingForm
