import React from 'react'
import Ratings from 'react-ratings-declarative';

const BASE_URL = "http://localhost:5001/api";
const RateWorkers = (props) => {

    const changeSafetyRating = async(newRating) => {
        let token = sessionStorage.getItem("auth_token")
        let newBody = {
            JobId : props.jobId,
            LabourerId : props.labourerId,
            LabourerSafetyRating : newRating
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
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Ratings
            rating={props.rating}
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