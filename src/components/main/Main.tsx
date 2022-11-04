//Types
import {Users, Status, APIData} from "types/index";
//Default URL
import {defaultURL} from "../defaultURL";
//CSS
import "./main.scss";
//Components
import {CardList} from "components/card/CardList";
import { RegistrationForm } from "components/registration/RegistrationForm";
import { Button } from "components/button/Button";
//Hooks
import  { useState, useEffect} from "react";
import { Popup } from "components/popup/Popup";
//img
import SuccessfulImage from "assets/images/successful-image.jpg";


export const Main = () =>{
	const [users, setUsers] = useState<Users>([]);//state for data array 
	const [page , setPage] = useState<number>(1);
	const [nextUrl, setNextUrl] = useState<null | string>(null);
	const [status, setStatus] = useState<Status>("loading");
	const [successfulResponse, setSuccessfulResponse] = useState<boolean>(false);
	//state for updating users
	const nextPage = () =>{
		setPage(prev => prev + 1);
	}
	useEffect(() =>{
		setStatus("loading");
		const loadUsers = async () =>{
			try {
				const reponse = await fetch(`${defaultURL}users?page=${page}&count=6`);
				const data: APIData = await reponse.json();
				setUsers(data.users);
				setNextUrl(data.links.next_url);
				setStatus("received");	
			} catch (error) {
				setStatus("rejected");
			}
		}
		loadUsers();
	}, [page, successfulResponse]);

	const updateUsers = () =>{
		setSuccessfulResponse(true);
		setPage(1);
	}
	const closePopup = () =>{
		setSuccessfulResponse(false)
	}

	return(
		<main className="main">
			<div className="main__container container">
				<section className="main__cover">
					<div className="cover__content">
					<h1 className="cover__title">
						Test assignment for front-end developer
					</h1>
					<div className="cover__text">
						What defines a good front-end developer is one that has 
						skilled knowledge of HTML, CSS, JS with a vast understanding 
						of User design thinking as they'll be building web interfaces 
						with accessibility in mind. They should also be excited to learn, 
						as the world of Front-End Development keeps evolving.
					</div>
					<div className="cover__btn">
						<Button title="Sign up"/>
					</div>
					</div>
				</section>
				<section className="main__card">
					<CardList status={status} nextPage={nextPage} users={users} page={page} nextUrl={nextUrl}/>
				</section>
				<section className="main__registation">
					<RegistrationForm updateUsers={updateUsers}/>
				</section>
			</div>
			{
				successfulResponse ? <Popup src={SuccessfulImage} title="User successfully registered" closePopup={closePopup}/>: null 
			}
		</main>
	)
}

