import React from 'react';
import ContactModel from './ContactModel';
import ContactView from './ContactView';

class ContactController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		const data = await ContactModel.getData();
		this.setState({ data });
	}

	async handleInputChange(event) {
		const value = event.target.value;
		const filteredData = await ContactModel.getFilteredData(value);
		this.setState({ data: filteredData });
	}

	async handleSubmit(event) {
		event.preventDefault();
		const data = await ContactModel.getData();
		this.setState({ data });
	}

	render() {
		return (
			<ContactView
				data={this.state.data}
				onInputChange={this.handleInputChange}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

export default ContactController;