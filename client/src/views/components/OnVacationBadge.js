import React, {useState} from 'react'
import Checkbox from 'react-simple-checkbox';
import * as Auth from '../../utils/Auth';

const BASE_URL = "http://localhost:5001/api";

const OnVacationBadge = ({ labourerId, onLeave }) => {

    const [onVacation, setOnVacation] = useState(onLeave);

    const ChangeOnVacation = async(check) => {
        try {
            const URI = BASE_URL + '/LabourerProfile';
            const response = await fetch(URI, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${Auth.getToken()}`
                }, 
                body: JSON.stringify({
                    LabourerId: labourerId,
                    OnLeave: check
                })
            });

            if(response.status !== 200) {
                throw response;
            }

            const data = await response.json();

            if(data) {
                setOnVacation(check);
            }

        } catch(e) {
            console.error(e);
        }
    }

    return(
        <>
            <Checkbox
                size="2"
                tickSize="0"
                color="#5969ff" 
                onChange= {ChangeOnVacation} 
                checked={onVacation}
            />
            <span className="ml-1">
                On Vacation
            </span>
        </>
    );
}

export default OnVacationBadge;