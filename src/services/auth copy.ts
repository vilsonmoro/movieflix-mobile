import { api, TOKEN } from "./index";
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";

type Role = 'ROLE_MEMBER' | 'ROLE_VISITOR'; 

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role;
}

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    userFirstName: string;
    userId: number
}

interface AuthProps {
    username: string;
    password: string;
}

//yarn add query-string
export async function login(userInfo: AuthProps) {
    const data = queryString.stringify({ ...userInfo, grant_type: "password" });

    const result = await api.post('oauth/token', data, {
        headers: {
            Authorization: TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    const { access_token } = result.data;
    setAsyncKeys("@token", access_token);
    return result;
}


async function setAsyncKeys(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (e) {
        console.warn(e);
    }
}

export async function isAuthenticated() {
    try {
        const token = await AsyncStorage.getItem("@token");
        return token ? true : false;
    }
    catch (e) {
        console.warn(e);
    }
}

export async function doLogout() {
    try {
        await AsyncStorage.removeItem("@token");
    }
    catch (e) {
        console.warn(e);
    }
}

export async function userToken(){
    const token = await AsyncStorage.getItem("@token");
    return token;
}

export async function isAllowedByRole(routeRoles: Role[] = []) {
    if(routeRoles.length === 0){
        return true;
    }
   
    const  token = getAccessTokenDecoted();
    
    
   // return routeRoles.some(role => tokenincludes(role));
  }

  export async function getAccessTokenDecoted(){
    try{
        const token = await userToken();
        console.log(token);
        const tokenDecoded = jwtDecode(token);
        return tokenDecoded as AccessToken;
    }catch(error){
        return {} as AccessToken;
    }   
}
