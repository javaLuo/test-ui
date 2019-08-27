import React from 'react';
// test01
// import Vcode from '../../dist/index.js';
import ReactDom from 'react-dom';
import { Button } from '../../lib';
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 1,
      input2: '', // 第2个input的值
      vcode2: '-1', // 第2个vcode的值
      code: '',
      width: 200,
    };
  }

  onInput2Change(e) {
    this.setState({
      input2: e.target.value,
    });
  }

  onVcode2Change(v) {
    console.log('触发回调onChange', v);
    if (v) {
      this.setState({
        vcode2: v,
      });
    }
  }

  onChangeImg() {
    const imgindex = this.state.img === 1 ? 2 : 1;
    this.setState({
      img: imgindex,
      code: imgindex === 1 ? ImgTest1 : ImgTest2,
      vcode2: '1234',
    });
  }
  onChangeStr() {
    const a = ['a', 'b', 'c', 'd'];
    const d = [];
    for (let i = 0; i < 5; i++) {
      d.push(a[Math.round(Math.random() * 3)]);
    }
    console.log('code:', d);
    this.setState({
      code: d.join(''),
    });
  }

  onVcodeClick() {
    this.onChangeStr();
  }
  onChangeWidth() {
    const l = Math.round(Math.random() * 800 + 400);
    console.log('改变width:', l);
    this.setState({
      width: l,
    });
  }
  render() {
    return (
      <div>
        <div>
          <Button />
        </div>
        <hr />
      </div>
    );
  }
}

ReactDom.render(<Test />, document.getElementById('root'));
