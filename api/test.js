var counter = 10;
while(counter > 0) {
    console.log(counter--);
}

console.log(".......................")
var factorial = function(number) {
    if (number <= 0){
        return 1;
    } else {
        return (number * factorial(number-1))
    }
};
console.log(factorial(0));
