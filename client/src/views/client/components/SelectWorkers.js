import React, { useState, useEffect } from 'react';
import Select from 'react-select';


const BASE_URL = "http://localhost:5001/api";

const SelectWorkers = ({workers, setWorkers, jobSkills, setJobSkills}) => {

    const [skills, setSkills] = useState([])
    const [selectedSkill, setSelectedSkill] = useState();
    const [selectedNumWorkers, setSelectedNumWorkers] = useState('');

    useEffect (() => {
        const fetchSkills = async() => {
            try {
                const response = await fetch(BASE_URL + '/skills');
                let data = await response.json();
                setSkills(data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchSkills()
    }, [])

    const addWorkers = () => {
        if(selectedSkill && selectedNumWorkers > 0) {
            if(workers.length && workers.findIndex(i => i.skill === selectedSkill) > -1) {
                let indexOfExistingSkill = workers.findIndex(i => i.skill === selectedSkill);
                if(indexOfExistingSkill > -1) {
                    let updated = [...workers];
                    let skillUpdated = [...jobSkills]
                    updated[indexOfExistingSkill].quantity = selectedNumWorkers;
                    skillUpdated[indexOfExistingSkill].NumberNeeded = selectedNumWorkers;
                    setWorkers(updated);
                    setJobSkills(skillUpdated)
                } else {
                    setWorkers(workers => [...workers, {skillId: getSkillIdByName(selectedSkill), skill: selectedSkill, quantity: selectedNumWorkers}]);
                    setJobSkills(jobSkills => [ ...jobSkills, {skillId: getSkillIdByName(selectedSkill), NumberNeeded : selectedNumWorkers}])
                }
            } else {
                setWorkers(workers => [...workers, {SkillId: getSkillIdByName(selectedSkill), skill: selectedSkill, quantity: selectedNumWorkers}]);
                setJobSkills(jobSkills => [ ...jobSkills, {SkillId: getSkillIdByName(selectedSkill), NumberNeeded : selectedNumWorkers}])
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
        skills.forEach((i) => {
            if(name === i.skillName) {
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
            <div className="col col-md-5 col-lg-4 col-xl-4">
            <Select
                options={
                    skills.map((skill, i) => {
                    return { value: skill.skillId, label: skill.skillName } 
                    }) 
                } 
                onChange={e => setSelectedSkill(e.label)}
            />
            </div>
            <div className="col col-md-5 col-lg-3 col-xl-2">
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
