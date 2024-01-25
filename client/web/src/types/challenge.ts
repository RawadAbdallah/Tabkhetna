import UserType from "./user"

type Challenge = {
  _id: string,
  title: string,
  description: string,
  challenge_img: string,
  challenger: UserType | null,
}

export default Challenge