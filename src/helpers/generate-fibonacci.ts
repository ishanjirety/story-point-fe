export function generateFibonacci(range: number) {
  const fibonacciSequence = [0, 1];

  for (let i = 2; i < range; i++) {
    fibonacciSequence.push(fibonacciSequence[i - 1] + fibonacciSequence[i - 2]);
  }

  return [0, 0.5, ...fibonacciSequence.slice(2)];
}
