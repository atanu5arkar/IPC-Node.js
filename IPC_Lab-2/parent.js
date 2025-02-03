import { spawn } from "child_process";

const nums = process.argv.slice(2);
const spawns = {};
let idx = 2;

function spawnNode(argv) {
    const subprocess = spawn("node", ["child.js", argv]);
    const { pid } = subprocess;

    spawns[pid] = "";

    subprocess.stdout.on("data", (data) => {
        return spawns[pid] += `${data}`;
    });

    subprocess.stderr.on("data", (err) => {
        return spawns[pid] += `${err}`;
    });

    subprocess.on("error", (err) => {
        return console.log("Spawning Failed:\n", err);
    });
    
    subprocess.on("exit", () => {
        return spawnLimiter(nums, false);
    });

    subprocess.on("close", (code) => {
        const out = spawns[pid].trim();

        if (!code) return console.log(`Factorial of ${argv} is`, out);
        return console.error(out);
    });
}

function spawnLimiter(nums, firstTime = true) {
    if (!firstTime) {
        if (nums[idx]) spawnNode(nums[idx++]);
        return;
    }
    for (const num of nums.slice(0, 2)) spawnNode(num);
}

spawnLimiter(nums);