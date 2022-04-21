const myName = 'Daniel';
const myAge = 25;

const suma = (a: number, b: number) => {
  return a + b;
};

/* El tipado es super util en  TS */
suma(1, 1);

class Persona {
  /*
  Si en el constructor ponemos private no debemos crearlos.
  private age: number;
  private name: string; */

  constructor(private age: number, private name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `my name is ${this.name}, ${this.age}`;
  }
}

const daniel = new Persona(25, 'Daniel');
