/*
    Author: @pyonic
    Neuron.Js -> Multi layer Perceptron
    Network contains 3 hidden layers
*/

function sigmoid(x) {
	return (1 / (1 + Math.exp(-x))).toFixed(5);
}

function rounded(number) {
	return +number.toFixed(5);
}

function dif(y) {
	return (y * (1 - y)).toFixed(5);
}

function findMaxMin(array) {
	min = max = array[0];
	for (a = 0; a < array.length; a++) {
		if (array[a] < min) min = array[a];
		if (array[a] > max) max = array[a];
	}
	result = [max, min];
	return result;
}

function Neuron(ic, fhc, shc, thc, oc, isBigData) {
	this.ic = ic;
	this.fhc = fhc;
	this.shc = shc;
	this.thc = thc;
	this.oc = oc;
	/*Create weights between input layer and first hidden layer*/
	this.weights = [[0]];
	this.sweights = [[0]];
	this.tweights = [[0]];
	this.fweights = [[0]];
	for (a = 0; a < this.ic; a++) {
		this.weights.push([0]);
	}
	for (a = 0; a < this.fhc; a++) {
		this.sweights.push([0]);
	}
	for (a = 0; a < this.shc; a++) {
		this.tweights.push([0]);
	}
	for (a = 0; a < this.thc; a++) {
		this.fweights.push([0]);
	}
	/*Filling random numbers into weights*/
	for (a = 0; a < this.fhc; a++) {
		for (b = 0; b < this.ic; b++) {
			this.weights[a][b] = Math.random().toFixed(5); //toFixed(5)-> 0.12345|
			if (isBigData) {
				if (this.weights[a][b] > 0.5 && this.weights[a][b] < 0.6)
					this.weights[a][b] -= 0.6;
				if (this.weights[a][b] > 0.6 && this.weights[a][b] < 0.7)
					this.weights[a][b] -= 0.7;
				if (this.weights[a][b] > 0.7 && this.weights[a][b] < 0.9)
					this.weights[a][b] -= 0.9;
				if (this.weights[a][b] > 0.9) this.weights[a][b] -= 0.9;
			}
			this.weights[a][b] *= 1;
		}
	}
	for (a = 0; a < this.shc; a++) {
		for (b = 0; b < this.fhc; b++) {
			this.sweights[a][b] = Math.random().toFixed(5); //toFixed(5)-> 0.12345|
			if (isBigData) {
				if (this.sweights[a][b] > 0.5 && this.sweights[a][b] < 0.6)
					this.sweights[a][b] -= 0.6;
				if (this.sweights[a][b] > 0.6 && this.sweights[a][b] < 0.7)
					this.sweights[a][b] -= 0.7;
				if (this.sweights[a][b] > 0.7 && this.sweights[a][b] < 0.9)
					this.sweights[a][b] -= 0.9;
				if (this.sweights[a][b] > 0.9) this.sweights[a][b] -= 0.9;
			}
			this.sweights[a][b] *= 1;
		}
	}
	for (a = 0; a < this.thc; a++) {
		for (b = 0; b < this.shc; b++) {
			this.tweights[a][b] = Math.random().toFixed(5); //toFixed(5)-> 0.12345|
			if (isBigData) {
				if (this.tweights[a][b] > 0.5 && this.tweights[a][b] < 0.6)
					this.tweights[a][b] -= 0.6;
				if (this.tweights[a][b] > 0.6 && this.tweights[a][b] < 0.7)
					this.tweights[a][b] -= 0.7;
				if (this.tweights[a][b] > 0.7 && this.tweights[a][b] < 0.9)
					this.tweights[a][b] -= 0.9;
				if (this.tweights[a][b] > 0.9) this.tweights[a][b] -= 0.9;
			}
			this.tweights[a][b] *= 1;
		}
	}
	for (a = 0; a < this.oc; a++) {
		for (b = 0; b < this.thc; b++) {
			this.fweights[a][b] = Math.random().toFixed(5); //toFixed(5)-> 0.12345|
			if (isBigData) {
				if (this.fweights[a][b] > 0.5 && this.fweights[a][b] < 0.6)
					this.fweights[a][b] -= 0.6;
				if (this.fweights[a][b] > 0.6 && this.fweights[a][b] < 0.7)
					this.fweights[a][b] -= 0.7;
				if (this.fweights[a][b] > 0.7 && this.fweights[a][b] < 0.9)
					this.fweights[a][b] -= 0.9;
				if (this.fweights[a][b] > 0.9) this.fweights[a][b] -= 0.9;
			}
			this.fweights[a][b] *= 1;
		}
	}
	/*Weights picked up*/
	/*Show weights*/
	Neuron.prototype.showWeights = function () {
		for (a = 0; a < this.fhc; a++) {
			for (b = 0; b < this.ic; b++) {
				document.write("[", this.weights[a][b], "] ");
			}
			document.write("<br />");
		}
		document.write("<br />");
		for (a = 0; a < this.shc; a++) {
			for (b = 0; b < this.fhc; b++) {
				document.write("[", this.sweights[a][b], "] ");
			}
			document.write("<br />");
		}
		document.write("<br />");
		for (a = 0; a < this.thc; a++) {
			for (b = 0; b < this.shc; b++) {
				document.write("[", this.tweights[a][b], "] ");
			}
			document.write("<br />");
		}
		document.write("<br />");
		for (a = 0; a < this.oc; a++) {
			for (b = 0; b < this.thc; b++) {
				document.write("[", this.fweights[a][b], "] ");
			}
			document.write("<br />");
		}
	};
	Neuron.prototype.feedForeward = function (input) {
		this.input = input;
		this.hidden = [];
		this.shidden = [];
		this.thidden = [];
		this.output = [];
		/*Создаем массивы для хранения значений скрытых слоев*/
		for (a = 0; a < this.fhc; a++) {
			this.hidden.push(0);
		}
		for (a = 0; a < this.shc; a++) {
			this.shidden.push(0);
		}
		for (a = 0; a < this.thc; a++) {
			this.thidden.push(0);
		}
		for (a = 0; a < this.oc; a++) {
			this.output.push(0);
		}
		//Input - > First Hidden
		for (a = 0; a < this.fhc; a++) {
			for (b = 0; b < this.ic; b++) {
				this.hidden[a] += this.input[b] * this.weights[a][b];
				this.hidden[a] = rounded(this.hidden[a]);
			}
			this.hidden[a] = sigmoid(this.hidden[a]);
		}
		//document.write("<br />First Hidden Layer: <br/>",this.hidden);
		//F.Hidden - > Second Hidden
		for (a = 0; a < this.shc; a++) {
			for (b = 0; b < this.fhc; b++) {
				this.shidden[a] += this.hidden[b] * this.sweights[a][b];
				this.shidden[a] = rounded(this.shidden[a]);
			}
			this.shidden[a] = sigmoid(this.shidden[a]);
		}
		//document.write("<br />Second Hidden Layer: ",this.shidden)
		//S.Hidden -> Third Hidden
		for (a = 0; a < this.thc; a++) {
			for (b = 0; b < this.shc; b++) {
				this.thidden[a] += this.shidden[b] * this.tweights[a][b];
				this.thidden[a] = rounded(this.thidden[a]);
			}
			this.thidden[a] = sigmoid(this.thidden[a]);
		}
		//document.write("<br />Third Hidden Layer: ",this.thidden)
		//T.Hidden -> Output
		for (a = 0; a < this.oc; a++) {
			for (b = 0; b < this.thc; b++) {
				this.output[a] += this.thidden[b] * this.fweights[a][b];
				this.output[a] = rounded(this.output[a]);
			}
			this.output[a] = sigmoid(this.output[a]);
		}
		//document.write("<br />Output: ",this.output)
		return this.output;
	};
	Neuron.prototype.findErrors = function (right) {
		this.rightAnswer = right;
		this.outerror = []; //Ошибка выходного слоя
		this.terror = []; //Ошибка третьего скрытого слоя
		this.serror = []; //Ошибка второго скрытого слоя
		this.ferror = []; //Ошибка первого скрытого слоя
		for (a = 0; a < this.oc; a++) this.outerror.push(0);
		for (a = 0; a < this.thc; a++) this.terror.push(0);
		for (a = 0; a < this.shc; a++) this.serror.push(0);
		for (a = 0; a < this.fhc; a++) this.ferror.push(0);
		//Находим ошибку выходного слоя
		for (a = 0; a < this.oc; a++) {
			this.outerror[a] = rounded(this.rightAnswer[a] - this.output[a]);
		}
		//document.write("<br />Out error: ",this.outerror)
		for (a = 0; a < this.thc; a++) {
			for (b = 0; b < this.oc; b++) {
				this.terror[a] += this.outerror[b] * this.fweights[b][a];
				this.terror[a] = rounded(this.terror[a]);
			}
		}
		//document.write("<br />Third Hidden error: ",this.terror)
		//!!!!!Найти ошибку второго скрытого слоя!!!
		for (a = 0; a < this.shc; a++) {
			for (b = 0; b < this.thc; b++) {
				this.serror[a] += this.terror[b] * this.sweights[b][a];
				this.serror[a] = rounded(this.serror[a]);
			}
		}
		//document.write("<br />Second Hidden error: ",this.serror)
		for (a = 0; a < this.fhc; a++) {
			for (b = 0; b < this.shc; b++) {
				this.ferror[a] += this.serror[b] * this.weights[b][a];
				this.ferror[a] = rounded(this.ferror[a]);
			}
		}
		//document.write("<br />First Hidden error: ",this.ferror)
	};
	//Updating weights
	Neuron.prototype.updateWeights = function (k) {
		this.learn = k;
		//Веса между выходом и третьим скрытым слоем
		for (a = 0; a < this.oc; a++) {
			for (b = 0; b < this.thc; b++) {
				this.fweights[a][b] *= 1;
				this.fweights[a][b] +=
					this.learn *
					this.outerror[a] *
					dif(this.output[a]) *
					this.thidden[b];
				this.fweights[a][b] = rounded(this.fweights[a][b]);
			}
		}
		//Веса между вторым и третьим слоем
		for (a = 0; a < this.thc; a++) {
			for (b = 0; b < this.shc; b++) {
				this.tweights[a][b] *= 1;
				this.tweights[a][b] +=
					this.learn *
					this.terror[a] *
					dif(this.thidden[a]) *
					this.shidden[b];
				this.tweights[a][b] = rounded(this.tweights[a][b]);
			}
		}
		//Веса между первым и вторым
		for (a = 0; a < this.shc; a++) {
			for (b = 0; b < this.thc; b++) {
				this.sweights[a][b] *= 1;
				this.sweights[a][b] +=
					this.learn *
					this.serror[a] *
					dif(this.shidden[a]) *
					this.hidden[b];
				this.sweights[a][b] = rounded(this.sweights[a][b]);
			}
		}
		for (a = 0; a < this.ic; a++) {
			for (b = 0; b < this.fhc; b++) {
				this.weights[a][b] *= 1;
				this.weights[a][b] +=
					this.learn *
					this.ferror[a] *
					dif(this.hidden[a]) *
					this.input[b];
				this.weights[a][b] = rounded(this.weights[a][b]);
			}
		}
	};
}
