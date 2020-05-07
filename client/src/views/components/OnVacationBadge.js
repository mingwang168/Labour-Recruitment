import React, {useState} from 'react'
import Checkbox from 'react-simple-checkbox';
import * as Auth from '../../utils/Auth';

const BASE_URL = "http://localhost:5001/api";
const OnVacationBadge = (props) => {
    const [onVacation, setOnVacation] = useState(props.onLeave)

    const ChangeOnVacation = async(check) => {
            try{
                const response = await fetch(BASE_URL + '/LabourerProfile', {
                    method : 'PUT',
                    headers : {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${Auth.getToken()}`
                    }, 
                    body : JSON.stringify({
                        LabourerId : props.labourerId,
                    })
                })
                const data = await response.json()
                if (data) {
                    setOnVacation(check)
                }
            } catch (err) {
                console.error(err);
            }
 
    }

    return (
        <div>
            <Checkbox size="2" tickSize="0" color="#5969ff" 
                onChange= {ChangeOnVacation} 
                checked={onVacation} />
            <span className="ml-1">
                On Vacation
            </span>
        </div>

    )

}
export default OnVacationBadge