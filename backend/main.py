# backend/main.py

import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from storage import save_upload, list_uploads
from ai_engine import extract_stems, apply_effect

UPLOAD_DIR = "backend/uploads"

app = FastAPI(title="Kri AI Audio Backend 2.0")

# CORS (IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # production me frontend URL dal sakte ho
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.get("/")
def root():
    return {"message": "Kri AI Audio Backend Running 🚀"}


# Upload Endpoint
@app.post("/upload")
async def upload_audio(file: UploadFile = File(...)):
    file_id, filename = await save_upload(file)
    return {
        "file_id": file_id,
        "filename": filename,
        "url": f"/uploads/{file_id}/{filename}"
    }


# List Uploads
@app.get("/uploads")
def get_uploads():
    return list_uploads()


# Extract Stems
@app.post("/extract_stems")
def stem_extraction(data: dict):
    file_id = data.get("file_id")
    if not file_id:
        raise HTTPException(status_code=400, detail="file_id required")

    result = extract_stems(file_id)
    return result


# Apply Audio Effect
@app.post("/apply_effect")
def effect_audio(data: dict):
    file_id = data.get("file_id")
    effect = data.get("effect")

    if not file_id or not effect:
        raise HTTPException(status_code=400, detail="file_id and effect required")

    result = apply_effect(file_id, effect)
    return result