import React, { Component } from "react";
import Layout from "../../components/Layout";

import Campaign from "../../ethereum/campaign";
import { Card } from "semantic-ui-react";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    console.log(address);
    const campaign = Campaign(address);
    const sumary = await campaign.methods.getSummary().call();
    console.log("summary", sumary);
    return {
      minimumContribution: sumary[0],
      balance: sumary[1],
      requestsCount: sumary[2],
      approversCount: sumary[3],
      manager: sumary[4],
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items}></Card.Group>;
  }
  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default CampaignShow;
