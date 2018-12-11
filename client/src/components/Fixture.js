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
      <p>{date}</p>
      <p>{time}</p>
      <p>{playersReq}</p>
      <p>{cost}</p>
      <p>{pitchNo}</p>
      <p>{venue}</p>
      <p>{comments}</p>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => onRemove(_id)}
      >
        Remove
      </button>
    </div>
  );
};
