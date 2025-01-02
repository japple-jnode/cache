/*
JustCache
v.1.0.0

Simple cache system for Node.js.

by JustNode Dev Team / JustApple
*/

//cacher
class Cacher {
	constructor(data = new Map(), timeout = 600000) {
		this.data = data; //orginal data
		this.timeout = timeout; //default timeout
		this.timeoutMap = new Map(); //timeout map
	}
	
	//set or create data
	set(id, value) {
		this.data.set(id, value); //set data
		this.setTimeout(id); //set new timeout
		return value;
	}
	
	//edit exist data
	edit(id, value) {
		if (this.data.has(id)) {
			return this.set(id, value);
		}
	}
	
	//check if data exists
	check(id) {
		return this.data.has(id);
	}
	
	//get or fetch data
	async get(id, ifNone) {
		if (!this.data.has(id)) this.data.set(id, await ifNone(id));
		this.setTimeout(id); //set new timer
		return this.data.get(id);
	}
	
	//set timer
	setTimeout(id) {
		//no timeout
		if (this.timeout === 0) return;
		
		//clear old timer
		clearTimeout(id);
		
		//set timer
		const timer = setTimeout(() => {
			this.data.delete(id); //delete data
			this.timeoutMap.delete(id); //delete timer
		}, this.timeout);
		
		//save timer to map
		this.timeoutMap.set(id, timer);
	}
	
	//clear timer
	clearTimeout(id) {
		if (this.timeoutMap.has(id)) {
			clearTimeout(this.timeoutMap.get(id)); //clear timeout
			this.timeoutMap.delete(id); //delete timer
		}
	}
}

module.exports = Cacher;