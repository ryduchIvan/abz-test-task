import {Users, Status, User} from "type";
import {URL, token} from "api";
//img
import Cover from  "assets/images/cover.jpg";
import { Button } from "components/button/Button";
//CSS
import "./main.scss";
//Components
import {CardList} from "components/user/CardList";
import { RegistrationForm } from "components/registration/RegistrationForm";
import React, { useState, useEffect} from "react";

export const Main = () =>{
	const [users, setUsers] = useState<Users>([]);
	const [page , setPage] = useState<number>(1);
	const [status, setStatus] = useState<Status>("loading");
	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [phone, setPhone] = useState<string>();
	const [file, setFile] = useState<string>();
	const [post, setPost] = useState<Users>([]);
	const [position, setPosition] = useState<string>();
	const [postRequest, setPostRequest] = useState<boolean>(false);
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

	useEffect(() =>{
		const createUser = async () =>{
			const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
				method: "POST",
				body: `${formData ? formData : null}`, 
				headers: {
					"Token": token
				}
			})
			const data = await response.json();
			setPost(data);
		}
		if (postRequest) {
			createUser();
		}
	}, [postRequest]);

	const getName = (value:string) =>{
		setName(value);
	}
	const getEmail = (value:string) =>{
		setEmail(value)
	}
	const getPhone = (value:string) =>{
		setPhone(value);
	}
	const getPosition = (value:string ) =>{
		setPosition(value);
	}
	const getFile = (value:string) => {
		setFile(value);
	}
	const sendRequest = () =>{
		setPostRequest(true);
	}
	const formData = {
		name, 
		email, 
		phone,
		position,
		file
	}
	console.log(formData);
	return(
		<main className="main">
			<div className="main__container container">
				<section className="cover">
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
				<section className="card">
					<CardList status={status} nextPage={nextPage} users={users} page={page}/>
				</section>
				<section className="registation">
					<RegistrationForm 
					getName={getName} 
					getEmail={getEmail} 
					getPhone={getPhone} 
					getPosition={getPosition}
					getFile={getFile}
					sendRequest={sendRequest}
					/>
				</section>
			</div>
		</main>
	)
}