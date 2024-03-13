# verify-email-effect
this service is used by effect application to verify if email is fake or not

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODBURI`
`PASSWORD`
`EMAIL`
`JWTOKEN`


## API Reference

#### Send Code To Your Email

```http
  https://effect-verifyemail.onrender.com/sendemail
```

| Parameter | Type     |
| :-------- | :------- | 
| `email` | `string` | 

#### Verify Code

```http
  https://effect-verifyemail.onrender.com/verifycode
```

| Parameter | Type     | 
| :-------- | :------- | 
| `code`      | `string` | 



