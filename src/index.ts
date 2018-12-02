interface Person {
  name: string;
  age: number;
}

class User implements  Person{
  name: string;
  age: number;

  constructor() {
    this.name = 'Petya';
    this.age = 40;
    console.log(this.logInfo());
  }

  private logInfo () {
    console.log(this.name, this.age);
  }

}