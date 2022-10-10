import { Command } from "@colyseus/command";
import { MainSpaceRoom } from "../rooms/MainSpaceRoom";
import { CameraState } from "../schema/CameraState";
import { PlayerState } from "../schema/PlayerState";
import { PositionState } from "../schema/PositionState";

export class OnJoinCommand extends Command<MainSpaceRoom, { 
  sessionId: string,
  name: string, 
}> {
  execute({ sessionId, name } = this.payload) {
    const playerCount = this.state.players.size;
    let position: PositionState;
    let rotation: number;
    let alpha: number;

    switch (playerCount) {
      case 0:
        position = new PositionState(0, -5, 10);
        rotation = 0;
        alpha = Math.PI / 2;
        break;
      case 1:
        position = new PositionState(10, -5, 0);
        rotation = 90;
        alpha = Math.PI * 2;
        break;
      case 2:
        position = new PositionState(-10, -5, 0);
        rotation = -90;
        alpha = Math.PI;
        break;
    }
    this.state.players.set(sessionId, new PlayerState(name, position, rotation));
    this.state.camera = new CameraState(alpha, position);
  }
}

export class OnLeaveCommand extends Command<MainSpaceRoom, { 
  sessionId: string,
}> {
  execute({ sessionId } = this.payload) {
    this.state.players.delete(sessionId);
  }
}
