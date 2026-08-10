export type RegisterData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};


export const initialRegisterData: RegisterData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};