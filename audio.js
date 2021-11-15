let preloads = new Map();

export async function preload(fileName) {
	preloads.set(fileName, await runtime.assets.getMediaFileUrl(fileName));
}
export async function play(fileName) {
	const url = (preloads.has(fileName)? preloads.get(fileName) : await runtime.assets.getMediaFileUrl(fileName));
	let el = new Audio(url);
	el.play();
}