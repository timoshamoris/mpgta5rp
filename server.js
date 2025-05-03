const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;
const redirectUri = 'https://timoshamoris.github.io/mpgta5rp/';  // Тот же URI, что и в кнопке

app.get('/auth/callback', async (req, res) => {
    const code = req.query.code;

    try {
        // Получение токена с помощью кода
        const response = await axios.post('https://discord.com/api/v10/oauth2/token', new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            scope: 'identify'
        }));

        const { access_token } = response.data;

        // Получение информации о пользователе с помощью токена
        const userInfo = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        // Отправляем данные о пользователе на фронтенд
        res.json(userInfo.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка авторизации через Discord');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
