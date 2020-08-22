const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCIEkVjWxPoj2fECP3PXIl8-8MSgf2qCcFQIcUpoBMXCDcRY1uxg6lZmszSemPPmgr3E2tqYdd_woBvepbWNBRY",
   "privateKey": "6B5Nq-Xqa-hYsEr1aPeOCuLpZtjKYQyjCc8ka3rixvQ"
};
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eRkOGlrWzVU:APA91bFaFMBCVT08mmWvmJBbqpIYwBpmxSVTg9wZ6_w88F2QkI8C1Xq1RbbTE63bUpA2L-81RWKhLmdwDBshYi18EX3dSbwnRwLH6fJEq6vKa6-2sNdN1ybGYx6P1-dljToCuKCesT8J",
   "keys": {
       "p256dh": "BK4AJxkTvpIXzpRN9dRGcYgpCsr9+hzyzvIk48u3DsLPvJS/9Lz20cEfHRpyVd9z0Ai45corQPP+xImMqoBEOEM=",
       "auth": "C+O+LEv1oSATXEKbMGKrPw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '110720882939',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);