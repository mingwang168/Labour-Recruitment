import React, { useState } from 'react'
import Ratings from 'react-ratings-declarative';
import {forceLogout} from '../../utils/Auth'

const BASE_URL = "http://localhost:5001/api";
const RateWorkers = (props) => {
    const [rating, setRating] = useState(props.rating)

    const changeSafetyRating = async(newRating) => {
        let token = sessionStorage.getItem("auth_token")
        if (token == null) {
            forceLogout()
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
                props.clientName === sessionStorage.getItem("user_name") &&
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