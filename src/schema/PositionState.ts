import { Schema, type } from "@colyseus/schema";

export class PositionState extends Schema {

  @type("number") x: number;

  @type("number") y: number;
  
  @type("number") z: number;

  constructor(_name: string) {
    super();
  }

}
