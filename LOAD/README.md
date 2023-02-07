# Loose Objects Anomaly Detector

Install: 
- Node.js
- Run npm install - package.json includes express, handlebars, sqlite
- 

LOAD is a browser app that is aimed at users who in the past have manually classified microphone noises. The app has a UI that allows:
- Instances of pre-classified recordings (events) to be viewed in a selection list. 
- A graph that plots the frequency of events, and the type of event (bolts, other sounds or false alarms), for each wind farm.
- When an event is selected, the event information is displayed, showing related information from DB. 
- Ability to playback recording file and for the user to confirm or reject the classification. 
- The confirmed or rejected file is moved to a retraining directory, where a data scientist can retrain the model. 

Extended functionalities: 
- Authentification tied to the user's Orsted AD credentials 
- When a standard user logs in, they can only see events, playback and confirm or reject. 
- When a data scientist logs in, they can view a list of retraining files, model parameters. They have the ability to choose a set of retraining files and run a function to retrain the model. 
- Direct notification to the Operation Hubs, warning them of any bolt noises (for immediate action) or false alarms (to down prioritise any action).  



