import React, { Component } from "react";
import Layout from "../../components/Layout";

import Campaign from "../../ethereum/campaign";
import { Button, Card, Grid } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    console.log(address);
    const campaign = Campaign(address);
    const sumary = await campaign.methods.getSummary().call();
    console.log("summary", sumary);
    return {
      address,
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
      {
        header: Number(minimumContribution),
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: Number(requestsCount),
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: Number(approversCount),
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend",
      },
    ];
    return <Card.Group items={items}></Card.Group>;
  }
  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address}></ContributeForm>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
