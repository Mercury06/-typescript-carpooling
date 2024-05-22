import { IAsk } from "../models/Ask";
import { IRide } from "../models/Ride";

function findMatchingSubs(route: Array<string>, subscriptions: Array<IAsk>): Array<IAsk> {
  const subroutesSet = prepareSubroutesSet(route);
  //console.log('subroutesSet inside:', subroutesSet);
  //console.log('subscriptions inside:', subscriptions);
  return subscriptions.filter((s) =>
    subroutesSet.has(
      makeKey(s.localityFrom.localityName, s.destination.localityName)
    )
  );
}

function prepareSubroutesSet(route: Array<string>) {
  const subroutesSet = new Set();

  for (let fromIdx = 0; fromIdx < route.length; fromIdx++) {
    for (let dstIdx = fromIdx + 1; dstIdx < route.length; dstIdx++) {
      subroutesSet.add(makeKey(route[fromIdx], route[dstIdx]));
    }
  }
  //console.log("subroutesSet:", subroutesSet);
  return subroutesSet;
}

function makeKey(from: string, dst: string) {
  return `${from}:${dst}`;
}

function findMatchingRides(searchedRides: Array<IRide>, localityFrom: string, destination: string): Array<IRide> {
  const preparedRides: Array<IRide> = [];
  // console.log("localityFrom inside:", localityFrom);
  // console.log("destination inside:", destination);
  const modifiedRides = searchedRides.forEach((ride) => {
    let points = ride.points;
    //console.log("points in rides:", points);
    let route: Array<string> = points.map((item) => item.localityName);
    //console.log("route in rides:", route);
    const subroutesSet = prepareSubroutesSet(route);
    //console.log("findMatchingRides:", subroutesSet);
    function findMatched(route: Array<string>) {
      //console.log("inside result:", `${localityFrom}:${destination}`);
      if (subroutesSet.has(`${localityFrom}:${destination}`)) {
        preparedRides.push(ride);
      } else {
        console.log("not matched!");
      }
    };
    findMatched(route)
    //console.log("preparedRidesSet:", preparedRides);
  });
  return preparedRides;
}

export {
  findMatchingSubs as getMatchedData,
  findMatchingRides
};
