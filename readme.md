# The Meditators of London

![](https://cloud.githubusercontent.com/assets/4499581/14868196/50dce566-0cc4-11e6-81e5-f1ecb7371d8b.jpg)

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
