import { Request, Response } from "express";
import EventEmitter from "events";


interface ISse {
  
  _eventListener(data: any): void ;
  _subscribe(client: any): void;
  _removeHandler(userId: any): void;
  _init(req: Request, res: Response): void;
  _emitEvent(data: any): void;
}

class SSE extends EventEmitter implements ISse {

  private connections: Map<string, Response>;
  constructor() {
    super();    
    this.connections = new Map();
    this.on("newSseEvent", this._eventListener);
  }   
  _eventListener(data: any) {
    console.log("eventListener recieved event...:", data);
    const recievers = data.recieverIdArray;
    for (let reciever of recievers) {
      if (this.connections.has(reciever)) {
        reciever = this.connections.get(reciever);
        reciever.write(
          `data: ${JSON.stringify({
            message: "some data for prepared clIEnt",
          })} \n\n`
        );
        // reciever.write(`event: ${JSON.stringify(data.event)} \n\n`);

        reciever.write(`event: ${data.event}\n`);
        // reciever.write(`event: opportune\n`);
        reciever.write(`data: ${JSON.stringify(data.data)} \n`);
        reciever.write(`\n\n`);
      }
    }
  }
  _removeHandler(userId: any) {
    if (this.connections.has(`${userId}`)) {
      this.connections.delete(`${userId}`);
      console.log(`client ${userId} removed from connections...`);
    } else return;

    console.log("connections size after remove", this.connections.size);
  }
  _subscribe(client: any) {
    this.connections.set(`${client.id}`, client.res);
    console.log("connections size when subscribe", this.connections.size);
  }
  _init(req: Request, res: Response) {
    res.writeHead(200, {
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });
    const { userId } = req.params;
    console.log(`client ${userId} connected`);
    console.log("connections size when init", this.connections.size);
    const client = { id: userId, res };
    this._subscribe(client);
    /***************temporary*******************/
    for (let [key] of this.connections) {
      console.log("key:", key);
    }
    /***************temporary*******************/
    res.write(
      `data: ${JSON.stringify({
        message: "client has been initialized...",
      })} \n\n`
    );

    req.on("close", () => {
      // this.removeListener("newSseEvent", eventListener);
      this._removeHandler(userId);
      // clearInterval(this.intervalId);
      // console.log("this intervals when closed", this.intervals);
      console.log(`USER ${userId} closed connection...`);
      res.end();
    });
  }
  _emitEvent(data: any) {
    this.emit("newSseEvent", data);
  }  
}

const sse = new SSE();
export { sse };

