import logging
from cores import ml_model_core

def getOptimisedRoutes(departure, arrival):
    #call ml_model_core here to calculate the predicted route
    return ml_model_core.getOptimisedRoutes(departure, arrival)
