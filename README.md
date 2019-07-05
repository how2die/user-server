# User Server

User management server.

## Getting started

### Prerequisites

* Kubernetes cluster with kubectl access
* Properly configured database, see `/app/config/sequelize.js`
* [Auth API](https://github.com/how2die/auth-server) available

### Deploying to Kubernetes

Deploy to Kubernetes by running:
```
kubectl apply -f deployment.yaml
```

## Usage
### Create user
**URL** : `/api/user/users`
**Method** : `POST`
```json
{
	"username": "some-username",
	"password": "some-password"
}
```
Response will return `409 Conflict` if username is taken.
Successful creation will return `201 Created` with a response body with the following structure:

```json
{
	"userid": "some-userid",
	"username": "some-username",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYXRzIiwiaWF0IjoxNTYyMzU1MTM4LCJleHAiOjE1OTM4OTExMzgsImF1ZCI6Ind3dy5ob3cyZGllLmNvbSIsInN1YiI6InNvbWUtdXNlcmlkIn0.yNWMaGvbJS-Gj8EZ8f4rFu0BT6vTZnPGAakO1EQ-JuU"
}
```

### Login user
**URL** : `/api/user/users/logins`
**Method** : `POST`
```json
{
    "username": "some-username",
    "password": "some-password"
}
```
Returns `401 Unauthorized` if bad credentials. If credentials are correct, `201 Created` is returned with a token for the user:
```json
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYXRzIiwiaWF0IjoxNTYyMzU1MTM4LCJleHAiOjE1OTM4OTExMzgsImF1ZCI6Ind3dy5ob3cyZGllLmNvbSIsInN1YiI6InNvbWUtdXNlcmlkIn0.yNWMaGvbJS-Gj8EZ8f4rFu0BT6vTZnPGAakO1EQ-JuU"
}
```

### Get user by id
**URL** : `/api/user/users/:userid`
**Method** : `GET`

If user exists, returns `200 OK` with user information:
```json
{
	"userid": "some-userid",
	"username": "some-username"
}
```

Otherwise returns `404 Not Found`.
