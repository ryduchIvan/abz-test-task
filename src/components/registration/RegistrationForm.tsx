//CSS
import "./registarationForm.scss";
//Hooks
import { useForm} from "react-hook-form";
import React, { useState , useEffect} from "react";
//Types
import {SubmitHandler} from "react-hook-form";
import { APIData, PositonsApi, Token, newUserDataFileds} from "types/index";
//Patterns
import { emailPatter, phonePatter, namePetter} from "RegExr";
//Components
import { Title } from "components/title/Title";
import { Radio } from "components/Radio/Radio";
import { Button } from "components/button/Button";
//default url
import {defaultURL} from "../defaultURL";

interface RegistrationFormProps {
	updateUsers: () => void
}

const sendNewUser = async (formData: FormData, callBack: () => void, token: string ) =>{
	try {
		const response  = await fetch(`${defaultURL}users`, {
			method: "POST",
			body: formData, 
			headers: {
				"Token": token,
			}
		});
		const data: APIData = await response.json();
		if(data.success){
			callBack()
		} else {
			alert(data.message)
		}
		
	} catch (error) {
		alert(error)
	}
}
//post request

export const RegistrationForm = ({updateUsers}: RegistrationFormProps) =>{
	const [position, setPosition] = useState<string>("Lawyer");
	const [positionId, setPostionId] = useState<number>(1);

	const [email, setEmail] = useState<string>();
	const [name, setName] = useState<string>();
	const [phone, setPhone] = useState<string>();
	const [animPlaceholder1, setAnimPlaceholder1] = useState<boolean>(false);
	const [animPlaceholder2, setAnimPlaceholder2] = useState<boolean>(false);
	const [animPlaceholder3, setAnimPlaceholder3] = useState<boolean>(false);
	//states for placeholder animation

	const [token, setToken] = useState<string>("eyJpdiI6IkVFWjF3TGZNTTFwWHliZjArSmplakE9PSIsInZhbHVlIjoiRW1DXC9ZXC9Fenc0eEplRDFZSTRqMVhaSFozSWN1MjA2bW9qUThDWWtkZ3ZOdzJXdWZ6eW9YS1A4bEY0d0pPclpHWVZabHc1OVc5dDFWRTFpbnpNR3BoUT09IiwibWFjIjoiYjQ0MDYzOWRhZjAyNTVkMDZiMGYxMWZkYWZjOGI2YzJlMDRhOTU3ZjkxNTUxZDQ1MTYxZmExYjg0ZjIwZmNmOCJ9")

	const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm<newUserDataFileds>({
		mode: "onBlur",
	});
	//take any instruments from react-hook-form
	useEffect(() => {
		const getPositionId = async( ) =>{
			const reponse = await fetch(`${defaultURL}positions`);
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
	useEffect(() =>{
		const getNewToken = async () =>{
			try {
				const reponse = await fetch(`${defaultURL}token`)
				const data: Token = await reponse.json();
				setToken(data.token);	
			} catch (error) {
				//alert(`Token error. Reload cite`)
			}
		}
		getNewToken();
	}, [])
	//get new token
	const onSumbit: SubmitHandler<newUserDataFileds> = (data) =>{
		let img = new Image();
		let minxWidth = 70;
		let minHeight = 70;
		let maxAllowedSize = 5000000;
		//variabels for validation photo size
		let formData = new FormData();
		formData.append('position_id', positionId.toString()); 
		formData.append('name', data.name);
		formData.append('email', data.email); 
		formData.append('phone', data.phone);
		formData.append('photo', data.file[0]);

		if ( data.file[0].size > maxAllowedSize) {
			alert("Photo size cannot be more than 5mb")
			//if the photo size more than 5 mb arelt
		}	

		img.src = URL.createObjectURL(data.file[0]);

		img.onload = () =>{
			let imgWidth = img.width;
			let imgHeight = img.height;
			if (imgWidth < minxWidth || imgHeight < minHeight) {
				alert('Photo must be at least 70px X 70px')
			}
			//if the photo size is less than 70px X 70px alert
		}
		sendNewUser(formData, updateUsers, token);
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
				<div className="registration__input" onClick={() =>{setAnimPlaceholder1(true)}}>
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
						`${name || animPlaceholder1 ? "placeholder-anim " : ""}
						registration__placeholder-big placeholder 
					${errors.name ? "wrong-text" : ""}` } htmlFor="name">Your Name</label>
					{/*If validation wrong , help text gets wrong-text class */
					errors?.name?.message ? 
					<p className="input__help-text wrong-text">{errors?.name?.message.toString()}</p> : 
					<p className="input__help-text">Ivan</p>}
				</div>
				<div className="registration__input" onClick={() =>{setAnimPlaceholder2(true)}}>
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
						`${ email || animPlaceholder2 ? "placeholder-anim " : ""}
						registration__placeholder placeholder 
						${errors.email ? "wrong-text" : ""}` } htmlFor="name">Email</label>
					{/*If validation wrong , help text gets wrong-text class */
					errors?.email?.message ? 
					<p className="input__help-text wrong-text">{errors?.email?.message.toString()}</p> : 
					<p className="input__help-text">Email</p>}
				</div>
				<div className="registration__input" onClick={() =>{setAnimPlaceholder3(true)}}>
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
						`${phone || animPlaceholder3 ? "placeholder-anim " : ""}
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
						<input className="registration__file-input" type="file" accept=".jpg, .jpeg" 
						{...register("file", {
						required: "Photo must be upload",
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

