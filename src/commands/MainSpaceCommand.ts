import { Command } from "@colyseus/command";
import { MainSpaceRoom } from "../rooms/MainSpaceRoom";
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

    switch (playerCount) {
      case 0:
        position = new PositionState(0, -5, 10);
        rotation = 0;
        break;
      case 1:
        position = new PositionState(10, -5, 0);
        rotation = 90;
        break;
      case 2:
        position = new PositionState(-10, -5, 0);
        rotation = -90;
        break;
    }
    this.state.players.set(sessionId, new PlayerState(name, position, rotation));
  }
}

export class OnLeaveCommand extends Command<MainSpaceRoom, { 
  sessionId: string,
}> {
  execute({ sessionId } = this.payload) {
    this.state.players.delete(sessionId);
  }
}
