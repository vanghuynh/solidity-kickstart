import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContrubution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log("accounts:", accounts);
      console.log("accounts 0:", accounts[0]);
      console.log("minimumContrubution 0:", this.state.minimumContrubution);
      console.log("factory.methods :", factory.methods);
      await factory.methods
        .createCampaign(this.state.minimumContrubution)
        .send({
          from: accounts[0],
        });
      Router.pushRoute("/");
    } catch (error) {
      console.log("Error");
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              placeholder="10"
              value={this.state.minimumContrubution}
              onChange={(event) =>
                this.setState({ minimumContrubution: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}
export default CampaignNew;
