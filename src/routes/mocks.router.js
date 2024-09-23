import { Router } from 'express';
import * as userService from '../services/user.services.js'; 
const router = Router();

router.get('/mockingusers', async (req, res) => {
    try {
        const users = await userService.createUsersMock(50); // Generar 50 usuarios
        console.log(users);
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ error: 'Error generando usuarios' });
    }
});

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body; 
    try {
        
        const createdUsers = await userService.createUsersMock(users);
        
        res.status(200).json({ users: createdUsers, message: `${users} usuarios creados` });
    } catch (error) {
        res.status(500).json({ error: 'Error generando datos' });
    }
});

export default router;
