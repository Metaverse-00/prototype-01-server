import { Schema, type } from "@colyseus/schema";

export class PlayerState extends Schema {

  @type("string") name: string;

  constructor(_name: string) {
    super();
    this.name = _name;
  }

}