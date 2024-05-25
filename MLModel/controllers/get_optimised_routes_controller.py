from cores import get_optimised_routes_core
import logging

def getOptimisedRoutes(request):
    json_data = request.json
    departure = json_data.get('from')
    arrival = json_data.get('to')

    return get_optimised_routes_core.getOptimisedRoutes(
        departure=departure,
        arrival=arrival,
    )