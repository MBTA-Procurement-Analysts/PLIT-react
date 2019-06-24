import React from 'react';
import {connect} from 'react-redux';

import {contractCreate} from '../../actions/index'
import ContractForm from './ContractForm';

class ContractCreate extends React.Component {



    normalizeString = (string) => {
        //format of date must be "11/23/2019 5:32 PM"
        const d = new Date(string);
        const ned = d.toJSON();
        const stringDate = `${ned}`;
        return stringDate;
    };

    onSubmit = (formValues) => {
        //call the action creator to create bid
        formValues.Date = this.normalizeString(formValues.Date);
        this.props.contractCreate(formValues);
        this.setState({fireRedirect: true});
    };

    render() {
        return(
            <div className="ui container">
            <h3>Create a Contract</h3>
                <ContractForm
                    onSubmit={this.onSubmit}
                />
            </div>


        );
    }
}

export default connect(null, {contractCreate})(ContractCreate);