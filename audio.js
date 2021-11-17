let preloads = new Map();

export async function preload(runtime, ...fileNames) {
	for(let fileName of fileNames) {
		preloads.set(fileName, await runtime.assets.getMediaFileUrl(fileName));
	}
}
export async function play(fileName, runtime) {
	let url;
	if(preloads.has(fileName)) {
		url = preloads.get(fileName);
	}
	else if(runtime != null) {
		url = await runtime.assets.getMediaFileUrl(fileName);
	} else {
		throw new Error("Audio is not preloaded and cannot load from runtime");
		return;
	}
	let el = new Audio(url);
	el.play();
}