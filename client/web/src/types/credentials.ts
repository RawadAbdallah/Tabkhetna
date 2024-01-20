type Credentials = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password: string;
  profile_pic?: File;
  keep_me_logged_in?: boolean;
  profileSrc?: string,
};

export default Credentials