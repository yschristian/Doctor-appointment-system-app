import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class TokenAuth{
    static TokenGenerator(data){
        const token=jwt.sign({
            data
              },
            process.env.JWT_KEY
            ,{
                expiresIn:'24h'
            }
           );
        return token;
    }
    static decodeToken(token){
       try{ 
           const data=jwt.verify(token,process.env.JWT_KEY);
        return data;
    }
    catch(er){
            return er;
        }
    }
    }
    export default TokenAuth;