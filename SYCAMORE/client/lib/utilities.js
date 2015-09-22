// utility functions accessible to all client code

Utilities = {
	encodeURIParameters: function(data) {
		return Object.keys(data).map(function(key) {
			return [key, data[key]].map(encodeURIComponent).join("=");
		}).join("&");
	}
};