import express, { Request, Response } from 'express';
import UserModel from '../models/UserModel';

const UserController = express.Router();

//create user
UserController.post("/users", async (req: Request, res: Response) => {
    const { username, email, password, telephone } = req.body;
    
    //run serverside validation

    //save to db
    const user = new UserModel();
    user.username = username;
    user.email = email;
    user.password = password;
    user.phone = telephone;
    await user.save();

    res.send("User created");
});

//export
export default UserController;
