# TS Academy

A backend part of [TS Academy RS-clone](https://github.com/elian-cheng/rs-clone)

## Локальный запуск

1. Создайте файл `.env` в корне приложения
2. В созданном файе укажите переменные окружения:

```
PORT=<порт на котором будет запущено приложение>
MONGO_CONNECTION_STRING=<адрес вашей локальной или облачной mongodb>
JWT_SECRET_KEY=<ваш секретный ключ для подписи JWT>
JWT_REFRESH_SECRET_KEY=<ваш секретный ключ для подписи refresh JWT>
```

3. `npm install`
4. `npm run start`

