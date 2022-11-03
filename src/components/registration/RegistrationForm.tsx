//CSS
import "./registarationForm.scss";
//Hooks
import { useForm} from "react-hook-form";
import { useState , useEffect} from "react";
//Types
import {SubmitHandler} from "react-hook-form";
import {User} from "type";
import { newUserDataFileds } from "type";
//Patterns
import { emailPatter, phonePatter} from "RegExr";
//Components
import { Title } from "components/title/Title";
import { Radio } from "components/Radio/Radio";
import { Button } from "components/button/Button";
//token for headers 
import { token } from "api";

export const RegistrationForm = () =>{
	const [position, setPosition] = useState<string>("QA");
	const [positionId, setPostionId] = useState<number>();

	const [placeholderAnimName, setPlaceholderAnimName] = useState<boolean>(false);
	const [placeholderAnimEmail, setPlaceholderAnimEmail] = useState<boolean>(false);
	const [placeholderAnimPhone, setPlaceholderAnimPhone] = useState<boolean>(false);
	//states for placeholder animation

	const {register, formState: {errors}, handleSubmit, reset} = useForm<newUserDataFileds>({
		mode: "onBlur",
	});
	//take any instruments from react-hook-form
	useEffect(() => {
		const getPositionId = async( ) =>{
			const reponse = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`);
			const data = await reponse.json();
		}
		getPositionId();
	}, [position])
	
	const onSumbit: SubmitHandler<newUserDataFileds> = (data) =>{
		var formData = new FormData();
		formData.append('position_id', "2"); 
		formData.append('name', 'Jhon');
		formData.append('email', 'formegogoivan@gmail.com'); 
		formData.append('phone', '+380503270933');
		formData.append('photo', data.file[0]);
		fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
			method: "POST",
			body: formData, 
			headers: {
				"Token": token,
			}
		}).then((response) => response.json()).then((data) => console.log(data));
	
		reset();
	}
	const getPosition = (value: string) =>{
		setPosition(value)
	}

	return (
		<>
			<Title title="Working with POST request"  />
			<form action="" className="registration__form" onSubmit={handleSubmit(onSumbit)}>
				<div className="registration__input" onClick={() =>{
					setPlaceholderAnimName(true);
				}}>
					<input className={`${errors.name && "wrong-input"} input`}  
					{...register('name', {
						required: "Name must be filled",
						minLength: {
							value: 2,
							message: "Name must contain at least 2 characters"
						},
						maxLength: {
							value: 60,
							message: "name cannot be more than 60 characters"
						}
					})}
					/>
					<label className={
						/* if user click on input , placeholder gets anim class. If validation wrong placeholder gets wrong-text class */	
						`${placeholderAnimName ? "placeholder-anim " : ""}
						registration__placeholder placeholder 
					${errors.name ? "wrong-text" : ""}` } htmlFor="name">Your Name</label>
					{/*If validation wrong , help text gets wrong-text class */
					errors?.name?.message ? 
					<p className="input__help-text wrong-text">{errors?.name?.message.toString()}</p> : 
					<p className="input__help-text">Ivan</p>}
				</div>
				<div className="registration__input" onClick={() =>{
					setPlaceholderAnimEmail(true);
				}}>
					<input className={`${errors.email && "wrong-input"} input`}  {...register("email", {
						required: "Email must be filled",
						pattern: {
							value: emailPatter,
							message: "Ivalid email"
						}
					})}/>
					<label className={
						/* if user click on input , placeholder gets anim class. If validation wrong placeholder gets wrong-text class */
						`${placeholderAnimEmail ? "placeholder-anim " : ""}
						registration__placeholder placeholder 
						${errors.email ? "wrong-text" : ""}` } htmlFor="name">Email</label>
					{/*If validation wrong , help text gets wrong-text class */
					errors?.email?.message ? 
					<p className="input__help-text wrong-text">{errors?.email?.message.toString()}</p> : 
					<p className="input__help-text">Email</p>}
				</div>
				<div className="registration__input" onClick={() =>{
					setPlaceholderAnimPhone(true);
				}}>
					<input className={`${errors.phone && "wrong-input"} input`}  {...register("phone", {
						required: "Phone must be filled",
						pattern: {
							value: phonePatter,
							message: "Ivalid phone"
						}
					})}/>
					<label className={/*if user click on input , placeholder gets anim class. If validation wrong placeholder gets wrong-text class*/
						`${placeholderAnimPhone ? "placeholder-anim " : ""}
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
					<Radio title="Frontend developer" name="position" value="Frontend developer" setValue={getPosition}/>
					<Radio title="Backend developer" name="position" value="Backend developer" setValue={getPosition}/>
					<Radio title="Designer" name="position" value="Designer" setValue={getPosition}/>
					<Radio title="QA" name="position" value="QA" setValue={getPosition}/>
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
						<p className="input__help-text wrong-text">{errors?.file?.message.toString()}</p>}
				</div>
				<div className="registration__submit">
					<Button title="Send" />
				</div>
			</form>
		</>
	)
}


//const constData = [ {
//	"id": 1021623232,
//	"name": "Jhon",
//	"email": "Jhon@gmail.com",
//	"phone": "+380955388485",
//	"position_id": 2,
//	"registration_timestamp": 1667468982,
//	"photo": "https://frontend-test-assignment-api.abz.agency/images/users/63638eb6ac63210216.jpg"
//}]