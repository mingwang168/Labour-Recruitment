import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import * as Auth from '../../utils/Auth';

const BASE_URL = "http://localhost:5001/api";
const LabourerList = (props) => {
    const [list, setList] = useState()
    
    const fetchGetLabourers= async() => {
        if (props.selectedJob) {
            const response = await fetch(BASE_URL + `/JobLabourers/${props.selectedJob}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            })
            const data = await response.json()
            setList(data)
        }
    }

    const onChangeLabourer = (labourers) => {
        if (labourers) {
            labourers.forEach(labourer => props.setselectedLabourers([...props.selectedLabourers,{ labourerId : labourer.value}]))
        }
    } 

    useEffect(() => {
        fetchGetLabourers()
    }, [])

    return (
        <Select
        required
        name="injuredLabourers"
        options={ list &&
            list.map(l => {return {value: l.labourerId, label: l.labourerFirstName + ' ' + l.labourerLastName}}) 
        } 
        onChange={onChangeLabourer}
        isMulti
        />
    )
}

export default LabourerList;