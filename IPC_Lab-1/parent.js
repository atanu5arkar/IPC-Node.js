import { fork } from "child_process";
import { question } from "readline-sync";

const spawns = {};
let jobsCounter = 0;

function printResults(obj) {
    const arr = [];

    for (const pid in obj) {
        const { number, result } = obj[pid];
        arr.push(obj[pid]);
        console.log(`Factorial of ${number} is ${result}`);
    }
    return console.log("All computations completed:", arr);
}

function spawnNode(argv) {
    const subprocess = fork("child.js", [argv]);
    const { pid } = subprocess;

    spawns[pid] = { number: argv, result: "" };

    subprocess.on("message", (msg) => {
        return spawns[pid].result += msg;
    });
    subprocess.on("close", (code) => {
        if (!code && ++jobsCounter == nums.length) printResults(spawns);
        return;
    });
    subprocess.on("error", (err) => {
        return console.log("Spawning Failed:\n", err);
    });
}

const nums = question().split(", ");
nums.forEach(num => spawnNode(num));