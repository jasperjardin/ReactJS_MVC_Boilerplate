import React from 'react';
import HomeModel from './HomeModel';
import HomeView from './HomeView';

class HomeController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		const data = await HomeModel.getData();
		this.setState({ data });
	}

	async handleInputChange(event) {
		const value = event.target.value;
		const filteredData = await HomeModel.getFilteredData(value);
		this.setState({ data: filteredData });
	}

	async handleSubmit(event) {
		event.preventDefault();
		const data = await HomeModel.getData();
		this.setState({ data });
	}

	render() {
		return (
			<HomeView
				data={this.state.data}
				onInputChange={this.handleInputChange}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

export default HomeController;