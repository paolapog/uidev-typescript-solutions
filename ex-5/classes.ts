export class Fruit {
  name: string;
  protected sweetnees: number;
  private isEdible: boolean;
  constructor(name: string, sweetnees: number = 50, isEdible: boolean = true) {
    this.name = name;
    this.sweetnees = sweetnees;
    this.isEdible = isEdible;
  }
  get tasty(): boolean {
    return this.sweetnees > 60;
  }
  static cook(fruit: Fruit): string {
    return `Cooked ${fruit.name}`;
  }
}

export class Apple extends Fruit {
  variety: string;
  constructor(variety: string) {
    super("Apple");
    this.variety = variety;
  }
}