import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
	return (
		<Toaster
			position="top-center"
			reverseOrder={false}
			toastOptions={{
				duration: 5000,
				style: {
					background: "#fff",
					color: "#363636",
				},
			}}
		/>
	);
};

export default ToastProvider;
