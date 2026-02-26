from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from backend.ai_engine import process_audio
from backend.storage import save_upload, list_processed_files

app = FastAPI(title="Kri-AI Audio 2.0")

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/upload")
async def upload_audio(file: UploadFile = File(...), bg: BackgroundTasks = None):
    """Upload audio & start AI processing in background"""
    file_path = save_upload(file)
    bg.add_task(process_audio, file_path)
    return {"message": "Audio uploaded, processing started", "file_path": file_path}

@app.get("/history")
async def get_history():
    """Return list of processed audio files"""
    files = list_processed_files()
    return {"processed_files": files}

@app.get("/health")
async def health():
    return {"status": "ok"}