import { Room, Client } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import { MainSpaceState } from "../schema/MainSpaceState";
import { OnJoinCommand, OnLeaveCommand } from "../commands/MainSpaceCommand";

export class MainSpaceRoom extends Room<MainSpaceState> {

  dispatcher = new Dispatcher(this);

  onCreate (options: any) {
    this.setState(new MainSpaceState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });

  }

  onJoin (client: Client, options: any) { // manage number of players and repsond with A,B,C coordinates
    console.log(client.sessionId, "joined!");

    this.dispatcher.dispatch(new OnJoinCommand(), {
      sessionId: client.sessionId,
      name: options.name
    });
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    this.dispatcher.dispatch(new OnLeaveCommand(), {
      sessionId: client.sessionId
    });
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
