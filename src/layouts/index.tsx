import React from 'react';
import Link from 'umi/link';
import { Menu, Icon } from 'antd';
// import * as styles from './index.less';
// import withRouter from 'umi/withRouter';

const styles = require('./index.less');

class BasicLayout extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Menu
          defaultSelectedKeys={['/users']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          className={styles.menu}
        >
          <Menu.Item key="/users">
            <Link to="/users"><Icon type="pie-chart" /><span>Contacts</span></Link>
          </Menu.Item>
          <Menu.Item key="/push">
            <Link to="/push"><Icon type="desktop" /><span>Push</span></Link>
          </Menu.Item>
        </Menu>
        <div className={styles.mainer}>{this.props.children}</div>
      </div>
    );
  }
}
console.log(process.env.TEST)
export default BasicLayout;
// export default withRouter(BasicLayout);
