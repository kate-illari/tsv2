import { sayHello } from "./ts/greet";

function showHello(divId: string, name: string) {
    const e = document.getElementById(divId);
    e.innerText = "elem inner text .. " + sayHello(name);

    const but = document.createElement("button");
    but.innerText = "Maksim4ik";
    e.appendChild(but);
}

showHello("root", "NAME");