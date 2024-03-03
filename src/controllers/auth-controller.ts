import { Request, Response } from 'express';
import User from '../models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (email === undefined || password === undefined || name === undefined) {
        return res.status(400).send('Invalid request');
    }
    try{
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            return res.status(400).send('Email already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        return res.status(201).send(newUser);

    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
        return res.status(400).send('Invalid request');
    }
    try{
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send('Email or password is wrong');
        }
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(400).send('Email or password is wrong');
        }
        const accessToken = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
        const refreshToken = await jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);

        if (user.tokens === undefined) {
            user.tokens = [refreshToken];
        } else {
            user.tokens.push(refreshToken);
        }
        await user.save();
        return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken});
    } catch (error) {
        return res.status(400).send(error.message);
    }

};

const logout = (req: Request, res: Response) => {
    return res.status(200).send('Logged out');
};

const refresh = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1];

    if (refreshToken === undefined) {
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo: {_id: string}) => {
        if (err) {
            return res.status(403).send('Forbidden');
        }
        try{
            const user = await User.findById(userInfo._id);
            if (user == null || user.tokens === undefined || !user.tokens.includes(refreshToken)) {
                if(user.tokens !== undefined) {
                    user.tokens = [];
                    await user.save();
                }
                return res.status(403).send('Forbidden');
            }
            const accessToken = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            const newRefreshToken = await jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);

            user.tokens = user.tokens.filter(token => token !== refreshToken);
            user.tokens.push(newRefreshToken);
            await user.save();


            return res.status(200).send({ accessToken: accessToken, refreshToken: newRefreshToken});

        } catch (error) {
            return res.status(400).send(error.message);
        }
    });
};

export default { refresh, register, login, logout };

   


