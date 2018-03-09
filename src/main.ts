import { sayHello } from "./greet";

function showHello(divId: string, name: string) {
    const e = document.getElementById(divId);
    e.innerText = "test HAHHAHAHA .. " + sayHello(name);
}

showHello("greeting","TypeScript");