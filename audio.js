let preloads = new Map();

async function preload(fileName) {
	preloads.set(fileName, await runtime.assets.getMediaFileUrl(fileName));
}
async function play(fileName) {
	const url = (preloads.has(fileName)? preloads.get(fileName) : await runtime.assets.getMediaFileUrl(fileName));
	let el = new Audio(url);
	el.play();
}