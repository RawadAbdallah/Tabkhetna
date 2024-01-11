type Credentials = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password: string;
  profile_pic?: string | null;
  keep_me_logged_in?: boolean;
};

export default Credentials