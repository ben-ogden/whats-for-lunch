/*
  Save the vote to MongoDB Atlas.
 */
exports = function(source, vote) {

  const db = context.services.get("mongodb-atlas").db("lunch");
  const plans = db.collection("plans");

  var normalizedVote = context.functions.execute("normalizeVote", vote);

  plans.updateOne(
    { group : "Freddie Mac Meetup" },
    { $pull : { "restaurants" : { "source" : source } } }
  );
  
  plans.updateOne(
    { group : "Freddie Mac Meetup" },
    { $push : { "restaurants" : { "source" : source, "vote" : normalizedVote} } }
  );

};