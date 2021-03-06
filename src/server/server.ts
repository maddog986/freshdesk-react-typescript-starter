// https://developers.freshdesk.com/v2/docs/your-first-serverless-app/#
exports = {
  events: [{ event: "onTicketCreate", callback: "onTicketCreateHandler" }],

  // args is a JSON block containing the payload information.
  // args["iparam"] will contain the installation parameter values.
  onTicketCreateHandler: function (args: any) {
    console.log("Hello" + args["data"]["requester"]["name"]);
  },
};
