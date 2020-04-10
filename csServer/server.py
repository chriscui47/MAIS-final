from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np  

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import classification_report,confusion_matrix,accuracy_score
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier

from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import uniform



app = Flask(__name__)

def runModel():
    df = 'https://raw.githubusercontent.com/chriscui47/MAIS-final/master/heart.csv'
    data = pd.read_csv(df)

    #extract the x and y values
    X=data.iloc[:,0:12].values
    y=data.iloc[:,13].values

    #assign values by splitting data
    y = data.target.values
    x_data = data.drop(['target'], axis = 1)
    # Normalize
    x = (x_data - np.min(x_data)) / (np.max(x_data) - np.min(x_data)).values

    X_train, X_test, y_train, y_test = train_test_split(x,y,test_size = 0.2,random_state=0)
    rf = RandomForestClassifier(bootstrap=False,max_depth=10,max_features=2,min_samples_leaf=5,min_samples_split=12,n_estimators=75,random_state=0)
    rf.fit(X_train, y_train)
    acc = rf.score(X_test,y_test)*100
    return(rf)

def predict(age,sex,chest,BP,cholesterol,Bloodsugar,EC,HR,Angina,ST,Slope,Vessels,Thal):
    rf = runModel()
    x=[[age,sex,chest,BP,cholesterol,Bloodsugar,EC,HR,Angina,ST,Slope,Vessels,Thal]]
    y_pred=rf.predict(x)
    return(str(y_pred))


@app.route('/prediction/game', methods=['POST'])
def prediction():
    age = request.get_json()['age']
    ST = request.get_json()['ST']
    sex=request.get_json()['sex']
    chest = request.get_json()['chest']
    HR=request.get_json()['HR']
    Angina=request.get_json()['Angina']
    EC=request.get_json()['Ec']
    BP = request.get_json()['BP']
    cholesterol=request.get_json()['cholesterol']
    Bloodsugar=request.get_json()['Bloodsugar']
    Thal=request.get_json()['Thal']
    Slope=request.get_json()['Slope']
    Vessels=request.get_json()['Vessels'] 

    return(predict(age,sex,chest,BP,cholesterol,Bloodsugar,EC,HR,Angina,ST,Slope,Vessels,Thal))

if __name__ == '__main__':
    app.run()

