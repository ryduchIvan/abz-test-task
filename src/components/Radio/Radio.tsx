import "./radio.scss";
interface RadioProps {
	title: string,
	name: string,
	value: string,
	setValue? : (value: string) => void
}

export const Radio = ({title, name, value, setValue}: RadioProps) =>{

	return(
		<label className="radio">
			<input type="radio" name={name} className="radio__input" value={value} onChange={(event) =>{
				let value = event.target.value;
				if (setValue) {
					setValue(value);	
				}
			}} />
			<span className="radio__box"></span>
			{title}
		</label>
	)
}