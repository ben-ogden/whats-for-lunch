/*
  Send a confirmation response to a voter.
 */
exports = function(recipient) {
  const twilio = context.services.get("sms-service");
  const ourNumber = context.values.get("ourNumber");

  twilio.send({
    from: ourNumber,
    to: recipient,
    body: "Thanks for voting!"
  });
};