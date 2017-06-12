Kieran Lynn
6/11/17

# State Server!

This node app takes in two coordinates and finds what state those coordinates 
in. It reads the state coordinate boundries from states.json.

To run the app simply run.

  npm start

To run all tests. Run:

  npm test

Once the app is running call with a curl command: 

  curl  -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/

A JSON object containing the state will be output.
