# Environment Variables

Environment variables are key-value pairs that define important values for use in software applications. It's very common for credentials to be stored in environment variables such that they're not exposed within the source code and such that the application can adapt to new values when running in a different environment. 

We can access environment variables in a NodeJS application using `process.env.ENV_VARIABLE_NAME`.

# Usage In This App
We use three environment in this application:
1. NODE_APP_ROLE
2. NODE_APP_PASS
3. NODE_APP_URL