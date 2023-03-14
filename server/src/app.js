require('dotenv').config(); //  импорт библиотеки dotenv

const express = require('express'); // импорт библиотеки express

const app = express(); // создаём экземпляр сервера

const PORT = 3000; // задаем порт в переменную

app.listen(PORT, () => { console.log(`server started on http://localhost:${PORT}`); }); // - проверяем работает ли сервер

app.get('/main', (req, res) => { res.send('Server works!!!'); }); // - проверяем эндпоинт на главной странице;
