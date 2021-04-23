import {api, TOKEN} from "./index";
import queryString from 'query-string';

interface AuthProps {
    username: string;
    password: string;
}

//yarn add query-string
export async function login(userInfo: AuthProps){
   const data = queryString.stringify({...userInfo, grant_type: "password"});

   const result = await api.post('oauth/token', data,{
       headers:{
          Authorization: TOKEN,
          'Content-Type': 'application/x-www-form-urlencoded'
       },
   });
   return result;
}