// export default Object.freeze({
//   ASK: "ask",
//   MESSAGE: "message",
//   CONFIRM: "confirm",
//   GREETING: "greeting",
//   CANCELLED: "cancelled",
//   OPPORTUNE: "opportune",
// });

enum EventType {
  ASK = "ask",
  MESSAGE = "message",
  CONFIRM = "confirm",
  GREETING = "greeting",
  CANCELLED = "cancelled",
  OPPORTUNE = "opportune",
}

export default EventType;