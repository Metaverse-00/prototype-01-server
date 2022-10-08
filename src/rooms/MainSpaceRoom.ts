import { Room, Client } from "colyseus";
import { MainSpaceState } from "../schema/MainSpaceState";

export class MainSpaceRoom extends Room<MainSpaceState> {

  onCreate (options: any) {
    this.setState(new MainSpaceState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
