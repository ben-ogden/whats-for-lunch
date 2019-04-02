/*
  Send the vote leaderboad by SMS to a given recipient.
*/
exports = function(recipient){

  const db = context.services.get("mongodb-atlas").db("lunch");
  const plans = db.collection("plans");

  const twilio = context.services.get("sms-service");
  const ourNumber = context.values.get("ourNumber");
  
  const pipeline = [
    {$match : {group : "Freddie Mac Meetup"}},
    {$unwind : "$restaurants"},
    {$group : 
      {
        _id : "$restaurants.vote",
        votes : { $sum : 1 } 
      }
    },
    {$sort : {"votes" : -1}},
    {$limit : 3}
  ];

  plans.aggregate(pipeline).toArray()
    .then(restaurants => {

    var responseString = "What's for Lunch?!\n";
    restaurants.forEach(function(r) {
      responseString += ` ${r._id} (${r.votes})\n`;
    });
    
    twilio.send({
      from: ourNumber,
      to: recipient,
      body: responseString
    });

  });
  
};