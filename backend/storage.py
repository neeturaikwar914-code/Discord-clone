import os
from fastapi import UploadFile

UPLOAD_DIR = "backend/uploads"
PROCESSED_DIR = os.path.join(UPLOAD_DIR, "processed")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

def save_upload(file: UploadFile) -> str:
    """Save uploaded file to uploads/"""
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    return file_path

def list_processed_files():
    """Return list of processed files"""
    return os.listdir(PROCESSED_DIR)