import os
import json

RESULTS_FOLDER = os.path.join(os.getcwd(), "results")
os.makedirs(RESULTS_FOLDER, exist_ok=True)

def save_result(filename: str, data: dict):
    file_path = os.path.join(RESULTS_FOLDER, f"{filename}.json")
    with open(file_path, "w") as f:
        json.dump(data, f)