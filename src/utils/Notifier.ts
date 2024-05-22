

interface INotification {
  initiator: string,
  usersToNotify: Array<string>,
  eventType: string,
  notifiedId: string
}

class Notifier {
  constructor() {
    console.log("notifier first time initialized")
  }

  // newMatchRideNotification(matched: Array<IAsk>, initiator: string) {    
  //   console.log("matched:", matched);    
  //   let recieverIdArray: Array<string> = matched.map((el) => JSON.stringify(el.user).slice(1, -1));        
    
  //   return {
  //     recieverIdArray,
  //     event: EventType.OPPORTUNE,
  //     data: {
  //       newRide: initiator,
  //       title: "for your ask new matching ride registered",
  //     },
  //   };
  // }
  createNotification(usersToNotify: Array<string>, initiator: string, eventType: string, notifiedId: string): INotification {    
    console.log("usersToNotify in createNotification:", usersToNotify);  
    console.log("initiator in createNotification:", initiator); 
    console.log("eventType in createNotification:", eventType);   
    console.log("notifiedId in createNotification:s", notifiedId);  
    // let recieverIdArray: Array<string> = matched.map((el) => JSON.stringify(el.user).slice(1, -1));        
    
    return {      
      usersToNotify,
      initiator,
      eventType,
      notifiedId
    };
  }
}

const notifier = new Notifier();
export { notifier };
