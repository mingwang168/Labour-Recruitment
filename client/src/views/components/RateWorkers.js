import React from 'react'
import Ratings from 'react-ratings-declarative';

const RateWorkers = (props) => {
    console.log(props)
    const changeSafetyRating = async (newRating) => {
        let newBody = {
            jobId : props.jobId,
            labourerId : props.labourerId, 
            labourerSafetyRating : newRating,
        }
        console.log(newBody)
    }

    return (
        <Ratings
            rating={props.rating}
            widgetDimensions="14px"
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