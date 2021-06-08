import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { myState: { email } } = this.props;
    return (
      <header>
        <div data-testid="email-field">
          E-mail:
          { email }
        </div>
        Despesa total:
        <div data-testid="total-field">
          0
        </div>
        Câmbio utilizado:
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  myState: state.user,
});

Header.propTypes = {
  myState: PropTypes.objectOf({
    email: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Header);
