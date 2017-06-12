var fs = require('fs');

var determineState = function(long, lat){
    var statesMap = loadStatesFile();
    var statesCordsSortedByLongitude = sortStateCordsByLongitude(statesMap);
    var resultState = findState(long, lat, statesCordsSortedByLongitude);
    
    return resultState;
};

function loadStatesFile(){
    var statesMap = {};
    var lines = require('fs').readFileSync(__dirname + "/../states.json", 'utf-8').split('\n');
    lines.forEach(function(line, index){
        if(line){
            var state = JSON.parse(line);
            statesMap[state.state] = state.border;
        }
    });
    return statesMap;
};

function sortStateCordsByLongitude(states){
    for(var key in states){
        states[key] = states[key].sort(sortLongitudeCordsFunction);
    }
    return states;
};

function sortLongitudeCordsFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
};

function findState(long, lat, statesSortedByLongitude){
    var possibleStates = findPossibleStatesBasedOnLongitude(long, statesSortedByLongitude);
    var resultState = findStateFromLatitude(lat, possibleStates, statesSortedByLongitude);

    return resultState;
};

function findPossibleStatesBasedOnLongitude(long, statesSortedByLong){
    var possibleStates = [];
    for(var state in statesSortedByLong){
        var stateCords = statesSortedByLong[state];
        var numCords = stateCords.length;
        if (long > stateCords[0][0] && long < stateCords[numCords-1][0]){
            possibleStates.push(state);
        }
    }
    return possibleStates;
};

function findStateFromLatitude(lat, possibleStates, statesMap){
    for (var i = 0; i<possibleStates.length; i++){
        var stateCordsSortedByLatitude = statesMap[possibleStates[i]].sort(sortLatitudeCordsFunction);
        var numCords = stateCordsSortedByLatitude.length;
        if (lat > stateCordsSortedByLatitude[0][1] && lat < stateCordsSortedByLatitude[numCords-1][1]){
            return possibleStates[i];
        }
    }
    return "Not Found";
};

function sortLatitudeCordsFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
};

module.exports = {
    determineState: determineState
};