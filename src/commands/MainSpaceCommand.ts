import { Command } from "@colyseus/command";
import { MainSpaceRoom } from "../rooms/MainSpaceRoom";
import { CameraState } from "../schema/CameraState";
import { PlayerState } from "../schema/PlayerState";
import { PositionState } from "../schema/PositionState";
import { ChatState } from "../schema/ChatState";
import { ServerError } from "colyseus";

export class OnKeyInputCommand extends Command<MainSpaceRoom, {
  sessionId: string,
  data: {
    w: boolean,
    a: boolean,
    s: boolean,
    d: boolean,
  }
}> {
  execute({ sessionId, data } = this.payload) {
    const { keyInput } = this.state.players.get(sessionId);
    keyInput.w = data.w;
    keyInput.s = data.s;
    keyInput.a = data.a;
    keyInput.d = data.d;
  }
}

export class OnSendMsgCommand extends Command<MainSpaceRoom, {
  sessionId: string,
  message: string,
  timestamp: number
}> {
  execute({ sessionId, message, timestamp } = this.payload) {
    const chat = new ChatState(sessionId, message, timestamp);
    this.state.chats.push(chat);
  }
}

export class OnJoinCommand extends Command<MainSpaceRoom, {
  sessionId: string,
}> {
  execute({ sessionId } = this.payload) {
    const { A, B, C } = this.state.labels;
    let label: string;
    let position: PositionState;
    let rotation: number;
    let alpha: number;

    // assigns the first empty position
    switch ("") {
      case A:
        this.state.labels.A = sessionId;
        label = "A";
        position = new PositionState(0, -5, 10);
        rotation = 0;
        alpha = Math.PI / 2;
        break;
      case B:
        this.state.labels.B = sessionId;
        label = "B";
        position = new PositionState(10, -5, 0);
        rotation = 90;
        alpha = Math.PI * 2;
        break;
      case C:
        this.state.labels.C = sessionId;
        label = "C";
        position = new PositionState(-10, -5, 0);
        rotation = -90;
        alpha = Math.PI;
        break;
    }
    this.state.players.set(sessionId, new PlayerState(label, position, rotation));
    this.state.cameras.set(sessionId, new CameraState(alpha, position));
  }
}

export class OnLeaveCommand extends Command<MainSpaceRoom, {
  sessionId: string,
}> {
  execute({ sessionId } = this.payload) {
    const { A, B, C } = this.state.labels;

    switch (sessionId) {
      case A:
        this.state.labels.A = "";
        break;
      case B:
        this.state.labels.B = "";
        break;
      case C:
        this.state.labels.C = "";
        break;
    }
    this.state.players.delete(sessionId);
    this.state.cameras.delete(sessionId);
  }
}

export class CheckPlayerCountCommand extends Command<MainSpaceRoom> {
  validate(): boolean {
    const playerCount = this.state.players.size;
    return playerCount === 3;
  }

  execute() {
    throw new ServerError(403, "Game room is full!");
  }
}
