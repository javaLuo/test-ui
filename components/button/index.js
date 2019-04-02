import React, { PureComponent } from 'react';
import './styles.less';
export default class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <button className="button">Test Button</button>;
  }
}
