import time
 
def days_between_dates(dt1, dt2):
    date_format = "%d-%m-%Y"
    a = time.mktime(time.strptime(dt1, date_format))
    b = time.mktime(time.strptime(dt2, date_format))
    delta = b - a
    return int(delta / 86400)
 
def checkEqualTime(d1,h1,d2,h2):
    return(d1 == d2 and h1 == h2)
 
# dt1 = "13/12/2018"
# dt2 = "25/2/2019"
# print(days_between_dates(dt1, dt2))