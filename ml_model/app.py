from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model
try:
    with open('income_prediction_model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Feature mapping for preprocessing
workclass_map = {
    'Private': 0, 'Self-emp-not-inc': 1, 'Self-emp-inc': 2,
    'Federal-gov': 3, 'Local-gov': 4, 'State-gov': 5,
    'Without-pay': 6, 'Never-worked': 7
}

marital_map = {
    'Married-civ-spouse': 0, 'Divorced': 1, 'Never-married': 2,
    'Separated': 3, 'Widowed': 4, 'Married-spouse-absent': 5,
    'Married-AF-spouse': 6
}

occupation_map = {
    'Tech-support': 0, 'Craft-repair': 1, 'Other-service': 2,
    'Sales': 3, 'Exec-managerial': 4, 'Prof-specialty': 5,
    'Handlers-cleaners': 6, 'Machine-op-inspct': 7, 'Adm-clerical': 8,
    'Farming-fishing': 9, 'Transport-moving': 10, 'Priv-house-serv': 11,
    'Protective-serv': 12, 'Armed-Forces': 13
}

relationship_map = {
    'Wife': 0, 'Own-child': 1, 'Husband': 2,
    'Not-in-family': 3, 'Other-relative': 4, 'Unmarried': 5
}

race_map = {
    'White': 0, 'Asian-Pac-Islander': 1, 'Amer-Indian-Eskimo': 2,
    'Other': 3, 'Black': 4
}

gender_map = {
    'Female': 0, 'Male': 1
}

@app.route('/')
def home():
    return jsonify({
        "message": "AI Income Predictor ML Service",
        "status": "running",
        "model_loaded": model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        data = request.json
        
        # Extract and preprocess features
        features = [
            int(data.get('age', 30)),
            workclass_map.get(data.get('workclass', 'Private'), 0),
            int(data.get('educationNum', 10)),
            marital_map.get(data.get('maritalStatus', 'Never-married'), 2),
            occupation_map.get(data.get('occupation', 'Other-service'), 2),
            relationship_map.get(data.get('relationship', 'Not-in-family'), 3),
            race_map.get(data.get('race', 'White'), 0),
            gender_map.get(data.get('gender', 'Male'), 1),
            int(data.get('hoursPerWeek', 40))
        ]
        
        # Make prediction
        prediction = model.predict([features])[0]
        
        # Get probability if available
        try:
            probability = model.predict_proba([features])[0]
            prob_above_50k = float(probability[1])
        except:
            prob_above_50k = 0.5 if prediction == 1 else 0.3
        
        result = ">50K" if prediction == 1 else "<=50K"
        
        return jsonify({
            "prediction": result,
            "probability": prob_above_50k,
            "features_received": data
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "model": "loaded" if model else "not loaded"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)