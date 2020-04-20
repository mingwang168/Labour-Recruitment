import React from 'react';
import Select from 'react-select';

const AddJobWidget = (props) => {

    let options = [
        {value: 'carpentry', label: 'Carpentry'},
        {value: 'painting', label: 'Painting'},
        {value: 'drywall', label: 'Drywall'},
        {value: 'electrical', label: 'Electrical'},
        {value: 'plumbing', label: 'Plumbing'},
        {value: 'framing', label: 'Framing'},
        {value: 'roofing', label: 'Roofing'},
        {value: 'demolition', label: 'Demolition'}
    ]

    return (
    <>
    <form>
    <div className="form-row">
        <div className="col col-md-3">
        <Select options={options} />
        </div>
        <div className="col col-md-1">
        <input
            required
            type="number"
            name="workersrequired"
            placeholder="# required"
            className="form-control form-control-lg"
        />
        </div>
        <div className="col">
        <input
            type="submit"
            value="Add"
            name="skill"
            className="btn btn-primary btn-lg"
        />
        </div>
    </div>
    </form>
    </>
    )
}

export default AddJobWidget;