import React , {useState, useEffect} from "react";

import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import * as Auth from '../../utils/Auth';

const BASE_URL = "http://localhost:5001/api";

const LabourerProfile = (props) => {
	const [labourerFirstName, setLabourerFirstName] = useState('');
	const [labourerLastName, setLabourerLastName] = useState('');
	const [availability, setAvailability] = useState(true);
	const [labourerEmail, setLabourerEmail] = useState('');
	const [averageSafety, setAverageSafety] = useState('');
	const [averageQuality, setAveraveQuality] = useState('');
	
	const fetchLabourerProfile = async() =>{
		try	
		{
			let response = await fetch(BASE_URL + `/LabourerProfile/${Auth.getID()}`,{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${Auth.getToken()}`
			} 
			});
			let data = await response.json();
			console.log(data);
			setLabourerFirstName(data.labourer.labourerFirstName);
			setLabourerLastName(data.labourer.labourerLastName);
			setAvailability(data.labourer.isAvailable);
			setLabourerEmail(data.labourer.labourerEmail);
			setAverageSafety(data.labourer.averageSafety);
			setAveraveQuality(data.labourer.averageQuality);
		} catch(e){
			console.log(e);
		}
	}

	useEffect(() => {
		fetchLabourerProfile();
	}, [])

	
	return (
	<div className="dashboard-main-wrapper">
		<TopNav />
		<SideNav />

		<div className="dashboard-wrapper">
		<div className="container-fluid dashboard-content">
		<div className="main-content-container container-fluid px-4">
			<div className="page-header row no-gutters py-4">
			<div className="col-12 col-sm-4 text-center text-sm-left mb-0">
				<h3 className="page-title">Labourer Profile</h3>
			</div>
			</div>

			<div className="row">
			<div className="col">
			<div className="mb-4 pt-3 card card-small">
                <div className="border-bottom text-center card-header">
                    <h4 className="mb-1">{labourerFirstName} {labourerLastName}</h4>
                    <span className="m-5">{availability ? 'Available' : 'Not Available'}</span>
                </div>               
			</div>
			</div>
			</div>

			<div className="row">
			<div className="col">
			<div className="mb-4 card card-small">
			<div className="border-bottom card-header d-flex justify-content-between">
				<h6 className="m-0">Account Details</h6>
				<span>
					<i className="far fa-edit"></i>
				</span>
			</div>
			<ul className="list-group list-group-flush">
				<li className="p-3 list-group-item">
					<table>
						<tbody>
						<tr>
							<td className="text-muted d-block pl-4 pr-4 pb-3">
							<strong className="text-muted d-block">
								Email:
							</strong>
							</td>
							<td className="pl-4 pr-4 pb-3">
								{labourerEmail}
							</td>
						</tr>
						{/* <tr>
							<td className="text-muted d-block pl-4 pr-4 pb-3">
							<strong className="text-muted d-block">
								Availability:
							</strong>
							</td>
							<td className="pl-4 pr-4 pb-3">
								
								Monday<br />
								Wednesday<br />
								Friday
							</td>
						</tr> */}
						</tbody>
					</table>
				</li>
				<li className="p-3 pb-4 list-group-item">
				<table className="pl-4">
					<tbody>
					<tr>
						<td>
						<strong className="text-muted d-block">
						Average Safty Rating
						</strong>
						</td>
						<td>
						<span className="pl-4 pb-3">
						<i className="fas fa-star mr-2"></i>
							{averageSafety} 4.91 (18 ratings)
						</span>
						</td>
					</tr>
					<tr>
						<td>
						<strong className="text-muted d-block">
							Average Quality Rating
						</strong>
						</td>
						<td>
							<span className="pl-4 pb-3">
							<i className="fas fa-star mr-2"></i>
								{averageQuality} 4.91 (18 ratings)
							</span>
						</td>
					</tr>
					</tbody>
				</table>
				</li>
			</ul>
			</div>
			</div>
			</div>
		</div>
		</div>
	    </div>
	</div>
	);
};

export default LabourerProfile;
