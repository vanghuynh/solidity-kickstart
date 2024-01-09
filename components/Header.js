import React from "react";

import { Menu } from "semantic-ui-react";

import { Link } from "../routes";

const Header = (props) => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      {/* <Menu.Item>CrowdCoin</Menu.Item> */}
      <Link route="/">
        <a className="item">CrowdCoin</a>
      </Link>

      <Menu.Menu position="right">
        {/* <Menu.Item>Campaigns</Menu.Item>
        <Menu.Item>+</Menu.Item> */}
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
