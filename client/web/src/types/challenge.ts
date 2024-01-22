import UserType from "./user"

type Challenge = {
  _id: string | null,
  title: string | null,
  description: string | null,
  challengeImg: string | null,
  challenger: UserType | null
}

export default Challenge