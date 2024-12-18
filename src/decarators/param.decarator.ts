import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//bu req paramsdan userni olib beradi
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
// Parameter dekoratori: Parametrni validatsiya qilish
function ValidateString(
  target: Object,
  propertyKey: string,
  parameterIndex: number,
) {
  const originalMethod = target[propertyKey] as Function;

  target[propertyKey] = function (...args: any[]) {
    if (typeof args[parameterIndex] !== 'string') {
      throw new Error(
        `Parameter ${parameterIndex} in ${propertyKey} must be a string.`,
      );
    }
    return originalMethod.apply(this, args);
  };
}

class MyClass {
  myMethod(@ValidateString param1: any) {
    console.log(`param1: ${param1}`);
  }
}

const instance = new MyClass();
instance.myMethod('Hello'); // param1: Hello
instance.myMethod(123); // Error: Parameter 0 in myMethod must be a string.
