"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
function showHello(divId, name) {
    var e = document.getElementById(divId);
    e.innerText = "test HAHHAHAHA .. " + greet_1.sayHello(name);
}
showHello("greeting", "TypeScript");
//# sourceMappingURL=main.js.map