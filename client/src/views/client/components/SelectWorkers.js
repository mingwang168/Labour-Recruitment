import React, { useState } from 'react';
import Select from 'react-select';

let options = [
    {skillId: '1', value: 'carpentry', label: 'Carpentry'},
    {skillId: '2', value: 'painting', label: 'Painting'},
    {skillId: '3', value: 'drywall', label: 'Drywall'},
    {skillId: '4', value: 'electrical', label: 'Electrical'},
    {skillId: '5', value: 'plumbing', label: 'Plumbing'},
    {skillId: '6', value: 'framing', label: 'Framing'},
    {skillId: '7', value: 'roofing', label: 'Roofing'}
]

const SelectWorkers = ({workers, setWorkers}) => {

    const [selectedSkill, setSelectedSkill] = useState();
    const [selectedNumWorkers, setSelectedNumWorkers] = useState('');

    const addWorkers = () => {
        if(selectedSkill && selectedNumWorkers > 0) {
            if(workers.length && workers.findIndex(i => i.skill === selectedSkill) > -1) {
                let indexOfExistingSkill = workers.findIndex(i => i.skill === selectedSkill);
                if(indexOfExistingSkill > -1) {
                    let updated = [...workers];
                    updated[indexOfExistingSkill].quantity = selectedNumWorkers;
                    setWorkers(updated);
                } else {
                    setWorkers(workers => [...workers, {skillId: getSkillIdByName(selectedSkill), skill: selectedSkill, quantity: selectedNumWorkers}]);
                }
            } else {
                setWorkers(workers => [...workers, {skillId: getSkillIdByName(selectedSkill), skill: selectedSkill, quantity: selectedNumWorkers}]);
            }
            setSelectedNumWorkers('');
        }
    }

    const deleteWorkers = (index) => {
        if(workers.length <= 1) {
            setWorkers([]);
        } else {
            let updated = workers.filter((worker, i) => i !== index);
            setWorkers(updated);
        }
    }

    const getSkillIdByName = (name) => {
        let id = null;
        options.forEach((i) => {
            if(name === i.label) {
                id = i.skillId;
                return;
            }
        })
        return id;
    }

    return (
    <div className="form-group">
        <label htmlFor="workers">Select workers <span className="text-danger">*</span></label>
            
        { workers.length ?
        <div className="row m-2">
        <table className="table col col-md-6 select-workers-widget">
        <tbody>
        {workers.map((item, i) => (
            <tr key={i}>
                <td>{item.skill}</td>
                <td>{item.quantity} required</td>
                <td><span onClick={() => deleteWorkers(i)} className="p-2 badge badge-danger" style={{cursor:'pointer'}}>Remove</span></td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
        : <p className="pt-1 font-12 text-secondary">No workers added yet.</p>}

        <div className="form-row">
            <div className="col col-md-5 col-lg-2">
            <Select
                options={options}
                onChange={e => setSelectedSkill(e.label)}
            />
            </div>
            <div className="col col-md-5 col-lg-1">
            <input
                value={selectedNumWorkers}
                onChange={e => setSelectedNumWorkers(e.target.value)}
                type="number"
                min="0"
                max="999"
                name="workersrequired"
                placeholder="# required"
                className="form-control form-control-lg"
            />
            </div>
            <div className="col col-md-2 col-lg-1">
            <span
                onClick={addWorkers}
                className="btn btn-light btn-lg"
            >
                Add
            </span>
            </div>
        </div>
    </div>
    )
}

export default SelectWorkers;
