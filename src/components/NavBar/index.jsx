import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as ExchangeIcon } from './icons/exchange.svg';
import { ReactComponent as ChartIcon } from './icons/chart.svg';

import './style.scss';

class NavBar extends React.Component {
  render() {
    return (
        <div className="nav-bar">
          <nav className="nav">
            {Object.keys(this.props.links).map((link, index) => {
              const itemClass = cn({
                nav__item: true,
                nav__item_active: this.props.pathname === link
              });
              
              return (
                <div className={itemClass} key={index}>
                  <Link className="nav__link" to={{ pathname: link }}>
                    <span className="nav__icon">{this.props.icons[link]}</span>
                    <span className="nav__text"> {this.props.links[link]}</span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
    );
  }
}

NavBar.defaultProps = {
  links: {
    '/': 'Home',
    '/converter': 'Converter',
    '/chart': 'Chart'
  },
  icons: {
    '/': <HomeIcon/>,
    '/converter': <ExchangeIcon/>,
    '/chart': <ChartIcon/>
  }
};

export default NavBar;
