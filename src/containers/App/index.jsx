import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from 'components/NavBar';
import Home from 'containers/Home';
import Converter from 'containers/Converter';
import Chart from 'containers/Chart';
import Container from 'components/Container';
import * as actions from 'actions';
import { connect } from 'react-redux';

class App extends React.Component {
  state = {
    loaded: false
  };

  async componentDidMount() {
    try {
      await this.props.fetchRates(this.props.base, this.props.period);
      this.setState({ loaded: true });
    } catch (e) {
      return e;
    }
  }

  async componentDidUpdate(prevProps) {
    const { base, period } = this.props;

    try {
      if (base !== prevProps.base || period !== prevProps.period) {
        await this.props.fetchRates(base, period);
      }
    } catch (e) {
      return e;
    }
  }

  renderApp() {
    return (
      <React.Fragment>
        <NavBar pathname={this.props.pathname} />
        <main>
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/converter" component={Converter} />
              <Route path="/chart" component={Chart} />
            </Switch>
          </Container>
        </main>
      </React.Fragment>
    );
  }

  render() {
    return this.state.loaded ? this.renderApp() : <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  period: state.currency.period.days,
  base: state.currency.base
});

const mapDispatchToProps = dispatch => ({
  fetchRates: (currency, period) => dispatch(actions.fetchRates(currency, period))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
