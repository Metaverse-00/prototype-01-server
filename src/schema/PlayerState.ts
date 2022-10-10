import { Schema, type } from "@colyseus/schema";
import { PositionState } from "./PositionState";

export class PlayerState extends Schema {

  @type("string") name: string;

  @type(PositionState) position: PositionState;

  @type("number") rotation: number;

  constructor(
    _name: string,
    _position: PositionState,
    _rotation: number
  ) {
    super();
    this.name = _name;
    this.position = _position;
    this.rotation = _rotation;
  }

}
