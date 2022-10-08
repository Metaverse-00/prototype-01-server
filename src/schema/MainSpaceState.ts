import { Schema, Context, type } from "@colyseus/schema";

export class MainSpaceState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";

}
