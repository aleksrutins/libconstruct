let preloads = new Map();

export async function preload(runtime, fileName) {
	preloads.set(fileName, await runtime.assets.getMediaFileUrl(fileName));
}
export async function play(runtime, fileName) {
	const url = (preloads.has(fileName)? preloads.get(fileName) : await runtime.assets.getMediaFileUrl(fileName));
	let el = new Audio(url);
	el.play();
}