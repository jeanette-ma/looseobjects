const express = require("express");
const router = express.Router();

const dao = require("../modules/main-dao.js");

router.get("/", async function (req, res) {
    
    res.render("home");
});

router.get("/getNewEvents", async function(req, res){

    const events = await dao.retrieveNewEvents();
    res.json(events);
});

router.get("/getGraphData", async function(req, res){

    const windfarms = await dao.getCountbyWindfarmAndSound();
    res.json(windfarms);
});

router.get("/getInfo", async function(req, res){
    
    const eventId = req.query.eventId;

    const event = await dao.retrieveSingleEvent(eventId);
    res.json(event);

});

router.post("/updateUserDecision", async function (req, res){

    const eventId = req.body.eventId;
    const decision = req.body.decision;
    // const userIntials = req.body.userIntials;
    const userIntials = "CHWMA";

    await dao.updateUserDecision(eventId,decision,userIntials);

    res.redirect("/");
})

module.exports = router;

