export {};
// Property dekoratori: Property qiymatini o'zgartirish, validatsiya qilish yoki kuzatish
function PropertyDecorator(target: any, propertyKey: string) {
  let value: any;

  // Getter funksiyasi
  const getter = () => {
    console.log(`Getting value of "${propertyKey}": ${value}`);
    return value;
  };

  // Setter funksiyasi
  const setter = (newValue: any) => {
    console.log(`Setting value of "${propertyKey}" to: ${newValue}`);
    value = newValue;
  };

  // Property uchun getter va setterni aniqlash
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class MyClass {
  @PropertyDecorator
  myProperty: string = 'Initial Value';
}

const instance = new MyClass();

// Property qiymatini o'zgartiramiz
instance.myProperty = 'Hello, World!'; // Setting value of "myProperty" to: Hello, World!
console.log(instance.myProperty); // Getting value of "myProperty": Hello, World!
