# perceptron
Multi layer perceptron libruary on JavaScript.
Wrote a five-layered neural network library in JavaScript.
Documentation:
//Network initialization
netw = new Neuron(input_layer_count,first_hidden_layer,second_h_layer,third_h_layer,output_layer)
// Run the input data over the network
netw.feedForeward(input_data)
//Find the error
netw.findErrors(right_answers)
//Correct the weights
netw.updateWeights()
// And so on in a loop until the network is trained)
