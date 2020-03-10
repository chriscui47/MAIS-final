# -*- coding: utf-8 -*-
"""Untitled3.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1_uanWiH7HAiDUyUL4TgRCifOYcuZJjuH
"""

from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import classification_report,confusion_matrix,accuracy_score
from sklearn import svm
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
import matplotlib.pyplot as plt
import pandas_profiling as pp
from sklearn.metrics import accuracy_score

from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import uniform
#we might need precision too? 

#to do: make a graph for accuracies usign the different models

df = 'https://raw.githubusercontent.com/chriscui47/MAIS-final/master/heart.csv'
data = pd.read_csv(df)
pp.ProfileReport(data)

#extract the x and y values
X=data.iloc[:,0:12].values
y=data.iloc[:,13].values
#count the amount of each data point
true=0
false=0
for i in y:
  if i==0:
    true+=1
  else:
    false+=1
print(true,false)

#assign values by splitting data
y = data.target.values
x_data = data.drop(['target'], axis = 1)
# Normalize
x = (x_data - np.min(x_data)) / (np.max(x_data) - np.min(x_data)).values

X_train, X_test, y_train, y_test = train_test_split(x,y,test_size = 0.2,random_state=0)

from sklearn.ensemble import RandomForestClassifier


param_grid = {
    'bootstrap': [True,False],
    'max_depth': [10,20,30,40,70],
    'max_features': [2, 3],
    'min_samples_leaf': [3, 4, 5],
    'min_samples_split': [8, 10, 12],
    'n_estimators': [10,50,75,100]
}
  
gridrf = GridSearchCV(estimator = RandomForestClassifier(random_state=0), param_grid = param_grid, 
                          cv = 3, n_jobs = -1, verbose = 2)
#fitting the model for grid search 
gridrf.fit(X_train, y_train) 
print(gridrf.best_params_)

# Commented out IPython magic to ensure Python compatibility.
rf = RandomForestClassifier(bootstrap=False,max_depth=10,max_features=2,min_samples_leaf=5,min_samples_split=12,n_estimators=75,random_state=0)
rf.fit(X_train, y_train)
acc = rf.score(X_test,y_test)*100
print("ccuracy Score : {:.2f}%".format(acc))


import sklearn.metrics as metrics

confusion_matrix(y_test, rf.predict(X_test))
print("Classification report for RF :\n%s\n"
#       % (metrics.classification_report(y_test, rf.predict(X_test))))