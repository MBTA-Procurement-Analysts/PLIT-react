import React from 'react';
import {Form, Field} from 'react-final-form';
import { Redirect } from 'react-router-dom';


class BidForm extends React.Component {
//this takes the formProps input property (has value, onChange etc) and add them as props to the input element.
    //if we dont do this we have to do something like:
    //onChange={formProps.input.onChange} for every form property we want to use from redux form.
    //this is an even shorter version of {...formProps.input} by destructuring input out of formProps.

    state ={fireRedirect: false};



    redirect = () => {
        if (this.state.fireRedirect) {
            return <Redirect to='/bids' />;
        }
    };
    normalizeString = (string) => {
        //formate of date must be "11/23/2019 5:32 PM"
        const d = new Date(string);
        console.log(d);
        const ned = d.toJSON();
        console.log(ned);
        const stringDate = `${ned}`;
        console.log(stringDate);
        return stringDate;
    };

    renderError({error, touched}) {
        if(touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }


    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className = {className}>
                <label>{label}</label>
                <input {...input}/>

                {this.renderError(meta)}
            </div>

        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
        this.setState({fireRedirect: true});
    };

    render() {
        return(
            <Form
                onSubmit={this.onSubmit}
                initialValues={this.props.initialValues}
                render = { ({handleSubmit}) => (
                    <div className="ui container">
                        <form onSubmit={handleSubmit} className="ui form error">
                            <Field name="Buyer" component={this.renderInput} label="Buyer Name"/>
                            <Field name = "Proj_Name" component={this.renderInput} label="Project Name"/>
                            <Field name = "Req_ID" component={this.renderInput} label="Requisition Number" />
                            <Field name = "Fund_Code" component={this.renderInput} label="funding Source Code"/>
                            <Field name = "Bid_Type" component={this.renderInput} label="Bid Type"/>
                            <Field name = "Requested_Dttm" component={this.renderInput} label="Bid opening Date ( Please enter in the following format MM/DD/YYYY HH:MM PM/AM)"/>
                            <button className = "ui button primary">Submit</button>
                        </form>
                        {this.redirect()}
                    </div>
                )} />


        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.Buyer) {
        errors.Buyer = 'You must enter a buyer';
    }

    if (!formValues.Proj_Name) {
        errors.Proj_Name = 'You must enter a project name'
    }

    if (!formValues.Req_ID) {
        errors.Req_ID = 'You must enter a requistion ID';
    }

    if (!formValues.Fund_Code) {
        errors.Fund_Code = 'You must enter the funding source code';
    }

    if (!formValues.Bid_Type) {
        errors.Bid_Type = 'You must enter the Bid type'
    }

    if (!formValues.bidOpeningDate) {
        errors.bidOpeningDate = 'You must enter the bid opening date';
    }

    return errors;
};

/*
 const formWrapped = reduxForm({
form: 'bidCreate',
    validate
})(BidCreate);

 export default connect(null, {bidCreate})(formWrapped);
 */
export default BidForm;