/* Footer 页面底部 */
import React from "react";
import { Layout } from "antd";
import "./index.scss";

const { Footer } = Layout;
export default class Com extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Footer className="footer">
        东华理工大学大学学生评优评先管理系统{" "}
        <a
          href="www.ecit.cn"
          target="_blank"
          rel="noopener noreferrer"
        >
          学校官网
        </a>
      </Footer>
    );
  }
}

Com.propTypes = {};
