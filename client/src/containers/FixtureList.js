import React from "react";
import { connect } from "react-redux";
import Fixture from "../components/Fixture";
import { removeFixture } from "../actions/fixtures";

// function FixtureList({ fixtures, onRemove }) {
//   if (!fixtures.length) {
//     return <div>No Fixtures</div>;
//   }
//   return (
//     <div>
//       {fixtures.map(fixture => {
//         return (
//           <Fixture fixture={fixture} onDelete={onRemove} key={fixture._id} />
//         );
//       })}
//     </div>
//   );
// }
//
// const mapStateToProps = state => {
//   return {
//     fixtures: state.fixtures
//   };
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     onRemove: id => {
//       dispatch(removeFixture(id));
//     }
//   };
// };
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(FixtureList);
