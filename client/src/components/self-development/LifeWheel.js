import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentLifeWheel } from '../../actions/lifeWheelActions';
import Spinner from '../common/Spinner';
import Chart from 'chart.js';

class LifeWheel extends Component {
  componentDidMount() {
    this.props.getCurrentLifeWheel();

    const canvasElement = document.getElementById("lifeWheelChart");
    const radarChart = new Chart(canvasElement, {
      type: 'radar',
      data: {
        labels: ['ФІНАНСИ', 'ОТОЧЕННЯ', 'СІМ\'Я / ВІДНОСИНИ', 'ДУХОВНИЙ СТАН', 'ВІДПОЧИНОК', 'ЗДОРОВ\'Я'],
        datasets: [{
          label: this.props.auth.user.name,
          backgroundColor: "rgba(8,171,137,0.1)",
          borderColor: "rgba(8,171,137,0.3)",
          radius: 5,
          pointRadius: 6,
          pointHoverRadius: 10,
          pointBackgroundColor: "rgba(8,171,137,0.3)",
          data: [8, 2, 10, 7, 4, 6]
        }]
      },
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 10,
            stepSize: 1
          },
          pointLabels: {
            fontSize: 14
          },
          legend: {
            position: 'left'
          },
          display: true
        }
      }
    });
  }

  render() {
    const { user } = this.props.auth;
    const { lifeWheel, loading } = this.props.lifeWheel;

    let content;

    if (lifeWheel === null || loading) {
      content = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(lifeWheel).length > 0) {
        content = (
          <div>
            {/* <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button> */}
          </div>
        );
      } else {
        // User is logged in but has no profile
        content = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="container">
          <h1 className="display-4">Life Wheel</h1>
          <div className="lifeChartContainer">
            <canvas id="lifeWheelChart"></canvas>
          </div>
          {content}
        </div>
      </div>
    );
  }
}

LifeWheel.propTypes = {
  getCurrentLifeWheel: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  lifeWheel: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lifeWheel: state.lifeWheel,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentLifeWheel })(
  LifeWheel
);
