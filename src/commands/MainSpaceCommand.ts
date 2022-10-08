import { Command } from "@colyseus/command";
import { MainSpaceRoom } from "../rooms/MainSpaceRoom";
import { PlayerState } from "../schema/PlayerState";

export class OnJoinCommand extends Command<MainSpaceRoom, { 
  sessionId: string,
  name: string, 
}> {
  execute({ sessionId, name } = this.payload) {
    this.state.players.set(sessionId, new PlayerState(name))
  }
}
