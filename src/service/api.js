import axios from 'axios';

export default () => {
	var currentUser = JSON.parse(window.localStorage.currentUser);
	return axios.create({
		baseURL: 'http://localhost:3003',
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: currentUser && currentUser.accesstoken,
			Authtoken: currentUser && currentUser.authtoken
		}
	});
}