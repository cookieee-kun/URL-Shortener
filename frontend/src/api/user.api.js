import axiosInstance from "./apiClient.js"

export const getCurrentUser = async () => {
	const { data } = await axiosInstance.get("/auth/me")
	return data
}