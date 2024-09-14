# How to start it

1. `pnpm install`.
2. `cp .env.example .env`.
3. `docker compose up -d`.
4. `pnpm start:dev`.

## Error

See the error

1. Go to [localhost:3000/docs](http://localhost:3000/docs).
2. Send a get request.
3. Check your terminal.

```shell
[Nest] 1308090  - 09/14/2024, 9:27:56 PM   ERROR [AmqpConnection] Received message with invalid routing key:
```
