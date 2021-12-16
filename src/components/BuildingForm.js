import React, { useCallback, useContext, useEffect, useState } from 'react';
import { actions } from '../Reducer';
import { BuildingsContext } from '../App';

function BuildingForm(props) {
    const { countriesList, building, selectedUser, show } = props;
    const { dispatch } = useContext(BuildingsContext);
    
    const [formData, setFormData] = useState({
        id: null,
        userId: selectedUser,
        name: '',
        country: '',
    });

    const clear = useCallback(() => {
        setFormData({
            id: null,
            userId: selectedUser,
            name: '',
            country: '',
        });
    }, [selectedUser]);
    
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

    const handleSave = (e) => {
        e.preventDefault();
        if (building) {
            dispatch({ type: actions.EDIT_BUILDING, payload: formData });
        } else {
            dispatch({ type: actions.ADD_BUILDING, payload: formData });
        }
        clear();
        props.close();
    }

    return (
        <div className={show ? 'form-container show' : 'form-container'}>
            <form>
                <div className='form-body'>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="input" id="name" placeholder="Building name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
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
                    <button className="btn" onClick={(e) => {
                        e.preventDefault()
                        props.close()
                    }}>Cancel</button>
                    <button type="submit" className="btn" onClick={e => handleSave(e)}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default BuildingForm
