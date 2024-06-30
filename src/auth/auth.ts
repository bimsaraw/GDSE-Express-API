import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/User";

const SECRET_KEY = "asdflkasdfasdfasdgfdgasdfldfkjgasdfasdflkjasdlfkfdgasdfklj";

export const generateJWt = (user: User): string => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h'});
}

//middleware to verify token
export const tokenValidate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ","");

    if(!token) {
        res.status(401).send({ error: "Unauthorized"});
    } else {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(401).send({ error: "Unauthorized"});
            } else {
                //add user object to the request
                //req.user = decoded as User;

                //go to the desired endpoint
                next();
            }
        })
    }
}