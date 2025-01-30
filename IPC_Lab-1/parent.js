import { fork } from "child_process";
import { question } from "readline-sync";

const trackSpawns = {};
let jobsCounter = 0;

const nums = question().split(", ");
nums.forEach(num => spawnNode(num));

function printResults(obj) {
    for (const pid in obj) {
        const { number, result } = obj[pid];
        console.log(`Factorial of ${number} is ${result}`);
    }
    return console.log("All computations completed");
}

function spawnNode(argv) {
    const subprocess = fork("child.js", [argv]);
    const { pid } = subprocess;

    trackSpawns[pid] = { number: argv, result: "" };

    subprocess.on("message", (msg) => {
        return trackSpawns[pid].result += msg;
    });

    subprocess.on("close", (code) => {
        if (code == 0)
            if (++jobsCounter == nums.length) printResults(trackSpawns);
        return;
    });

    subprocess.on("error", (err) => {
        return console.log("Spawning Failed:\n", err);
    });
}