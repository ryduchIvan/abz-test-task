import "./title.scss";
interface TitleProps {
	title: string;
}

export const Title = ({title}: TitleProps) =>{

	return (
		<h2 className="title">
			{title}
	   </h2>
	)
}