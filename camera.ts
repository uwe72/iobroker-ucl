var fs      = require('fs');
const axios = require('axios');

export function sendToPictureGartenToTelegram(adapter:any, caption:string) {
    axios.get("http://192.168.178.188/snap.jpeg", {  responseType: 'arraybuffer'}).then(function (response) {
        let filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function(err) { // Hier wird der erzeugte Namen (picdate) mit dem Pfad zum Speichern übergeben!
            if (err == null) {
                adapter.sendTo('telegram.0', {text: "/opt/iobroker/telegramm.jpeg", caption: caption});
            }
        });
    });
}

export function sendToPictureSeiteToTelegram(adapter:any, caption:string) {
    axios.get("http://192.168.178.38/snap.jpeg", {  responseType: 'arraybuffer'}).then(function (response) {
        let filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function(err) { // Hier wird der erzeugte Namen (picdate) mit dem Pfad zum Speichern übergeben!
            if (err == null) {
                adapter.sendTo('telegram.0', {text: "/opt/iobroker/telegramm.jpeg", caption: caption});
            }
        });
    });
}

export function sendToPictureHaustuereToTelegram(adapter:any, caption:string) {
    axios.get("http://192.168.178.173/snap.jpeg", {  responseType: 'arraybuffer'}).then(function (response) {
        let filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function(err) { // Hier wird der erzeugte Namen (picdate) mit dem Pfad zum Speichern übergeben!
            if (err == null) {
                adapter.sendTo('telegram.0', {text: "/opt/iobroker/telegramm.jpeg", caption: caption});
            }
        });
    });
}

export function sendToPictureDoorbellToTelegram(adapter:any, caption:string) {
    axios.get("http://192.168.178.90/snap.jpeg", {  responseType: 'arraybuffer'}).then(function (response) {
        let filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function(err) { // Hier wird der erzeugte Namen (picdate) mit dem Pfad zum Speichern übergeben!
            if (err == null) {
                adapter.sendTo('telegram.0', {text: "/opt/iobroker/telegramm.jpeg", caption: caption});
            }
        });
    });
}

export function sendToPictureGarageToTelegram(adapter:any, caption:string) {
    axios.get("http://192.168.178.166/snap.jpeg", {  responseType: 'arraybuffer'}).then(function (response) {
        let filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function(err) { // Hier wird der erzeugte Namen (picdate) mit dem Pfad zum Speichern übergeben!
            if (err == null) {
                adapter.sendTo('telegram.0', {text: "/opt/iobroker/telegramm.jpeg", caption: caption});
            }
        });
    });
}

module.exports = { sendToPictureGartenToTelegram, sendToPictureSeiteToTelegram, sendToPictureHaustuereToTelegram, sendToPictureDoorbellToTelegram, sendToPictureGarageToTelegram };