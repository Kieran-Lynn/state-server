# State Server

This node app takes in two coordinates and finds what state those coordinates 
are in. It reads the state coordinate boundries from states.json.

Clone this repo and then install all dependencies with: 

  ```bash
  npm install
  ```

Start the server:

  ```bash
  npm start
  ```

Once the app is running call with a curl command: 

  ```bash
  curl  -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/
  ```

A JSON object containing the state will be output.


Run all tests:

  ```bash
  npm test
  ```