import React from 'react';
import {connect} from 'react-redux';
import {Dropdown, Button} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

import {contractDelete} from '../../actions/index'

class Options extends React.Component {
    state = {value: ''};


  componentDidUpdate() {
      //when the state updates redirect based on that state to the correct page
      if (this.state.value === 'edit') {
          return <Redirect to='/' />
      }
  }

    checkAdmin = () => {
    return this.props.role !== "Admin";
  };

  handleChange = (e, {value}) => this.setState({value});

  options = () => {
      return(
      [
          {key: 'filler', icon: 'sort down', text:'Select an option:', value: ''},
      { key: 'edit', icon: 'edit', text: 'Edit Bid', value: 'edit' },
      { key: 'delete', icon: 'delete', text: 'Remove Bid', value: 'delete', disabled: this.checkAdmin() },
          ]
  );
    };

  dropdownLogic = (id) => {
      if (this.state.value === 'edit') {
            const path = `/contract/edit/${id}`;
          return <Redirect to={path} />
      }

      if (this.state.value === 'delete') {
            this.props.contractDelete(this.props.contractId);
      }
  };

  render() {
    return (
        <div>
            <Button.Group color='teal'>
            <Dropdown options={this.options()} floating button className='icon' value={this.state.value} onChange={this.handleChange} />
                {this.dropdownLogic(this.props.contractId)}
            </Button.Group>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {role: state.auth.user.role};
};
export default connect(mapStateToProps, {contractDelete})(Options);