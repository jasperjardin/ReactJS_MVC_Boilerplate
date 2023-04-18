import {API_URL} from '../../config/config'
import ApiService from "../services/ApiService";

const ContactModel = {
	async fetchEvents() {
		try {
			const response = await ApiService.get( `${API_URL}/events` );
			return response.data;
		} catch (error) {
			console.error(error);
			return [];
		}
	},
	getData: async () => {
		const response = await fetch( API_URL);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	},
	getFilteredData: async ( propertyName ) => {
		// implementation here
		
		let data = await this.getData();

		const filteredData = data?.propertyName ?? null;

		return filteredData
	}
};

export default ContactModel;