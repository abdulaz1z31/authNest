export function LogMethod(): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      for (let i = 0; i < args.length; i++) {
        args[i] = 3 * args[i];
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
class Test {
  @LogMethod()
  static addNumber(a: number, b: number): number {
    return a + b;
  }
}

console.log(Test.addNumber(5, 3));
