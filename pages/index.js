import React, { Component } from "react";

import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    let campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items}></Card.Group>;
  }

  render() {
    return (
      <Layout>
        <>
          <h3>Open Campaign</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              ></Button>
            </a>
          </Link>
          {this.renderCampaigns()}
        </>
      </Layout>
    );
  }
}

export default CampaignIndex;
