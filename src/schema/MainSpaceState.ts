import { Schema, type, MapSchema } from "@colyseus/schema";
import { CameraState } from "./CameraState";
import { PlayerState } from "./PlayerState";

export class MainSpaceState extends Schema {

  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();

  @type({ map: CameraState }) cameras = new MapSchema<CameraState>;

}
