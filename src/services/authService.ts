import axios, { AxiosResponse } from "axios"

export const login = async (email: string, password: string):Promise<AxiosResponse> => {
    try {
       const response = await axios.post('https://ict-forum-server.onrender.com/auth/login', {
            email, password
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating");
    }
}
export const loginGoogle = async (sub: string, email: string, name: string, picture: string): Promise<AxiosResponse> => {
    try {
        const response = await axios.post('https://ict-forum-server.onrender.com/auth/loginGoogle', {
            sub, email, name, picture
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Login fail");
    }
}
// export const logout = async(): Promise<AxiosResponse> =>{
//     try {
//         const response = await axios.get('https://ict-forum-server.onrender.com/auth/logout');
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Logout fail');
//     }
// }