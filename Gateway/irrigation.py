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
        self.scaler = joblib.load('Gateway/AI/std_scaler_v5.bin')
        self.model = joblib.load('Gateway/AI/irrigationModel_v5.joblib')
        self.onTime = None
        self.offTime = None
        self.maxPumpTime = 150*60
        self.pumpIntervel = 5*60
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
        res = df.dropna()
        # Convert the 'CropType' column into categorical data
        # res['CropType'] = pd.Categorical(res['CropType'])

        # Convert the categorical data into numerical data using one-hot encoding
        # res = pd.get_dummies(res, columns=['CropType'])

        # Standardize the numerical data using the StandardScaler
        num_cols = ['cropDays', 'soilMoisture', 'temp', 'humidity']
        res[num_cols] = self.scaler.fit_transform(res[num_cols])

        return res

    def retrainModel(self, model, file_path):
        df = pd.read_csv(file_path)
        df.columns = ['cropDays', 'soilMoisture', 'temp', 'humidity', 'pump', 'CropType_1', 'CropType_2', 'CropType_3', 'CropType_4', 'CropType_5', 'CropType_6', 'CropType_7', 'CropType_8', 'CropType_9']
        retrain_df = self.preprocesDataset(df)

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
        joblib.dump(model, "Gateway/AI/irrigationModel_temp.joblib")

        return accuracy

    def saveRetrainModel(self):
        temp_model = self.loadModel("Gateway/AI/irrigationModel_temp.joblib")
        joblib.dump(temp_model, "Gateway/AI/irrigationModel_temp.joblib")

    def loadModel(self, path):
        model = joblib.load(path)
        return model
