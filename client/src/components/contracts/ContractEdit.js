import React from 'react';
import {connect} from 'react-redux';

import ContractForm from './ContractForm';
import {editContract, getContracts} from '../../actions/index';

class ContractEdit extends React.Component {

    //TODO get the component to work on its own, try fetching a single bid or the entire bid list
    //we tried bid list in cdm already
    componentDidMount() {
        //TODO maybe change this to only get the bid we care about
        this.props.getContracts();
    }
    formatDate = (string) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    };
    normalizeString = (string) => {
        //formate of date must be "11/23/2019 5:32 PM"
        const d = new Date(string);
        const ned = d.toJSON();

        const stringDate = `${ned}`;
        return stringDate;
    };

    onSubmit = formValues => {
        formValues.Date = this.normalizeString(formValues.Date);
        console.log(`this is the contract id from the client side ${this.props.contract._id}`);
        this.props.editContract(formValues, this.props.contract._id);
    };

  render() {
      if (this.props.contracts.length !== 0) {
          console.log(this.props.contracts.length);
          return (
              <div className="ui container">
                  <h3> Edit a bid</h3>
                  <ContractForm
                      initialValues={
                          {
                              Date: this.formatDate(this.props.contract.Date),
                              Description: this.props.contract.Description,
                              Project_Num_or_Fund: this.props.contract.Project_Num_or_Fund,
                              Buyer_Initials: this.props.contract.Buyer_Initials,
                              Req_Num: this.props.contract.Req_Num,
                              IFBRFP_Num: this.props.contract.IFBRFP_Num,
                              Amount: this.props.contract.Amount,
                              Vendor: this.props.contract.Vendor

                          }}

                      onSubmit={this.onSubmit}
                  />
              </div>
          );
      }
          return <div>Loading</div>;

  }
}

const mapStateToProps = (state, ownProps) => {
  return { contracts: Object.values(state.contracts), contract: state.contracts[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {editContract, getContracts})(ContractEdit);