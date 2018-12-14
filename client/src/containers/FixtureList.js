import React from "react";
import { connect } from "react-redux";
import Fixture from "../components/Fixture";
import { removeFixture, fetchAllFixtures } from "../actions/fixtures";

/*function FixtureList(props) {
  if (!this.props.fixtures.length) {
    return <div>No Fixtures</div>;
  }
  return (
    <div>
      {props.fixtures.map(fixture => {
        return (
          <Fixture
            fixture={fixture}
            onDelete={props.onRemove}
            key={fixture._id}
          />
        );
      })}
    </div>
  );
}*/

export class FixtureList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(fetchAllFixtures());
  }

  render() {
    if (!this.props.fixtures.length) {
      return <div>You Have Not Posted Any Fixtures</div>;
    }
    return (
      <div>
        {this.props.fixtures.map(fixture => {
          return (
            <Fixture
              fixture={fixture}
              onDelete={this.props.dispatch(removeFixture(fixture._id))}
              //onDelete={this.props.onRemove}
              key={fixture._id}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fixtures: state.fixture
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onRemove: id => {
//       dispatch(removeFixture(id));
//     },
//     fetchAllFixtures: () => {
//       dispatch(fetchAllFixtures);
//     }
//   };
// };

export default connect(mapStateToProps)(FixtureList);
