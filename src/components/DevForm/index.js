import React, { useState, useEffect } from 'react';
import './Form.css'
const Form = (props) => {
    const [github_username, setGitHubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                console.log(error)
            },
            {
                timeout: 30000
            }
        );
    }, [])

    const handleAddDev = async (e) => {
        e.preventDefault();
        await props.onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });
        setGitHubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleAddDev}>
            <div className="input-block">
                <label htmlFor="username_github" >Github User</label>
                <input name="github_username" id="username_github" required value={github_username} onChange={e => setGitHubUsername(e.target.value)} />
            </div>
            <div className="input-block">
                <label htmlFor="techs" >Tecnologies</label>
                <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude" >Latitude</label>
                    <input name="latitude" id="latitude" required value={latitude} type="number" onChange={e => setLatitude(e.target.value)} />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude" >Longitude</label>
                    <input name="longitude" id="longitude" required value={longitude} type="number" onChange={e => setLongitude(e.target.value)} />
                </div>
            </div>
            <button type="submit" >Save</button>
        </form>)
}

export default Form;