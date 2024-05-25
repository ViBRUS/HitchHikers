from flask import Flask, jsonify, request
import logging
import os
import faulthandler

from flask_cors import CORS

from controllers import get_optimised_routes_controller
from dotenv import load_dotenv
import warnings

warnings.filterwarnings("ignore")
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/getOptimisedRoutes', methods=['POST'])
    def getOptimisedRoutes():
        # logging.debug("request: ", request)
        logging.debug(f"request: {request}")
        return get_optimised_routes_controller.getOptimisedRoutes(request)


    @app.route('/', methods=['GET'])
    def home():
        logging.debug('GET home route')
        return "Welcome to Route Optimization Service!"

    return app


if __name__ == "__main__":
    faulthandler.enable()
    print("Port: ", int(os.environ.get("PORT", "3000")))
    logging.debug("started Route Optimization Service")
    print("Port: ", int(os.environ.get("PORT", "3000")))
    app_ = create_app()
    app_.run(host='0.0.0.0', port=int(os.environ.get("PORT", "3000")), debug=True)
