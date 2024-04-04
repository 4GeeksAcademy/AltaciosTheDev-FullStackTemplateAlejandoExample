const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			//at the beginning of the application this will execute looking for a token in localStorage, if it does not exist, it will default to none.
			token: localStorage.getItem("token") || null

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type":"application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				}
				//STEP 1: attemp to send login info from the front end to the back end 
				try{
					const resp = await fetch("https://expert-xylophone-px659v6g94g294gq-3001.app.github.dev/api/token", opts)
					if(resp.status !== 200){
						alert("There has been some error")
						return false
					} 
					//STEP 3: receive token from the backend and store in front end
					const data = await resp.json()
					console.log("This came from the backend", data)
					//set the token in the store.token
					setStore({token: data.access_token})
					//set the token in local storage, so when browser refreshes token is not lost, and the token in store defaults to this when there is a value.
					localStorage.setItem("token", data.access_token)
					return true
				}

				catch(error){
					console.error("There was an error", error)
				}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
