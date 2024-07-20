import jwt from "jsonwebtoken"

export default async function generateToken(user:{email:string}) {
    const secretKey = process.env.Secret_key!;
    return jwt.sign(user,secretKey,{ expiresIn: '24h' });
}