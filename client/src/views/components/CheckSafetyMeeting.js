import React, {useState} from 'react'
import Checkbox from 'react-simple-checkbox';
import * as Auth from '../../utils/Auth';

const BASE_URL = "http://localhost:5001/api";
const CheckSafetyMeeting = (props) => {
    const [completed, setCompleted] = useState(props.safetyMeeting)

    const changeSafetyMeetingCompleted = async(check) => {
        if (props.clientId != Auth.getID()) {
            Auth.forceLogout();
        } else {
            try{
                const response = await fetch(BASE_URL + '/JobLabourers', {
                    method : 'PUT',
                    headers : {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${Auth.getToken()}`
                    }, 
                    body : JSON.stringify({
                        JobId : props.jobId,
                        LabourerId : props.labourerId,
                        DailyQualityRating : check
                    })
                })
                const data = await response.json()
                if (data) {
                    setCompleted(check)
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div>
            <Checkbox size="3" tickSize="0" color="#5969ff" 
                onChange={changeSafetyMeetingCompleted} 
                checked={props.clientId == Auth.getID() ? completed : null } />
            <span className="ml-2">
                {props.firstname} {props.lastname}
            </span>
        </div>

    )

}

export default CheckSafetyMeeting