const router = require('express').Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        rePassword } = req.body;
    try {
        if (password !== rePassword) {
            return res.status(400).json({ message: 'Passwords do not match'});
        } else {
            const result = await authService.registerUser({ firstName, lastName, username, email, password });
            console.log(result);
            if (typeof result === 'string') {
                throw result;
            } else {
                const token = await authService.generateToken({ _id: result._id });
                res.json({
                    _id: result._id,
                    email: result.email,
                    username: result.username,
                    accessToken: token
                });
            }
        }
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;