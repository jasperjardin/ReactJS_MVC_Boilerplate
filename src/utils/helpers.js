const helpers = {
	/**
	 * Generate Unique ID: Random 8 digit text string, 11 digit Date string or 19 digit Random text and date string
	 *
	 * @param {String} type
	 * @returns
	 */
	uniqueId: (type = 'complex') => {
		if ('' === type) {
			throw new Error(`Parameter "type" should not be empty.`)
		} else if ('string' !== typeof type) {
			throw new Error(`Parameter "type" accepts "String" only.`)
		} else if ('basic' === type) {
			return Math.random().toString(36).substr(2)
		} else if ('date' === type) {
			return Date.now().toString(36)
		} else if ('complex' === type) {
			return (
				Date.now().toString(36) + Math.random().toString(36).substr(2)
			)
		} else {
			throw new Error(
				`Parameter "type" with value of "${type}" is not valid.`
			)
		}
	},

	/**
	 * Check the data type.
	 *
	 * @param {any} data The data to check
	 * @returns
	 */
	getDataType: (data) => {
		if (typeof data === 'undefined') return 'undefined'
		else if (data === null) return 'null'
		else if (Array.isArray(data)) return 'array'
		else if (typeof data === 'function') return 'function'
		else if (typeof data === 'object') return 'object'
		else if (typeof data === 'boolean') return 'boolean'
		else if (typeof data === 'number') return 'integer'
		else if (typeof data === 'string') return 'string'
		else return 'Unable to define'
	},

	// Not Applicable
	isUndefined: (data) => {
		if (typeof data === 'undefined') return true
		else return false
	},

	// Not Applicable
	varExists: (data) => {
		return !helpers.isUndefined(data)
	},

	/**
	 * Check if the data value is null
	 *
	 * @param {any} data
	 * @returns 		 Returns true if it is null. Otherwise, false.
	 */
	isNull: (data) => {
		if (data === null) return true
		else return false
	},

	/**
	 * Check if the data-type is Function
	 *
	 * @param 	{Function} data The value to check
	 * @returns {Boolean} 		Returns true if it is Function. Otherwise, false.
	 */
	isFunction: (data) => {
		if (typeof data === 'function') return true
		else return false
	},

	/**
	 * Check if the data-type is Array
	 *
	 * @param 	{Array} data 	The value to check
	 * @returns {Boolean} 		Returns true if it is Array. Otherwise, false.
	 */
	isArray: (data) => {
		if (Array.isArray(data)) return true
		else return false
	},

	/**
	 * Check if the data-type is Object
	 *
	 * @param 	{Object} data 	The value to check
	 * @returns {Boolean} 		Returns true if it is Object. Otherwise, false.
	 */
	isObject: (data) => {
		if (typeof data === 'object') return true
		else return false
	},

	/**
	 * Check if the data-type is Boolean
	 *
	 * @param 	{Boolean} data 	The value to check
	 * @returns {Boolean} 		Returns true if it is Boolean. Otherwise, false.
	 */
	isBool: (data) => {
		if (typeof data === 'boolean') return true
		else return false
	},

	/**
	 * Check if the data-type is Integer
	 *
	 * @param 	{Integer} data 	The value to check
	 * @returns {Boolean} 		Returns true if it is Integer. Otherwise, false.
	 */
	isInt: (data) => {
		if (typeof data === 'number') return true
		else return false
	},

	/**
	 * Check if the data-type is String
	 *
	 * @param 	{String} data 	The value to check
	 * @returns {Boolean} 		Returns true if it is String. Otherwise, false.
	 */
	isString: (data) => {
		if (typeof data === 'string') return true
		else return false
	},

	/**
	 * Check if the value of data is set to function, array, object, boolean, number, string and not equal to null.
	 *
	 * @param 	{any} data 	The value to check
	 * @returns {Boolean} 	Returns true if it is set to function, array, object, boolean, number, string and not equal to null. Otherwise, false.
	 */
	isSet: (data) => {
		if (
			data !== null ||
			Array.isArray(data) ||
			typeof data === 'function' ||
			typeof data === 'object' ||
			typeof data === 'boolean' ||
			typeof data === 'number' ||
			typeof data === 'string'
		)
			return true
		else return false
	},

	/**
	 * Check if the data is not empty
	 *
	 * @param 	{any} data 	The value to check
	 * @returns {Boolean} 		Returns true if the value is empty. Otherwise, false.
	 */
	isEmpty: (data) => {
		if (helpers.isSet(data) || data !== '') return true
		else return false
	},

	/**
	 * Checks a number if it is in range.
	 *
	 * @param {Integer} value 		The number to check if in range.
	 * @param {Integer} min 		The minimum range
	 * @param {Integer} max 		The maximum range
	 * @param {Boolean} returnValue Whether to return value or check if number is in range.
	 * @returns 					Returns range if returnValue is set to true. Otherwise, return boolean.
	 */
	intRange: (value, min, max, returnValue = false) => {
		// Calculate the number is within the inclusive min and max number
		let range = Math.min(Math.max(value, min), max)

		// Check if returnValue is boolean
		if ('boolean' !== typeof returnValue) returnValue = false

		// If range is NaN return
		if (isNaN(range)) return

		if (returnValue) {
			return range
		} else {
			min = parseInt(min)
			max = parseInt(max)

			return range >= min || range <= max ? true : false
		}
	},

	/**
	 * Finds nearest decending number value in every item of an Object with sub-object or Array with sub-object
	 *
	 * @param {Object|Array} data 	The Object with sub-object or Array with sub-object as items
	 * @param {String} key			The property name to be search in every sub-object of an {data}
	 * @param {Number} value		The value of the property to be search in every sub-object of an {data}
	 * @param {String} operator		The Operator to control the nearest number. Allowed {<} or {<=} sign
	 * @returns						Returns an object which is an item from {data}
	 */
	findClosestInt: (data, key = '', value, operator = '<') => {
		if ('string' !== typeof key || 'number' !== typeof value) return

		// By default that will be a big number
		let closestValue = Infinity

		// We will store the index of the element
		let closestIndex = -1

		// The allowed operators for the operator variable
		let operators = {
			'<=': (a, b) => {
				return a <= b
			},
			'<': (a, b) => {
				return a < b
			},
		}

		if (Array.isArray(data)) {
			if (Array.prototype.map) {
				data.map((item, index) => {
					var diff = Math.abs(item[key] - value)
					if (operators[operator](diff, closestValue)) {
						closestValue = diff
						closestIndex = index
					}
				})
			} else {
				for (var index = 0; index < data.length; ++index) {
					var diff = Math.abs(data[index][key] - value)
					if (operators[operator](diff, closestValue)) {
						closestValue = diff
						closestIndex = index
					}
				}
			}

			return data[closestIndex]
		}

		if ('object' === typeof data) {
			for (const prop in data) {
				var diff = Math.abs(data[prop][key] - value)

				if (operators[operator](diff, closestValue)) {
					closestValue = diff
					closestIndex = prop
				}
			}

			return data[closestIndex]
		}
	},

	/**
	 * Wrapper function for Object.keys() which support backwards compatability.
	 *
	 * @param 	{Object}  object 		The object of which the enumerable's own properties are to be returned.
	 * @param 	{Boolean} maintainOrder Whether to maintain the original order of properties in the object.
	 * @returns {Object}  result		An object of strings that represent all the enumerable properties of the given object.
	 */
	objectKeys: (object, maintainOrder = true) => {
		if (typeof object !== 'object') return

		// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
		if (!Object.keys) {
			Object.keys = (function () {
				'use strict'

				var hasOwnProperty = Object.prototype.hasOwnProperty,
					hasDontEnumBug = !{ toString: null }.propertyIsEnumerable(
						'toString'
					),
					dontEnums = [
						'toString',
						'toLocaleString',
						'valueOf',
						'hasOwnProperty',
						'isPrototypeOf',
						'propertyIsEnumerable',
						'constructor',
					],
					dontEnumsLength = dontEnums.length

				return function (obj) {
					if (
						typeof obj !== 'function' &&
						(typeof obj !== 'object' || obj === null)
					) {
						throw new TypeError('Object.keys called on non-object')
					}

					var result = [],
						prop,
						i

					for (prop in obj) {
						if (hasOwnProperty.call(obj, prop)) {
							result.push(prop)
						}
					}

					if (hasDontEnumBug) {
						for (i = 0; i < dontEnumsLength; i++) {
							if (hasOwnProperty.call(obj, dontEnums[i])) {
								result.push(dontEnums[i])
							}
						}
					}

					if (maintainOrder) result.reverse()

					return result
				}
			})()
		} else {
			let result = Object.keys(object)

			if (maintainOrder) result.reverse()

			return result
		}
	},

	/**
	 * Returns a new object with the values at each key mapped using callback as a callback function.
	 *
	 * @param 	{Object} object		The Object to be map
	 * @param 	{Function} callback	The function to be used as callback
	 * @returns {Object} result		Returns a new object with the values at each key mapped.
	 */
	objectMap: (object, callback) => {
		return helpers.objectKeys(object).reduce((result, key) => {
			result[key] = callback(object, key)
			// result[key] = callback(object[key], key)
			return result
		}, {})
	},

	/**
	 * Using ES6 to count the total number of object properties.
	 *
	 * @param 	{Object} object 	The object to count
	 * @returns {Integer|Boolean} 	Returns the total number of properties of an object. Otherwise, false.
	 */
	objectLengthModern: (object) => {
		if (helpers.isObject(object)) return Object.keys(object).length
		else return false
	},

	/**
	 * Using legacy JavaScript to count the total number of object properties.
	 *
	 * @param 	{Object} object 	The object to count
	 * @returns {Integer|Boolean} 	Returns the total number of properties of an object. Otherwise, false.
	 */
	objectLengthLegacy: (object) => {
		if (helpers.isObject(object)) {
			var length = 0
			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					++length
				}
			}
			return length
		} else {
			return false
		}
	},

	/**
	 * Count the total number of object properties.
	 *
	 * @param 	{Object} object 	The object to count
	 * @returns {Integer|Boolean} 	Returns the total number of properties of an object. Otherwise, false.
	 */
	objectLength: (object) => {
		if (helpers.isObject(object))
			return Object.keys(object)
				? helpers.objectLengthModern(object)
				: helpers.objectLengthLegacy(object)
	},

	/**
	 * Count the total number of object properties or an array items.
	 *
	 * @param 	{Object|Array} object 	The object or array to count
	 * @returns {Integer|Boolean} 		Returns the total number of properties of an object or items in an array. Otherwise, false.
	 */
	checkLength: (data) => {
		if (helpers.isArray(data)) return data.length
		else if (helpers.isObject(data)) return helpers.objectLength(data)
		else return false
	},

	/**
	 * Fetch object property value using property name. Otherwise, set fallback value if it does not exists.
	 *
	 * @param {Object}  object   The object to examine
	 * @param {String}  name 	 The property name
	 * @param {any} 	fallback The fallback value
	 *
	 * @returns {any}	Returns property value if property name exists. Otherwise, return the fallback value
	 */
	getPropExists: (object = {}, name = '', fallback = '') => {
		if (
			!helpers.isObject(object) &&
			!helpers.isEmpty(name) &&
			!helpers.isEmpty(fallback)
		)
			return

		if (object.hasOwnProperty(name)) {
			return object[name]
		} else {
			return fallback
		}
	},

	/**
	 * Fetch object property or nested property using ES6.
	 *
	 * @usage helpers.getProp({prop1:{prop2:{prop3:'propVal'}} }, 'prop1', 'prop2', 'prop3')
	 *
	 * @shorthand {2019-10-17} allow you to safely access deeply nested properties, by using the token '?.',
	 * 			  the new optional chaining operator:
	 *
	 * 			  Fetch property: obj?.prop1?.prop2?.prop3
	 * 			  Method call: obj?.level1?.method_name();
	 *
	 * @param {Object} obj 			The Object where to fetch the property
	 * @param  {...String} args 	The nested propery names to access using JS 'spread or rest operator'
	 *
	 * @returns {any}		The object property value
	 */
	getProp: (obj, ...args) => {
		return args.reduce((obj, level) => obj && obj[level], obj)
	},

	/**
	 * Check if an object property or nested property exist.
	 *
	 * @usage helpers.checkProp({prop1:{prop2:{prop3:'propVal'}} }, 'prop1', 'prop2', 'prop3')
	 *
	 * @param {Object} obj 			The Object where to fetch the property
	 * @param  {...String} level 	The name of direct child propery to access.
	 * @param  {...String} rest 	The nested propery names to access using JS 'spread or rest operator'
	 *
	 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
	 *
	 * @returns {Boolean}			Returns true if property exist. Otherwise, false.
	 */
	checkProp: (obj, level, ...rest) => {
		if (obj === undefined) return false
		if (rest.length == 0 && obj.hasOwnProperty(level)) return true
		return helpers.checkProp(obj[level], ...rest)
	},

	/**
	 * Extracts object properties or array items to individual variables
	 *
	 * @param {Array|Object} collection     An array or object
	 * @param {Object}       dest           Contains the globalThis JavaScript object
	 *
	 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
	 *
	 * @returns void
	 */
	extract: (collection, dest = globalThis) => {
		if (!helpers.isArray(collection) || !helpers.isObject(collection))
			return

		for (const [k, v] of Object.entries(collection)) {
			dest[k] = v
		}
	},

	/**
	 * Returns a new array with the values at each key mapped using callback as a callback function.
	 * Wrapper function for Array.prototype.map()
	 *
	 * @param 	{Array} 	data		The array to be map
	 * @param 	{Function}  callback	The function to be used as callback
	 * @link	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
	 * @returns {Array}		result		Returns a new array with the values at each key mapped.
	 */
	arrayMap: (data, callback) => {
		// Production steps of ECMA-262, Edition 5, 15.4.4.19
		// Reference: https://es5.github.io/#x15.4.4.19
		if (!Array.prototype.map) {
			Array.prototype.map = function (callback /*, thisArg*/) {
				var T, A, k

				if (this == null) {
					throw new TypeError('this is null or not defined')
				}

				// 1. Let O be the result of calling ToObject passing the |this|
				//    value as the argument.
				var O = Object(this)

				// 2. Let lenValue be the result of calling the Get internal
				//    method of O with the argument "length".
				// 3. Let len be ToUint32(lenValue).
				var len = O.length >>> 0

				// 4. If IsCallable(callback) is false, throw a TypeError exception.
				// See: https://es5.github.com/#x9.11
				if (typeof callback !== 'function') {
					throw new TypeError(callback + ' is not a function')
				}

				// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if (arguments.length > 1) {
					T = arguments[1]
				}

				// 6. Let A be a new array created as if by the expression new Array(len)
				//    where Array is the standard built-in constructor with that name and
				//    len is the value of len.
				A = new Array(len)

				// 7. Let k be 0
				k = 0

				// 8. Repeat, while k < len
				while (k < len) {
					var kValue, mappedValue

					// a. Let Pk be ToString(k).
					//   This is implicit for LHS operands of the in operator
					// b. Let kPresent be the result of calling the HasProperty internal
					//    method of O with argument Pk.
					//   This step can be combined with c
					// c. If kPresent is true, then
					if (k in O) {
						// i. Let kValue be the result of calling the Get internal
						//    method of O with argument Pk.
						kValue = O[k]

						// ii. Let mappedValue be the result of calling the Call internal
						//     method of callback with T as the this value and argument
						//     list containing kValue, k, and O.
						mappedValue = callback.call(T, kValue, k, O)

						// iii. Call the DefineOwnProperty internal method of A with arguments
						// Pk, Property Descriptor
						// { Value: mappedValue,
						//   Writable: true,
						//   Enumerable: true,
						//   Configurable: true },
						// and false.

						// In browsers that support Object.defineProperty, use the following:
						// Object.defineProperty(A, k, {
						//   value: mappedValue,
						//   writable: true,
						//   enumerable: true,
						//   configurable: true
						// });

						// For best browser support, use the following:
						A[k] = mappedValue
					}
					// d. Increase k by 1.
					k++
				}

				// 9. return A
				return A
			}
		}

		return data.map((result, index) => {
			result[index] = callback(data, index)
			// result[index] = callback(object[index], index)
			return result
		})
	},

	/**
	 * Merge arrays or objects
	 *
	 * @param 	{Array|Object} 	arguments The array or object to be map
	 *
	 * @demo var $arr1 = {"color": "red", 0: 2, 1: 4}
	 *       var $arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
	 *       helpers.arrayMerge($arr1, $arr2)
	 *       returns: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
	 *
	 * @demo var $arr1 = []
	 *       var $arr2 = {1: "data"}
	 *       pmt_array_merge($arr1, $arr2)
	 *       returns: {0: "data"}
	 */
	arrayMerge: (...datas) => {
		const args = Array.prototype.slice.call(datas)
		const argl = args.length
		let arg
		const retObj = {}
		let k = ''
		let argil = 0
		let j = 0
		let i = 0
		let ct = 0
		const toStr = Object.prototype.toString
		let retArr = true

		// loop the argl
		for (i = 0; i < argl; i++) {
			// check if args is not '[object Array]'
			if (toStr.call(args[i]) !== '[object Array]') {
				retArr = false
				break
			}
		}

		// If retArr is true
		if (retArr) {
			// Set value to empty array
			retArr = []

			// Loop the argl and contatinate the args value to retArr
			for (i = 0; i < argl; i++) {
				retArr = retArr.concat(args[i])
			}
			return retArr
		}

		for (i = 0, ct = 0; i < argl; i++) {
			arg = args[i]

			if (toStr.call(arg) === '[object Array]') {
				for (j = 0, argil = arg.length; j < argil; j++) {
					retObj[ct++] = arg[j]
				}
			} else {
				for (k in arg) {
					if (arg.hasOwnProperty(k)) {
						if (parseInt(k, 10) + '' === k) {
							retObj[ct++] = arg[k]
						} else {
							retObj[k] = arg[k]
						}
					}
				}
			}
		}

		return retObj
	},

	/**
	 * Check if an two array are the same.
	 *
	 * @param {Array|Object}  a1 The first array.
	 * @param {Array}} a2 The second array.
	 *
	 * @returns {Bool}  Returns true is the arrays are the same. Otherwise, false
	 */
	arrayCompare: (a1, a2) => {
		if (a1.length != a2.length) return false

		let length = a2.length

		for (let i = 0; i < length; i++) {
			if (a1[i] !== a2[i]) return false
		}

		return true
	},

	/**
	 * Using old JS checks if an array key exists in the array.
	 *
	 * @param {String} keyword        The keyword to search in collection array
	 * @param {Array}  collection     The array collection
	 *
	 * @returns {Bool}  Returns true is the key exists in array. Otherwise, false
	 */
	inArrayLegacy: (keyword = '', collection = []) => {
		let length = collection.length

		for (let i = 0; i < length; i++) {
			if (typeof collection[i] == 'object') {
				if (helpers.arrayCompare(collection[i], keyword)) return true
			} else {
				if (collection[i] == keyword) return true
			}
		}
		return false
	},

	/**
	 * Using ES6 checks if an array key exists in the array.
	 *
	 * @param {String} keyword        The keyword to search in collection array
	 * @param {Array}  collection     The array collection
	 *
	 * @returns {Bool}  Returns true is the key exists in array. Otherwise, false
	 */
	inArrayModern: (keyword = '', collection = []) => {
		if (!helpers.isArray(collection) && !helpers.isEmpty(keyword))
			return false

		if (collection.includes(keyword)) return true
		else return false
	},

	/**
	 * Checks if an array key exists in the array.
	 *
	 * @param {String} keyword        The keyword to search in collection array
	 * @param {Array}  collection     The array collection
	 *
	 * @returns {Bool}  Returns true is the key exists in array. Otherwise, false
	 */
	inArray: (keyword = '', collection = []) => {
		return helpers.inArrayModern(keyword, collection)
	},

	/**
	 * Merge Strings
	 *
	 * @param   {String|Array} args    The words to merge
	 *
	 * @returns {String} words
	 */
	stringMerge: (...args) => {
		let words = ''

		for (var i = 0; i < args.length; i++) {
			if (!helpers.isEmpty(args[i])) {
				if (helpers.isArray(args[i])) var collection = args[i]
				for (var x = 0; x < collection.length; x++)
					words += ' ' + collection[i]

				if (helpers.isString(args[i])) words += ' ' + args[i]
			}
		}

		return words
	},

	/**
	 * Checks if a string has whitespace
	 * @param {String}   text	The string to check.
	 * @returns {Boolean}		Returns true if has whitespace. Otherwise, false
	 */
	hasWhiteSpace: (text) => {
		if (typeof text !== 'string') return false

		return /\s/.test(text)
	},

	/**
	 * Checks if a URL is a valid URL.
	 *
	 * @param {String} url 				The URL to validate.
	 * @param {Boolean} allowElementID 	Wether to allow Element ID.
	 * @returns 						Returns true if it is a valid URL. Otherwise, false.
	 */
	isValidURL: (url, allowElementID = true) => {
		var res = url.match(
			/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
		)

		// Check if it has a hash element ID
		if (allowElementID && url.indexOf('#') != -1) {
			res = true
		}

		return res !== null
	},

	/**
	 * Get URL parameter from the current page
	 *
	 * @param   {String} param    The URL parameter
	 *
	 * @returns {String|Boolean}  Returns the value of the URL parameter if exists. Otherwise, false.
	 */
	getURLParam: (param = '') => {
		if (helpers.isEmpty(param)) {
			return
		}

		let url = window.location.search.substring(1),
			url_var = url.split('&'),
			param_name,
			index

		for (index = 0; index < url_var.length; index++) {
			param_name = url_var[index].split('=')

			if (param === param_name[0]) {
				return typeof param_name[1] === undefined
					? true
					: decodeURIComponent(param_name[1])
			}
		}

		return false
	},

	/**
	 * A simple variable operator function
	 *
	 * @usage 	helpers.calculate( '+', 10, 20) or
	 * 			helpers.calculate('-', 10, 20)
	 *
	 * @param {String}  operator 	The operator sign
	 * @param {Integer} a 			The 1st number to calculate
	 * @param {Integer} b 			The 2nd number to calculate
	 *
	 * @returns {Integer}			The calculation result
	 */
	calculate: (operator, a, b) => {
		if (!operator && typeof callback !== 'string') return
		if (!a && typeof a !== 'number') return
		if (!b && typeof b !== 'number') return

		let operation = {
			'+': function (a, b) {
				return a + b
			},
			'-': function (a, b) {
				return a - b
			},
		}

		return operation[operator](a, b)
	},

	/**
	 * Execute Load Event Listener
	 * @param {function} 		callback  The function to execute
	 * @param {String}   		eventType A case-sensitive string representing the event type to listen for.
	 * @param {Integer|String}  refresh   The setTimeout() refresh time. If set to 'none' no setTimeout() to use.
	 * @param {String}   		option	  An object that specifies characteristics about the event listener.
	 * @see   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
	 */
	eventHandler: (callback, eventType, refresh = 50, option = false) => {
		// Make sure a valid callback was provided
		if (!callback || typeof callback !== 'function') return

		if ('' === callback || typeof eventType !== 'string') return

		// Setup eventHandler variable
		let eventHandler

		// Listen for event
		window.addEventListener(
			eventType,
			function (e) {
				// Clear our timeout throughout the event
				window.clearTimeout(eventHandler)

				if ('none' === refresh) {
					eventHandler = callback()
				} else {
					// Set a timeout to run after event ends
					eventHandler = setTimeout(callback, refresh)
				}
			},
			option
		)
	},

	/**
	 * Execute Load Event Listener
	 * @param {function} 		callback  The function to execute
	 * @param {Integer|String}  refresh   The setTimeout() refresh time. If set to 'none' no setTimeout() to use.
	 * @param {String}   		option	  An object that specifies characteristics about the event listener.
	 * @see   helpers.eventHandler()
	 */
	onLoad: (callback, refresh = 50, option = false) => {
		helpers.eventHandler(callback, 'load', refresh, option)
	},

	/**
	 * Execute Scroll Event Listener
	 * @param {function} 		callback  The function to execute
	 * @param {Integer|String}  refresh   The setTimeout() refresh time. If set to 'none' no setTimeout() to use.
	 * @param {String}   		option	  An object that specifies characteristics about the event listener.
	 * @see   helpers.eventHandler()
	 */
	onScroll: (callback, refresh = 50, option = false) => {
		helpers.eventHandler(callback, 'scroll', refresh, option)
	},

	/**
	 * Execute Resize Event Listener
	 * @param {function} 		callback  The function to execute
	 * @param {Integer|String}  refresh   The setTimeout() refresh time. If set to 'none' no setTimeout() to use.
	 * @param {String}   		option	  An object that specifies characteristics about the event listener.
	 * @see   helpers.eventHandler()
	 */
	onResize: (callback, refresh = 50, option = false) => {
		helpers.eventHandler(callback, 'resize', refresh, option)
	},

	/**
	 * Get the root parents of element
	 * @param 	{String|Object} selector 	   The element selector string or document.querySelector() object
	 * @param 	{String|Object} parentSelector The parent element selector string or document.querySelector() object
	 * @returns {Array}			parents	 	   The root parentNode list.
	 */
	getParents: (selector, parentSelector) => {
		if (parentSelector === undefined) {
			parentSelector = document
		}

		if (typeof selector !== 'string' || selector === '') return false
		if (typeof parentSelector !== 'string' || parentSelector === '')
			return false

		var parents = []
		var p = {}

		if (selector instanceof Element) {
			p = selector.parentNode
		} else if (typeof selector === 'string') {
			p = document.querySelector(selector).parentNode
		}

		if (typeof parentSelector === 'string') {
			parentSelector = document.querySelector(parentSelector)
		}

		while (p !== parentSelector) {
			var o = p
			parents.push(o)
			p = o.parentNode
		}

		parents.push(parentSelector)

		return parents
	},

	/**
	 * Get the main parent of element
	 * @param 	{String|Object} selector The element selector string or document.querySelector() object
	 * @returns {Array}			list	 The parentNode list.
	 */
	getParent: (selector) => {
		if (typeof selector !== 'string' || selector === '') return false

		let current = {},
			list = []

		if (selector instanceof Element) {
			current = selector
		} else if (typeof selector === 'string') {
			current = document.querySelector(selector)
		}

		while (
			current.parentNode != null &&
			current.parentNode != document.documentElement
		) {
			list.push(current.parentNode)
			current = current.parentNode
		}

		return list
	},

	/**
	 * Check if DOM element exists
	 * @param {Object|String} selector   An element or a CSS selector string
	 * @see   https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
	 */
	elemExists: (selector) => {
		if (selector instanceof Element) {
			if (typeof selector != 'undefined' && selector != null) {
				return true
			}
		} else if (typeof selector === 'string') {
			if (!helpers.hasWhiteSpace(selector)) {
				selector = document.querySelector(selector)

				if (typeof selector != 'undefined' && selector != null) {
					return true
				}
			}
		}

		return false
	},

	/**
	 * Check if class exists to an element
	 * @param {Object|String} selector   An element or a CSS selector string
	 * @param {String}        classNames The class name
	 * @see   https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
	 */
	hasClass: (selector, classNames) => {
		if (typeof classNames !== 'string' || classNames === '') return false

		if (selector instanceof Element) {
			if (helpers.hasWhiteSpace(classNames)) {
				classNames.split(' ').map((selectorClass) => {
					return selector.classList.contains(selectorClass)
				})
			} else {
				return selector.classList.contains(classNames)
			}
		} else if (typeof selector === 'string') {
			if (helpers.hasWhiteSpace(classNames)) {
				let classExist = false

				classNames.split(' ').map((selectorClass) => {
					let check = document
						.querySelector(selector)
						.classList.contains(selectorClass)

					if (check && 'undefined' !== check) {
						classExist = true
					}
				})

				return classExist
			} else {
				return document
					.querySelector(selector)
					.classList.contains(classNames)
			}
		}
	},

	/**
	 * Add a class to an element
	 * @param {Object|String} selector   An element or a CSS selector string
	 * @param {String}        classNames The class name
	 * @see   https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
	 */
	addClass: (selector, classNames) => {
		if (typeof classNames !== 'string' || classNames === '') return false

		if (selector instanceof Element) {
			if (helpers.hasWhiteSpace(classNames)) {
				classNames.split(' ').map((selectorClass) => {
					selector.classList.add(selectorClass)
				})
			} else {
				selector.classList.add(classNames)
			}
		} else if (typeof selector === 'string') {
			if (helpers.hasWhiteSpace(classNames)) {
				classNames.split(' ').map((selectorClass) => {
					document
						.querySelector(selector)
						.classList.add(selectorClass)
				})
			} else {
				document.querySelector(selector).classList.add(classNames)
			}
		}
	},

	/**
	 * Remove a class to an element
	 * @param {Object|String} selector   An element or a CSS selector string
	 * @param {String}        classNames The class name
	 * @see   https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
	 */
	removeClass: (selector, classNames) => {
		if (typeof classNames !== 'string' || classNames === '') return false

		if (selector instanceof Element) {
			if (helpers.hasWhiteSpace(classNames)) {
				classNames.split(' ').map((selectorClass) => {
					selector.classList.remove(selectorClass)
				})
			} else {
				selector.classList.remove(classNames)
			}
		} else if (typeof selector === 'string') {
			if (helpers.hasWhiteSpace(classNames)) {
				classNames.split(' ').map((selectorClass) => {
					document
						.querySelector(selector)
						.classList.remove(selectorClass)
				})
			} else {
				document.querySelector(selector).classList.remove(classNames)
			}
		}
	},
}

export default helpers