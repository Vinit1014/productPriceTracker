"use strict";
const request = require("request");
request('https://www.flipkart.com/mivi-fort-h350-soundbar-350-watts-5-1-channel-multi-input-eq-modes-bt-v5-1-w-bluetooth-soundbar/p/itm38449f86ec63f?pid=ACCH3MUYDSWNP3CS&lid=LSTACCH3MUYDSWNP3CS1RJEZJ&marketplace=FLIPKART&store=0pm%2F0o7&srno=b_1_1&otracker=browse&fm=organic&iid=en_PXoQu7rz7QkLa8UYmdptUzuGkvjBMdfi8HzyJ2SpV5E-W9CZmmdSxlCwLdHzbr_PiepGQEj_XVR037WGI6RjpQ%3D%3D&ppt=browse&ppn=browse&ssid=giz6kck1kw0000001729614321273', cb);
function cb(error, response, html) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(html);
    }
}
