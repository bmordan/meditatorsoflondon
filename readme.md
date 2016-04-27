# The Meditators of London

## Get started

Clone this repo then run

`meteor npm install`

Your'll need a `settings.json` file like this:

```json
  {
    "admins": [
      "some@admin.email"
    ],
    "facebook": {
      "appId": "facebookAppId",
      "secret": "facebookAuthSecret"
    },
    "google": {
      "clientId": "googleClientId",
      "secret": "googleSecret"
    },
    "public": {}
  }
```

Then run on a simulator like this:

`meteor --settings settings.json run ios` or `meteor --settings settings.json run android`

or on a plugged in device

`meteor --settings settings.json run device ios`

`meteor --settings settings.json run device android`
