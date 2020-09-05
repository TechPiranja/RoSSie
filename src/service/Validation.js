class Validation {
	validURL(str) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		console.log("Pattern is: " + regexp.test(str));
		return regexp.test(str);
	}
}

const Validator = new Validation();

export default Validator;
