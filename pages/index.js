import React, { Component } from "react";

import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

class CampaignIndex extends Component {
  static async getInitialProps() {
    let campaigns = await factory.methods.getDeployedCampaigns().call();
    campaigns = ["0xe2321d75e0Ec448368dDFc0745533C14c288Cd8E"];
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });
    return <Card.Group items={items}></Card.Group>;
  }

  render() {
    return (
      <Layout>
        <>
          <h1>{this.props.campaigns.length}</h1>
          <h3>Open Campaign</h3>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          ></Button>
          {this.renderCampaigns()}
        </>
      </Layout>
    );
  }
}

export default CampaignIndex;
