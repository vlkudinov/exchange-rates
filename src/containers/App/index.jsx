import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from 'components/NavBar';
import HomePage from 'containers/HomePage';
import ConverterPage from 'containers/ConverterPage';
import ChartPage from 'containers/ChartPage';
import Container from 'components/Container';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';
import * as actions from 'actions';
import { connect } from 'react-redux';

class App extends React.Component {
  state = {
    loading: true,
    error: false,
    errorMessage: null
  };

  componentDidMount() {
    const { base, period } = this.props;

    this.updateRates(base, period);
  }

  componentDidUpdate(prevProps) {
    const { base, period } = this.props;
    const isBaseUpdated = base !== prevProps.base;
    const isPeriodUpdated = period !== prevProps.period;

    if (isBaseUpdated || isPeriodUpdated) {
      this.updateRates(base, period);
    }
  }

  onLoaded = () => {
    this.setState({
      loading: false,
      error: false
    });
  };

  onError = err => {
    this.setState({
      loading: false,
      error: true,
      errorMessage: err.message
    });
  };

  updateRates(base, period) {
    this.props
      .fetchRates(base, period)
      .then(this.onLoaded)
      .catch(this.onError);
  }

  renderApp() {
    return (
      <React.Fragment>
        <NavBar pathname={this.props.pathname} />
        <main>
          <Container>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/converter" component={ConverterPage} />
              <Route path="/chart" component={ChartPage} />
            </Switch>
          </Container>
        </main>
      </React.Fragment>
    );
  }

  render() {
    const { loading, error, errorMessage } = this.state;
    const hasData = !(loading || error);

    const message = error ? <ErrorMessage message={errorMessage} /> : null;
    const loader = loading ? <Loader /> : null;
    const content = hasData ? this.renderApp() : null;

    return (
      <React.Fragment>
        {message}
        {loader}
        {content}
      </React.Fragment>
    );
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
