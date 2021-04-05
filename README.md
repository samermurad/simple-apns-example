# Simple APNS (Apple Push Notification Services) Implementation

a Mini Express server that can Cache users with tokens and send Push Notifications to iOS devices,
using either explicit device tokens or cached userNames.


## Pre Requirements

This project is based on Apple's newer "Keys" implementation and not the old certificates way.
Successfully running and using this project requires:

- Either an iOS APNs activated Service Key or a paid iOS Developer membership to generate a new Key.
- An iOS Device and it's Push Notifications Token
  - Can be obtained either by creating a sample app that implements the push notification APIs
  - Using the iOS Example App for Provisional Push Notifications for which this project was originally built: (ADD_LINK_TO_APP) 

## Installation

```bash
$ npm install
$ touch .env
```

### Env file

ENV VAR|required|default|description
:--------:|:--------:|:-----:|:-------:
`PORT`| false | 3090 | app's port
`HOST_NAME` | false | '0.0.0.0' | app's host name
`BUNDLE_ID` | true| - | Bundle Identifier of iOS app
`TEAM_ID` | true| -| iOS Developer Team Id
`KEY_ID` | true | -| iOS Service Key Id
`KEY_PATH` | true| -| Path to the Service Key

### Running Project

```bash
$ npm start
```


## Usage

### Health: (`/` or `/health`)

simple healthcheck

```
- method: GET
- <URL>/
- <URL>/health

res:
{
  "message":"ok",
  "uptime":952.134,
  "timestamp":1617617739294,
}
```

### Save User (`/save`)

create or update user token

```
- method: POST
<URL>/save

// if username is missing, a random userName will be generated
// new userName will then be correlated to the token in the cache file

// if username is provided, it's entry is simply updated
req.body: {
    token: '<IOS_DEVICE_TOKEN>',
    userName: '<OPTIONAL_USERNAME>',
}

res {
    token: '<IOS_DEVICE_TOKEN>',
    userName: '<NEW_OR_OLD_USER_NAME>',
}
```

### Send to User or Token (`/send`)

can get either a username or a token.
if a token is provided, method will attempt to send a test method to
device token.

if a username is provided, token is discarded, and method tries to find user and use it's token
(will throw an error if user is not found)

```
- method: POST

<URL>/send

req.body: {
    // either
    token: '<OPTIONAL_IOS_DEVICE_TOKEN>',
    // or
    userName: '<OPTIONAL_USERNAME>',
}

res {
        "sent": [
             {
                 "device": <TOKEN>
             }
        ],
        "failed": [
              {
                  "device": <TOKEN>
              }
        ],
    }
```
