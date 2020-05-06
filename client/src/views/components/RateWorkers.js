import React, { useState } from 'react'
import Ratings from 'react-ratings-declarative';
import * as Auth from '../../utils/Auth';


const RateWorkers = (props) => {
    
    const changeRating = async(newRating) => {
        props.changeRating(newRating, props.labourerId)
    }
    
    return (
        <Ratings
            rating= {props.rating}
            widgetDimensions="14px"
            name = "rating"
            changeRating = { 
                props.clientId == Auth.getID() ?
                changeRating : null
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