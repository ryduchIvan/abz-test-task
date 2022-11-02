export type Users = User[];

export type User = {
	id: number, 
	name: string, 
	email: string,
	phone: string, 
	position: string, 
	position_id: number, 
	registration_timestamp: number, 
	photo: string 
}
export type Status = "loading" | "received";

export type newUserDataFileds = {
  name: string, 
  email: string, 
  phone: string,
  file: string
}