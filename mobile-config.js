App.accessRule('*://meditatorsof.london/*')
App.accessRule('cdvfile://*')

App.icons({
  'iphone_2x' : 'app/assets/icons/icon@2x.png',
  'iphone_3x' : 'app/assets/icons/icon@3x.png',
  'ipad' : 'app/assets/icons/icon-72.png',
  'ipad_2x' : 'app/assets/icons/icon-72@2x.png',
  'android_mdpi' : 'app/assets/icons/hdpi.png',
  'android_hdpi' : 'app/assets/icons/xhdpi.png',
  'android_xhdpi' : 'app/assets/icons/xxhdpi.png'
})

App.launchScreens({
  'iphone_2x' : 'app/assets/splash/Default@2x~iphone.png',
  'iphone5' : 'app/assets/splash/Default-667h.png',
  'iphone6' : 'app/assets/splash/Default-736h.png',
  'iphone6p_portrait' : 'app/assets/splash/Default-Landscape-736h.png',
  'iphone6p_landscape' : 'app/assets/splash/Default-Landscape~ipad.png',
  'ipad_portrait' : 'app/assets/splash/Default-Portrait~ipad.png',
  'ipad_portrait_2x' : 'app/assets/splash/Default-Portrait@2x~ipad.png',
  'ipad_landscape' : 'app/assets/splash/Default-Landscape~ipad.png',
  'ipad_landscape_2x' : 'app/assets/splash/Default-Landscape@2x~ipad.png',
  'android_mdpi_portrait' : 'app/assets/splash/320x480-mdpi-port.png',
  'android_mdpi_landscape' : 'app/assets/splash/480x320-mdpi-land.png',
  'android_hdpi_portrait' : 'app/assets/splash/480x800-hdpi-port.png',
  'android_hdpi_landscape' : 'app/assets/splash/800x480-hdpi-land.png',
  'android_xhdpi_portrait' : 'app/assets/splash/720x1280-xhdpi-port.png',
  'android_xhdpi_landscape' : 'app/assets/splash/1280x720-xhdpi-land.png'
})

App.setPreference('StatusBarOverlaysWebView', 'true')
App.setPreference('StatusBarStyle', 'lightcontent')
App.setPreference('Fullscreen', 'true')
App.setPreference('useBrowserHistory', 'false')
App.setPreference('BackupWebStorage', 'local')
