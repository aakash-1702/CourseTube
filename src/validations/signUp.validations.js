import * as z from "zod";
/*
watchHistory ObjectId of videos
  email loggedIn with unique as well
  fullName signUp information
  avatar string link to photo or something similar
  coverImage string link
  password string 
  refreshToken authentication and cookies handling

*/

const signUpValidation = z.object({
  userName: z.string().min(5).max(30),
  fullName: z.string().min(5).max(50),
  email : z.email(),
  password : z
              .string()
              .min(8, "Password should atleast be 8 characters")
              .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
      message: "Password must contain at least one uppercase letter, one number, and one special character",
    }),
   confirmPassword : z.string()

              
            
})
.refine((data) => data.password === data.confirmPassword , {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error will appear under confirmPassword
});

export {signUpValidation};
