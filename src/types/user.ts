export type Users = User[];//type for data from apis

export type User = {//type for one card
	id: number, 
	name: string, 
	email: string,
	phone: string, 
	position: string, 
	position_id: number, 
	registration_timestamp: number, 
	photo: string 
}

export type newUserDataFileds = {//type for new User data
	name: string, 
	email: string, 
	phone: string,
	file: any
  }