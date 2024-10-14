export function getStatusMessage(status) {
  switch (status) {
    case 3:
      return { message: "Bidding Open. Please place a bid", color: "orange" };
    case 4:
      return { message: "Bidding Open. Please place a bid", color: "orange" };
    case 5:
      return { message: "Please submit after uploading solution files", color: "green" };
    case 6:
      return { message: "Assignment submitted. Wait for admin review", color: "orange" };
    case 7:
      return { message: "Feedback given by admin. Please revise the work", color: "orange" };
    case 8:
      return { message: "Accepted by admin", color: "orange" };
    case 9:
      return { message: "Accepted by admin", color: "green" };
    case 10:
      return { message: "Client has suggested changes. Please revise", color: "orange" };
    case 11:
      return { message: "Client has suggested changes. Please revise", color: "orange" };
    case 12:
      return {
        message: "Submitted. Wait for review",
        color: "green",
      };
    case 13:
      return { message: "", color: "green" };
    default:
      return {};
  }
}
