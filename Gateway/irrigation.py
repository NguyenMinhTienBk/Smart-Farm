import json
import joblib
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from enum import Enum
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import os


class Plant(Enum):
    WHEET = 1
    GROUND_NUTS = 2
    GARDEN_FLOWERS = 3
    MAIZE = 4
    PADDY = 5
    POTATO = 6
    PULSE = 7
    SUGERCANE = 8
    COFFEE = 9


class IrrigationModel:
    def __init__(self) -> None:
        self.scaler = joblib.load('D:/OneDrive - m4n7/BK/HK222/DADN CNPM/Smart-Farm-Git/Gateway/AI/std_scaler.bin')
        self.model = joblib.load('D:/OneDrive - m4n7/BK/HK222/DADN CNPM/Smart-Farm-Git/Gateway/AI/irrigationModel.joblib')
        self.onTime = None
        self.offTime = None
        self.maxPumpTime = 30*60
        self.pumpIntervel = 20*60
        self.pumping = False

    def preprocessData(self, data):
        num_data = []
        cate_data = []

        num_data.append(data[1])
        num_data.append(data[2])
        num_data.append(data[3])
        num_data.append(data[4])

        num_data = np.array(num_data)
        num_data = num_data.reshape([1, -1])
        num_data = self.scaler.transform(num_data)

        for i in range(9):
            if data[0].value == i + 1:
                cate_data.append(1)
            else:
                cate_data.append(0)

        cate_data = np.array(cate_data)
        cate_data = cate_data.reshape([1, -1])

        pre_data = np.concatenate((num_data, cate_data), axis=1)

        return pre_data

    def predict(self, data):
        pre_data = self.preprocessData(data)
        prediction = self.model.predict(pre_data)

        return prediction

    def doIrrigate(self, data):
        curtime = datetime.now()
        res = False

        prediction = self.predict(data)
        if(prediction == 1):
            # pump time condition
            pumpTimeCondition = self.checkPumpTime(curtime)
            res = pumpTimeCondition
        else:
            if self.pumping:
                self.offTime = curtime
                self.pumping = False

        return res

    def checkPumpTime(self, curtime):
        if not self.pumping:
            if self.offTime:
                tdelta = curtime - self.offTime
                # thoi gian tat may bom da du lau chua
                if tdelta.total_seconds() < self.pumpIntervel:
                    return False

            self.onTime = curtime
            self.pumping = True
            return True
        else:
            # dung khi bom lau hon maxPumpTime
            tdelta = curtime - self.onTime
            if tdelta.total_seconds() > self.maxPumpTime:
                self.offTime = curtime
                self.pumping = False
                return False

    def preprocesDataset(self, df):
        df = df.dropna()
        # Convert the 'CropType' column into categorical data
        df['CropType'] = pd.Categorical(df['CropType'])

        # Convert the categorical data into numerical data using one-hot encoding
        df = pd.get_dummies(df, columns=['CropType'])

        # Standardize the numerical data using the StandardScaler
        num_cols = ['cropDays', 'soilMoisture', 'temp', 'humidity']
        df[num_cols] = self.scaler.fit_transform(df[num_cols])

        return df

    def retrainModel(self, model, file_path):
        retrain_df = pd.read_csv(file_path)
        retrain_df.columns = ['CropType', 'cropDays',
                              'soilMoisture', 'temp', 'humidity', 'pump']
        retrain_df = self.preprocesDataset(retrain_df)

        x = np.array(retrain_df.drop(['pump'], 1))
        y = np.array(retrain_df['pump'])
        x_train, x_test, y_train, y_test = train_test_split(
            x, y, test_size=0.2)

        # retrain
        model.partial_fit(x_train, y_train, classes=[0, 1])

        # test
        y_pred = model.predict(x_test)
        accuracy = accuracy_score(y_test, y_pred)

        #  save model
        joblib.dump(model, "irrigationModel_temp.joblib")

        return accuracy

    def saveRetrainModel(self):
        temp_model = self.loadModel("irrigationModel_temp.joblib")
        joblib.dump(temp_model, "irrigationModel_temp.joblib")

    def loadModel(self, path):
        model = joblib.load(path)
        return model
