import { Schema, type } from "@colyseus/schema";
import { PositionState } from "./PositionState";

export class PlayerState extends Schema {

  @type("string") name: string;

  @type(PositionState) position: PositionState;

  @type("number") rotation: number;

  constructor(_name: string) {
    super();
    this.name = _name;
  }

}
