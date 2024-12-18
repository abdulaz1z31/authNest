// //add property decarator
// function AddProperties(): ClassDecorator {
//   return function (target: Function) {
//     target.prototype.newProperty = 'Hello I am new';
//   };
// }

// @AddProperties()
// class MyClass {}

// const instance = new MyClass();
// console.log((instance as any).newProperty); // 'Hello I am new'
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //

// //constructor
// function LogConstructor(): ClassDecorator {
//   return function (target: Function) {
//     const original = target;
//     function construct(constructor: any, args: any[]) {
//       console.log('Constructor called with arguments:', args);
//       return new constructor(...args);
//     }
//     const newConstructor: any = function (...args: any[]) {
//       return construct(original, args);
//     };
//     newConstructor.prototype = original.prototype;
//     return newConstructor;
//   };
// }

// @LogConstructor()
// class MyClass1 {
//   constructor(public name: string) {}
// }
// const instance1 = new MyClass1('Test');
// console.log(instance1);

// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //

// //log methods in class
// function LogMethods(): ClassDecorator {
//   return function (target: Function) {
//     const methodNames = Object.getOwnPropertyNames(target.prototype).filter(
//       (name) => name !== 'constructor',
//     );

//     for (const name of methodNames) {
//       const descriptor = Object.getOwnPropertyDescriptor(
//         target.prototype,
//         name,
//       );
//       if (descriptor && typeof descriptor.value === 'function') {
//         const originalMethod = descriptor.value;
//         descriptor.value = function (...args: any[]) {
//           console.log(`Method ${name} called with arguments:`, args);
//           return originalMethod.apply(this, args);
//         };
//         Object.defineProperty(target.prototype, name, descriptor);
//       }
//     }
//   };
// }
// @LogMethods()
// class MyClass3 {
//   sayHello(name: string) {
//     console.log(`Hello, ${name}!`);
//   }

//   add(a: number, b: number) {
//     return a + b;
//   }
// }
// const instance3 = new MyClass3();
// instance3.sayHello('Alice'); // Method sayHello called with arguments: [ 'Alice' ]
// instance3.add(2, 3); // Method add called with arguments: [ 2, 3 ]

// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //

// //change class
// function ReplaceClass(): ClassDecorator {
//   return function (target: Function) {
//     return class extends target {
//       newMethod() {
//         console.log('This is a new method!');
//       }
//     };
//   };
// }

// @ReplaceClass()
// class MyClass4 {
//   existingMethod() {
//     console.log('This is an existing method.');
//   }
// }

// const instance4 = new MyClass4();
// (instance4 as any).newMethod(); // 'This is a new method!'
// instance4.existingMethod(); // 'This is an existing method.'

// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //

// //add property
// function AddStaticProperty(): ClassDecorator {
//   return function (target: Function) {
//     target.prototype.constructor.staticProperty = 'I am static!';
//   };
// }

// @AddStaticProperty()
// class MyClass5 {}

// console.log((MyClass5 as any).staticProperty); // 'I am static!'
