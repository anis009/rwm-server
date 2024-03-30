export const responseObj = (statusCode, message, data = null) => {
	return {
		success: true,
		statusCode: statusCode,
		message: message,
		data: data,
	};
};
