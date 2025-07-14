import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { z } from "zod";
import { signUp, verifyEmail, login } from "@/services/authService";
import { 
  EmailVerificationPayload,
  LoginFormData,
  SignUpFormData,
  signUpResponse
} from "./models";
// import { EMPTY_STRING } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const signUpSchema = z.object({
  lastName: z.string().min(1, "Surname is required").trim(),
  firstName: z.string().min(1, "First name is required").trim(),
  email: z.string()
  .min(1, "Email is required")
  .email("Invalid email address").trim(),
  country: z.string().trim().optional(),
  refererCode: z.string().trim().optional(),
  password: z.string()
  .nonempty("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/^\S*$/, "Password must not contain spaces")
  .trim(),
  // am: z.string().email("Invalid email address").optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  isUS: z.boolean().default(false).optional(),
});

export const loginSchema = z.object({
  email: z.string()
  .nonempty("Email is required")
  .email("Invalid email address"),
  password: z.string()
  .nonempty("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/^\S*$/, "Password must not contain spaces")
  .trim(),
});

export const registerTrader = async (
  formData: z.infer<typeof signUpSchema>,
): Promise<signUpResponse> => {
  const parsedData = signUpSchema.parse(formData) as SignUpFormData;
  // Only proceed if terms is true
  if (!parsedData.terms) {
    throw new Error("You must accept the terms and conditions");
  }
  return signUp(parsedData);
};

export const loginTrader = async (formData: z.infer<typeof loginSchema>): Promise<any> => {
  const parsedData = loginSchema.parse(formData) as LoginFormData;
  if (!parsedData.email || !parsedData.password) {
    throw new Error("Email and password are required for login.");
  }
  return login(parsedData);
};

export const verifyTraderEmail = async (payload: EmailVerificationPayload): Promise<any> => {
  if (!payload.legalAgreement) {
    throw new Error("You must agree to the legal terms before verifying your email.");
  }
  return verifyEmail(payload);
};

// const transformSignUpFormData = (data: SignUpFormData): SignUpFormData => {
//   return {
//     lastName: data.lastName,
//     firstName: data.firstName,
//     email: data.email,
//     country: data.country || EMPTY_STRING,
//     refererCode: data.refererCode || EMPTY_STRING,
//     password: data.password,
//     terms: data.terms,
//   };
// }

export function getErrorMessage(error: any, fallback = "An unexpected error occurred from the server.") {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return fallback;
}

export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .trim(),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters")
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });