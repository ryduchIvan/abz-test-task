import "./registarationForm.scss";
import {SubmitHandler, useForm} from "react-hook-form";
//RegExr
import {name, email, phone} from "RegExr";
//Components
import { Title } from "components/title/Title";
import "./registarationForm.scss";
import { Radio } from "components/Radio/Radio";
import { Button } from "components/button/Button";
import { newUserDataFileds } from "type";
interface RegistrationFormProps {
	getName: (value:string) => void,
	getEmail: (value:string) => void,
	getPhone: (value:string) => void,
	getPosition: (value:string) => void,
	getFile: (value:string) => void,
	sendRequest: () => void;
}
export const RegistrationForm = ({getName, getEmail, getPhone, getPosition, getFile, sendRequest}: RegistrationFormProps) =>{

	const {register, formState: {errors}, handleSubmit, reset} = useForm<newUserDataFileds>({
		mode: "onBlur",
	});
	const onSumbit: SubmitHandler<newUserDataFileds> = (data) =>{
		getName(data.name)
		getEmail(data.email)
		getPhone(data.phone)
		getFile(data.file)
		console.log(data);
	}
	return (
		<>
			<Title title="Working with POST request"  />
			<form action="" className="registration__form" onSubmit={handleSubmit(onSumbit)}>
				<div>
					<input className="input" placeholder="Your name" 
					{...register('name', {
						required: "Name must be filled",
						minLength: {
							value: 2,
							message: "Name must contain at least 2 characters"
						},
						pattern: {
							value: name,
							message: "Ivalid Name"
						},
					})}
					/>
					<div >
						{errors?.name?.message ? <p className="input__help-text">{errors?.name?.message.toString()}</p> : <p className="input__help-text">Ivan</p>}
					</div>
				</div>
				<div className="registration__input">
					<input className="input" placeholder="Email" {...register("email", {
						required: "Email must be filled",
						pattern: {
							value: email,
							message: "Ivalid email"
						}
					})}/>
					<div>
						{errors?.email?.message ? <p className="input__help-text">{errors?.email?.message.toString()}</p> : <p className="input__help-text">Email</p>}
					</div>
				</div>
				<div className="registration__input">
					<input className="input" placeholder="phone" {...register("phone", {
						required: "Phone must be filled",
						pattern: {
							value: phone,
							message: "Ivalid phone"
						}
					})}/>
					<div>
						{errors?.phone?.message ? <p className="input__help-text">{errors?.phone?.message.toString()}</p> : <p className="input__help-text">+38 (XXX) XXX - XX - XX</p>}
					</div>
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
					<input type="file" accept=".jpg, .jpeg, .png, .svg, .webp" {...register("file", {
						required: "File must be upload"
					})} />
					<div>
						{errors?.file?.message && <p className="input__help-text">{errors?.file?.message.toString()}</p>}
					</div>
				</div>
				<div onClick={handleSubmit(onSumbit)}>
					<Button title="Send"/>
				</div>
			</form>
		</>
	)
}