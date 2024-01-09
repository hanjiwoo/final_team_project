import { toast } from "react-toastify";

const ToastComponent = () => <div>blabla~~</div>;

export const Toast = () =>
	toast(<ToastComponent />, {
		autoClose: 2000,
		hideProgressBar: true,
		progress: undefined,
	});
