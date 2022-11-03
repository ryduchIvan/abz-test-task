//Types
import {Users, Status} from "type";
//Default URL
import {URL} from "api";
//CSS
import "./main.scss";
//Components
import {CardList} from "components/user/CardList";
import { RegistrationForm } from "components/registration/RegistrationForm";
import { Button } from "components/button/Button";
//Hooks
import  { useState, useEffect} from "react";

export const Main = () =>{
	const [users, setUsers] = useState<Users>([]);//state for data array 
	const [page , setPage] = useState<number>(1);
	const [status, setStatus] = useState<Status>("loading");
	const nextPage = () =>{
		setPage(prev => prev + 1);
	}
	useEffect(() =>{
		setStatus("loading");
		const loadUsers = async () =>{
			const reponse = await fetch(`${URL}users?page=${page}&count=6`);
			const data = await reponse.json();
			setUsers(data.users);
			setStatus("received");
		}
		loadUsers();
	}, [page]);


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
					<CardList status={status} nextPage={nextPage} users={users} page={page}/>
				</section>
				<section className="main__registation">
					<RegistrationForm />
				</section>
			</div>
		</main>
	)
}

