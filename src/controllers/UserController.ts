import express, { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import bcrypt from 'bcryptjs';
import { generateJWt } from '../auth/auth';

const UserController = express.Router();

//create user
UserController.post("/users/register", async (req: Request, res: Response) => {
    const { username, email, password, telephone } = req.body;
    
    //run serverside validation

    //save to db
    const user = new UserModel();
    user.username = username;
    user.email = email;
    user.password = await bcrypt.hash(password,10);
    user.phone = telephone;
    await user.save();

    res.send({
        id: user.id,
        password: user.password
    });
});

UserController.post("/users/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const user = await UserModel.findOne({email: email});
    
    if(!user) {
        return res.status(404).send({ message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).send({message: "Unauthorized"});
    }

    const token = generateJWt({
        id: user._id.toString(),
        email: user.email
    });

    res.send({token});
})

//export
export default UserController;
