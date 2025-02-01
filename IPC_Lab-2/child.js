import { argv, exit } from "process";

const num = argv[2];

function calcFactorial(num) {
    if (!(+num)) {
        console.error(`Error: Invalid input ${num}`);
        exit(1);
    } 
    if (+num < 0) {
        console.error("Error: Factorial is not defined for negative numbers");
        exit(1);
    }

    let result = BigInt(1);    
    while (num) result *= BigInt(num--);    
    return console.log(`${result}`);
}

calcFactorial(num);