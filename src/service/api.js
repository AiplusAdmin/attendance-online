import axios from 'axios';

export default () => {
	var currentUser = window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):{accesstoken:'',authtoken:''};
	return axios.create({
		baseURL: 'http://localhost:3002',
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: currentUser && currentUser.accesstoken,
		}
	});
}