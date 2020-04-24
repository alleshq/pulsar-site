const dev = process.env.NODE_ENV === "development";

export default {
	apiUrl: `${dev ? "http://localhost:3000" : "https://pulsar.alles.cx"}/api`,
	fpApiUrl: "https://1api.alles.cx/v1",
	dev
};
