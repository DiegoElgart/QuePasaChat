export const AUTH_USER = "AUTH_USER";
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";

export const authUser = payload => ({ type: AUTH_USER, payload });
export const authLoading = payload => ({ type: AUTH_LOADING, payload });
export const authError = payload => ({ type: AUTH_ERROR, payload });
export const authLogout = () => ({ type: LOGOUT, payload: {} });

export const authLogin = user => async dispatch => {
	dispatch(authLoading(true));
	const url = "http://localhost:4000/auth/login";
	try {
		let res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"content-type": "application/json",
			},
		});
		let data = await res.json();
		if (data.user) {
			localStorage.setItem("userInfo", JSON.stringify(data));
			dispatch(authUser(data));
		} else {
			dispatch(authError(true));
		}
	} catch (err) {
		dispatch(authLoading(false));
		dispatch(authError(true));
		console.log(err.message);
	}
};

export const authRegister = newUser => async dispatch => {
	dispatch(authLoading(true));
	const url = "http://localhost:4000/auth/register";
	try {
		let res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(newUser),
			headers: {
				"content-type": "application/json",
			},
		});
		let data = await res.json();
		if (data.user) {
			localStorage.setItem("userInfo", JSON.stringify(data));
			dispatch(authUser(data));
		} else {
			dispatch(authError(true));
		}
	} catch (err) {
		dispatch(authLoading(false));
		dispatch(authError(true));
		console.log(err.message);
	}
};
