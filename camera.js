"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToPictureGarageToTelegram = exports.sendToPictureDoorbellToTelegram = exports.sendToPictureHaustuereToTelegram = exports.sendToPictureSeiteToTelegram = exports.sendToPictureGartenToTelegram = void 0;
var fs = require('fs');
var axios = require('axios');
function sendToPictureGartenToTelegram(adapter, caption) {
    axios.get("http://192.168.178.188/snap.jpeg", { responseType: 'arraybuffer' }).then(function (response) {
        var filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function (err) {
            if (err == null) {
                adapter.sendTo('telegram.0', { text: "/opt/iobroker/telegramm.jpeg", caption: caption });
            }
        });
    });
}
exports.sendToPictureGartenToTelegram = sendToPictureGartenToTelegram;
function sendToPictureSeiteToTelegram(adapter, caption) {
    axios.get("http://192.168.178.38/snap.jpeg", { responseType: 'arraybuffer' }).then(function (response) {
        var filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function (err) {
            if (err == null) {
                adapter.sendTo('telegram.0', { text: "/opt/iobroker/telegramm.jpeg", caption: caption });
            }
        });
    });
}
exports.sendToPictureSeiteToTelegram = sendToPictureSeiteToTelegram;
function sendToPictureHaustuereToTelegram(adapter, caption) {
    axios.get("http://192.168.178.173/snap.jpeg", { responseType: 'arraybuffer' }).then(function (response) {
        var filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function (err) {
            if (err == null) {
                adapter.sendTo('telegram.0', { text: "/opt/iobroker/telegramm.jpeg", caption: caption });
            }
        });
    });
}
exports.sendToPictureHaustuereToTelegram = sendToPictureHaustuereToTelegram;
function sendToPictureDoorbellToTelegram(adapter, caption) {
    axios.get("http://192.168.178.90/snap.jpeg", { responseType: 'arraybuffer' }).then(function (response) {
        var filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function (err) {
            if (err == null) {
                adapter.sendTo('telegram.0', { text: "/opt/iobroker/telegramm.jpeg", caption: caption });
            }
        });
    });
}
exports.sendToPictureDoorbellToTelegram = sendToPictureDoorbellToTelegram;
function sendToPictureGarageToTelegram(adapter, caption) {
    axios.get("http://192.168.178.166/snap.jpeg", { responseType: 'arraybuffer' }).then(function (response) {
        var filename = "/opt/iobroker/telegramm.jpeg";
        fs.writeFile(filename, response.data, 'binary', function (err) {
            if (err == null) {
                adapter.sendTo('telegram.0', { text: "/opt/iobroker/telegramm.jpeg", caption: caption });
            }
        });
    });
}
exports.sendToPictureGarageToTelegram = sendToPictureGarageToTelegram;
module.exports = { sendToPictureGartenToTelegram: sendToPictureGartenToTelegram, sendToPictureSeiteToTelegram: sendToPictureSeiteToTelegram, sendToPictureHaustuereToTelegram: sendToPictureHaustuereToTelegram, sendToPictureDoorbellToTelegram: sendToPictureDoorbellToTelegram, sendToPictureGarageToTelegram: sendToPictureGarageToTelegram };
