import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/user.api.js"; // same as before

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getCurrentUser();
				setUser(data.user);
			} catch (err) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
