import { Schema, type, MapSchema } from "@colyseus/schema";
import { PlayerState } from "./PlayerState";

export class MainSpaceState extends Schema {

  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();

}
