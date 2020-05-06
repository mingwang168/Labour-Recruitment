import React, {useState} from 'react'
import Checkbox from 'react-simple-checkbox';

const CheckSafetyMeeting = (props) => {
    const [completed, setCompleted] = useState(props.safetyMeeting)
    const changeSafetyMeetingCompleted = (newVal) => {
        console.log(newVal)
    }

    return (
        <div>
            <Checkbox size="3" tickSize="0" color="#5969ff" onChange={changeSafetyMeetingCompleted} 
                        checked={completed} />
            <span className="ml-2">
                {props.firstname} {props.lastname}
            </span>
        </div>

    )

}

export default CheckSafetyMeeting