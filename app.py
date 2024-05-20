from flask import Flask, request, jsonify
from flask_cors import CORS
import predict  # Make sure your predict.py is properly structured as a module

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict_heart_disease():
    # Extract the input data from the POST request
    input_data = request.json['data']
    # Call the get_prediction function from predict.py with the input data
    prediction_result = predict.get_prediction(input_data)
    # Return the prediction result
    return jsonify({'prediction': prediction_result})

if __name__ == '__main__':
    app.run(debug=True)
