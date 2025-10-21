import pandas as pd
import joblib

# Load model
model = joblib.load('income_prediction_model.pkl')

# List of all training features
feature_columns = [
    'Age', 'EducationNum', 'Gender', 'Hours per Week',
    'Workclass_Local-gov', 'Workclass_Never-worked', 'Workclass_Private',
    'Workclass_Self-emp-inc', 'Workclass_Self-emp-not-inc', 'Workclass_State-gov',
    'Workclass_Without-pay', 'Marital Status_Married-AF-spouse',
    'Marital Status_Married-civ-spouse', 'Marital Status_Married-spouse-absent',
    'Marital Status_Never-married', 'Marital Status_Separated', 'Marital Status_Widowed',
    'Occupation_Armed-Forces', 'Occupation_Craft-repair', 'Occupation_Exec-managerial',
    'Occupation_Farming-fishing', 'Occupation_Handlers-cleaners', 'Occupation_Machine-op-inspct',
    'Occupation_No-occupation', 'Occupation_Other-service', 'Occupation_Priv-house-serv',
    'Occupation_Prof-specialty', 'Occupation_Protective-serv', 'Occupation_Sales',
    'Occupation_Tech-support', 'Occupation_Transport-moving', 'Relationship_Not-in-family',
    'Relationship_Other-relative', 'Relationship_Own-child', 'Relationship_Unmarried',
    'Relationship_Wife', 'Race_Asian-Pac-Islander', 'Race_Black', 'Race_Other', 'Race_White'
]

# Create user_input dictionary with all features initialized to 0
user_input = {col: 0 for col in feature_columns}

user_input.update({
    'Age': 38,
    'EducationNum': 10,
    'Gender': 1,
    'Hours per Week': 70,
    'Workclass_Private': 1,
    'Marital Status_Married-civ-spouse': 1,
    'Occupation_Handlers-cleaners': 1,
    'Relationship_Husband': 1,
    'Race_Black': 1,
})








# Convert to DataFrame
input_df = pd.DataFrame([user_input], columns=feature_columns)

# Make prediction
prediction = model.predict(input_df)[0]
print("Income >50K" if prediction == 1 else "Income <=50K")

