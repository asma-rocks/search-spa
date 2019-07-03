var jukebox = {
	getInfo: function(url) {
		return fetch(url)
			.then(res => res.arrayBuffer())
			.then(buffer => {
				const asap = new ASAP();
				asap.load(url, new Uint8Array(buffer), buffer.byteLength);
				const info = asap.getInfo();
				console.log(info);
				return info;
			});
	},

	playUrl : function(url) {
		return fetch(url)
			.then(res => res.arrayBuffer())
			.then(buffer => asap.playContent(url, new Uint8Array(buffer)));
	},

}
