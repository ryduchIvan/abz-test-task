//CSS
import "./registarationForm.scss";
//Hooks
import { useForm} from "react-hook-form";
import React, { useState , useEffect, useRef} from "react";
//Types
import {SubmitHandler} from "react-hook-form";
import { APIData, PositonsApi} from "type";
import { newUserDataFileds } from "type";
//Patterns
import { emailPatter, phonePatter, namePetter} from "RegExr";
//Components
import { Title } from "components/title/Title";
import { Radio } from "components/Radio/Radio";
import { Button } from "components/button/Button";
//token for headers 
import { token } from "api";
interface RegistrationFormProps {
	updateUsers: () => void
}
export const RegistrationForm = ({updateUsers}: RegistrationFormProps) =>{
	const [position, setPosition] = useState<string>("Lawyer");
	const [positionId, setPostionId] = useState<number>(1);

	const [email, setEmail] = useState<string>();
	const [name, setName] = useState<string>();
	const [phone, setPhone] = useState<string>();
	//states for placeholder animation

	const maxAllowedSize = 5 * 1024 * 1024;
	const minAllowedSize = 1333;
	//limit photos size

	const fileErrorRef = useRef<HTMLDivElement>(null);

	const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm<newUserDataFileds>({
		mode: "onBlur",
	});
	//take any instruments from react-hook-form
	useEffect(() => {
		const getPositionId = async( ) =>{
			const reponse = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`);
			const data: PositonsApi = await reponse.json();
			data.positions.forEach((elem) =>{
				if (elem.name === position) {
					setPostionId(elem.id)
				}
			})
		}
		getPositionId();
	}, [position]);
	//get position id

	const onSumbit: SubmitHandler<newUserDataFileds> = (data) =>{
		let formData = new FormData();
		formData.append('position_id', positionId.toString()); 
		formData.append('name', data.name);
		formData.append('email', data.email); 
		formData.append('phone', data.phone);
		formData.append('photo', data.file[0]);	
	
		fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
			method: "POST",
			body: formData, 
			headers: {
				"Token": token,
			}
		}).then((response) => response.json())
		  .then((data: APIData) =>{ 
			if (data.success) {
				console.log("Data success")
				updateUsers();
		  } else {
			if (fileErrorRef.current) {
				fileErrorRef.current.innerHTML = `<p class="wrong-text">Invaild photo size</p>`
			}
		  }
		})
		  .catch(error => {
		  });
		reset();
	}
	//post request 

	const getPosition = (value: string) =>{
		setPosition(value)
	}

	return (
		<>
			<Title title="Working with POST request"  />
			<form action="" className="registration__form" onSubmit={handleSubmit(onSumbit)}>
				<div className="registration__input" >
					<input className={`${errors.name && "wrong-input"} input`}  
					{...register('name', {
						required: "Name must be filled",
						pattern: {
							value: namePetter,
							message: "Invalid Name"
						},
						minLength: {
							value: 2,
							message: "Name must contain at least 2 characters"
						},
						maxLength: {
							value: 60,
							message: "name cannot be more than 60 characters"
						},
						onChange(event: React.ChangeEvent<HTMLInputElement>) {
							setName(event.target.value);
						},
					})}
					/>
					<label className={
						/* if input does not empty , placeholder gets anim class. If validation wrong placeholder gets wrong-text class */	
						`${name ? "placeholder-anim " : ""}
						registration__placeholder-big placeholder 
					${errors.name ? "wrong-text" : ""}` } htmlFor="name">Your Name</label>
					{/*If validation wrong , help text gets wrong-text class */
					errors?.name?.message ? 
					<p className="input__help-text wrong-text">{errors?.name?.message.toString()}</p> : 
					<p className="input__help-text">Ivan</p>}
				</div>
				<div className="registration__input" >
					<input className={`${errors.email && "wrong-input"} input`}  {...register("email", {
						required: "Email must be filled",
						pattern: {
							value: emailPatter,
							message: "Ivalid email"
						},
						onChange(event: React.ChangeEvent<HTMLInputElement>) {
							setEmail(event.target.value);
						},
					})}/>
					<label className={
						/* if input does not empty , placeholder gets anim class. If validation wrong placeholder gets wrong-text class */
						`${ email  ? "placeholder-anim " : ""}
						registration__placeholder placeholder 
						${errors.email ? "wrong-text" : ""}` } htmlFor="name">Email</label>
					{/*If validation wrong , help text gets wrong-text class */
					errors?.email?.message ? 
					<p className="input__help-text wrong-text">{errors?.email?.message.toString()}</p> : 
					<p className="input__help-text">Email</p>}
				</div>
				<div className="registration__input">
					<input className={`${errors.phone && "wrong-input"} input`}  {...register("phone", {
						required: "Phone must be filled",
						pattern: {
							value: phonePatter,
							message: "Ivalid phone"
						},
						onChange(event: React.ChangeEvent<HTMLInputElement>) {
							setPhone(event.target.value);
						},
					})}/>
					<label className={/*if input does not empty , placeholder gets anim class. If validation wrong placeholder gets wrong-text class*/
						`${phone ? "placeholder-anim " : ""}
						registration__placeholder placeholder 
						${errors.phone ? "wrong-text" : ""}` } htmlFor="name">Phone</label>
					{/*If validation wrong , help text gets wrong-text class */
					errors?.phone?.message ? 
					<p className="input__help-text wrong-text">{errors?.phone?.message.toString()}</p> : 
					<p className="input__help-text">+38 (XXX) XXX - XX - XX</p>}
				</div>
				<div className="registration__btn">
					<span className="registration__btn-text">Select your position</span>
				<div className="registration__btn-box" >
					<Radio title="Lawyer" name="position" value="Lawyer" setValue={getPosition} checked={positionId === 1 ? true : false}/>
					<Radio title="Content manager" name="position" value="Content manager" setValue={getPosition} checked={positionId === 2 ? true : false}/>
					<Radio title="Security" name="position" value="Security" setValue={getPosition} checked={positionId === 3 ? true : false}/>
					<Radio title="Designer" name="position" value="Designer" setValue={getPosition} checked={positionId === 4 ? true : false}/>
				</div>
				</div>
				<div className="registration__file">
					<label className="registration__file-label">
						<span className="registration__file-text">Upload</span>
						<div className="registration__file-filed">Upload your photo</div>
						<input className="registration__file-input" type="file" accept=".jpg, .jpeg" {...register("file", {
						required: "File must be upload"
					})} />
					</label>
						{/*If validation wrong , create help text */
						errors?.file?.message && 
						<p  className="input__help-text wrong-text">{errors?.file?.message.toString()}</p>}
				</div>
				<div className="registration__submit">
					<Button title={`Send`} disabled={!isValid}/>
				</div>
			</form>
		</>
	)
}

