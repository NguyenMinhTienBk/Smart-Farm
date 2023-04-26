import joblib
import numpy as np
from datetime import datetime, timedelta
from enum import Enum


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

        self.scaler = joblib.load('D:/OneDrive - m4n7/BK/HK222/DADN CNPM/Smart-Farm-Git/Gateway/std_scaler.bin')
        self.model = joblib.load('D:/OneDrive - m4n7/BK/HK222/DADN CNPM/Smart-Farm-Git/Gateway/irrigationModel.joblib')
        self.onTime = None
        self.offTime = None
        self.maxPumpTime = 30*60
        self.pumpIntervel = 20*60
        self.pumping = False

    def predict(self, data):
        pre_data = np.array(data)
        pre_data = pre_data.reshape([1, -1])

        prediction = self.model.predict(self.scaler.transform(pre_data))
        return prediction

    def doIrrigate(self, data):
        prediction = self.predict(data)
        curtime = datetime.now()

        if(prediction == 1):
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
        else:
            if self.pumping:
                self.offTime = curtime
                self.pumping = False
            return False
