import UserType from "./user"

type Challenge = {
  _id: string,
  title: string,
  description: string,
  challengeImg: string,
  challenger: UserType | null,
}

export default Challenge