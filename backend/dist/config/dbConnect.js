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
        // await mongoose.connect(process.env.MONGODB_URL, {
        yield mongoose.connect('mongodb+srv://v1n1ts0010:lH1KmWhuLRy9pS5u@pricetracker.0av8v.mongodb.net/?retryWrites=true&w=majority&appName=priceTracker', {});
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
});
module.exports = dbConnect;
