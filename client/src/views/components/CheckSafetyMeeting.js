import React, {useState} from 'react'
import Checkbox from 'react-simple-checkbox';
import * as Auth from '../../utils/Auth';

const BASE_URL = "http://localhost:5001/api";
const CheckSafetyMeeting = (props) => {
    const [completed, setCompleted] = useState(props.safetyMeeting)

    const changeSafetyMeetingCompleted = async(check) => {
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
                        SafetyMeetingCompleted : check
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

    return (
        <div>
            <Checkbox size="3" tickSize="0" color="#5969ff" 
                onChange={ Auth.getID() == props.clientId && changeSafetyMeetingCompleted } 
                checked={completed} />
            <span className="ml-2">
                {props.firstname} {props.lastname}
            </span>
        </div>

    )

}

export default CheckSafetyMeeting