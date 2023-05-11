# Module import statements:
import numpy as np
from sklearn import svm
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import SGDClassifier

import pandas as pd
import joblib


# Import Dataset:
path = 'Dataset/datasets.csv'
data = pd.read_csv(path)

data.columns = ['CropType', 'cropDays',
                'soilMoisture', 'temp', 'humidity', 'pump']
print(data.head())

# Drop any missing or null values from the DataFrame
df = data.dropna()

# Convert the 'CropType' column into categorical data
df['CropType'] = pd.Categorical(df['CropType'])

# Convert the categorical data into numerical data using one-hot encoding
df = pd.get_dummies(df, columns=['CropType'])

# Standardize the numerical data using the StandardScaler
scaler = StandardScaler()
num_cols = ['cropDays', 'soilMoisture', 'temp', 'humidity']
df[num_cols] = scaler.fit_transform(df[num_cols])

nRow, nCol = df.shape
print(f'There are {nRow} rows and {nCol} columns')
print(df.head())

# split data
x = np.array(df.drop(['pump'], 1))
y = np.array(df['pump'])
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)

# Model Training and Testing part:
cls = SGDClassifier(loss='modified_huber', penalty='l1',
                    alpha=0.001, random_state=42)
cls.fit(x_train, y_train)

y_pred = cls.predict(x_test)
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))

# save model
joblib.dump(scaler, 'std_scaler_v5.bin', compress=True)
joblib.dump(cls, 'irrigationModel_v5.joblib')
