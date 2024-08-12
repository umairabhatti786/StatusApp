import { emailRegex } from "../../../utils/Regex";

// import { validateEmail } from "../../utils/Email_Password_Validation";

interface Values {
  name:string,
    email: string;
    confirmEmail: string;
    password: string;
    lookingFor:[]
  }
export const SignupForm = (
  values:Values,
  setShowError: (value: boolean) => void,
  setError: (error: string) => void

) => {

  if (!values?.name) {
    setError("Name is required");
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 4000);

    return;
  }
    if (!values?.email) {
        setError("Email is required");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);
  
        return;
      }
      let isValidEmail = emailRegex?.test(values.email);
      if (!isValidEmail) {
        setError("Invalid email address");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);
  
        return;
      }
      
      if (!values?.password) {
        setError("password is required");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);
        return;
      }
      if (values?.password.length < 8 ||values?.password.length > 20) {
        setError("password at least 8 - 20 characters");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);
        return;
      }

      if (values?.lookingFor.length==0) {
        setError("Please Select at least one Looking For ");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);
        return;
      }



  return true;
};
