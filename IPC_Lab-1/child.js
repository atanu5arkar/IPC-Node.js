const num = process.argv[2];

function calcFactorial(num) {
    let result = BigInt(1);    
    while (num) result *= BigInt(num--);    
    return process.send(result.toString());
}

calcFactorial(num);