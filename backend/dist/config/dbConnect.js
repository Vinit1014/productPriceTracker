"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('MongoDB URL:', process.env.MONGODB_URL);
        console.log('Current IP:', yield getPublicIP());
        yield mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4 // Force IPv4
        });
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
});
function getPublicIP() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.ipify.org?format=json');
            const data = yield response.json();
            return data.ip;
        }
        catch (error) {
            console.error('Could not fetch public IP:', error);
            return 'IP_FETCH_FAILED';
        }
    });
}
module.exports = dbConnect;
