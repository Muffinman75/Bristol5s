import React from "react";

const styles = {
  borderBottom: "2px solid #eee",
  background: "#fafafa",
  margin: ".75rem auto",
  padding: ".6rem 1rem",
  maxWidth: "500px",
  borderRadius: "7px"
};

export default ({
  fixture: { _id, date, time, playersReq, cost, pitchNo, venue, comments },
  onRemove
}) => {
  return (
    <div style={styles}>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>PlayersReq: {playersReq}</p>
      <p>Cost: {cost}</p>
      <p>PitchNo: {pitchNo}</p>
      <p>Venue: {venue}</p>
      <p>Comments: {comments}</p>
    </div>
  );
};
