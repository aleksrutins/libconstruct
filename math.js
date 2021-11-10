/**
 * Calculates a linear interpolation.
 * @param {number} x 
 * @param {number} y 
 * @param {number} t 
 * @returns 
 */
export function lerp(x, y, t) {
	return x*t + y*(1-t);
}

/**
 * Calculates the angle from one point to another.
 * @param {{x: number, y: number}} origin 
 * @param {{x: number, y: number}} target 
 * @returns {number}
 */
export function angleTo(origin, target) {
    return Math.atan2(target.y - origin.y, target.x - origin.x);
} 