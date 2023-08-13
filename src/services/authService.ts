import axios from "axios"

export const login = async (email: string, password: string):Promise<any> => {
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
