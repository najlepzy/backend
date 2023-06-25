function performIntensiveSum(num1, num2) {
  let sum = 0;
  for (let i = 0; i < 5e9; i++) {
    sum += num1 + num2;
  }
  return sum;
}

const handleMessage = (data) => {
  const result = performIntensiveSum(data.num1, data.num2);
  process.send(result);
};

const childProcess = fork();
childProcess.on("message", handleMessage);
