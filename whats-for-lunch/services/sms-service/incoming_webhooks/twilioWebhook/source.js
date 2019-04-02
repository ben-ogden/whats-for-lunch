/*
  Webhook for twilio integration.
*/
exports = function(payload) {
  
  var op = payload.Body;
  var recipient = payload.From;

  if ("?" == op) {
    context.functions.execute("sendLeaderboard", recipient);
  } else {
    context.functions.execute("saveVote", recipient, op);
    context.functions.execute("sendConfirmation", recipient);
  }

};