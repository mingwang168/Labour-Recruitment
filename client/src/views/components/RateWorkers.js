import React, { useState } from 'react'
import Ratings from 'react-ratings-declarative';
import * as Auth from '../../utils/Auth';

const BASE_URL = "http://localhost:5001/api";
const RateWorkers = (props) => {
    const [rating, setRating] = useState(props.rating)

    const changeSafetyRating = async(newRating) => {
        let token = Auth.getToken()
        if (token == null) {
            Auth.forceLogout()
        }
        try{
            const response = await fetch(BASE_URL + '/JobHistory/LabourerSafety', {
                method : 'PUT',
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }, 
                body : JSON.stringify({
                    JobId : props.jobId,
                    LabourerId : props.labourerId,
                    LabourerSafetyRating : newRating
                })
            })
            const data = await response.json()
            if (data) {
                setRating(data.labourerSafetyRating)
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Ratings
            rating={rating}
            widgetDimensions="14px"
            name = "rating"
            changeRating = { 
                props.clientName === Auth.getName() &&
                changeSafetyRating
            }
        >
            <Ratings.Widget widgetHoverColor="#6d7a82"/>
            <Ratings.Widget widgetHoverColor="#6d7a82"/>
            <Ratings.Widget widgetHoverColor="#6d7a82"/>
            <Ratings.Widget widgetHoverColor="#6d7a82"/>
            <Ratings.Widget widgetHoverColor="#6d7a82"/> 
        </Ratings>
    )

}

export default RateWorkers;