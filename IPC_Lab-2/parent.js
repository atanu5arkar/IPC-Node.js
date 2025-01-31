import { spawn } from "child_process";

const spawns = {};

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

    subprocess.on("close", (code) => {
        const out = spawns[pid].trim();

        if (!code) console.log(`Factorial of ${argv} is`, out);
        else console.error(out);
        
        return spawnLimiter(nums, false);
    });
}

function spawnLimiter(nums, firstTime = true) {
    if (!firstTime) {
        if (nums[0]) spawnNode(nums[0]);
        return nums.splice(0, 1);
    }
    for (let i = 0; i < 2; i++) {
        if (!nums[i]) break;
        spawnNode(nums[i]);
    }
    return nums.splice(0, 2);
}

const nums = process.argv.slice(2);
spawnLimiter(nums);