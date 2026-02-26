import os
from pydub import AudioSegment

UPLOAD_DIR = "backend/uploads"


def get_file_path(file_id):
    folder = os.path.join(UPLOAD_DIR, file_id)
    files = os.listdir(folder)
    return os.path.join(folder, files[0])


# DEMO Stem Extraction (Mock Split)
def extract_stems(file_id):
    original_path = get_file_path(file_id)
    folder = os.path.dirname(original_path)

    audio = AudioSegment.from_file(original_path)

    # Fake split (real demucs integrate later)
    vocals = audio - 3
    drums = audio + 2
    bass = audio.low_pass_filter(200)
    other = audio.high_pass_filter(200)

    stems = {
        "vocals": save_stem(vocals, folder, "vocals.wav", file_id),
        "drums": save_stem(drums, folder, "drums.wav", file_id),
        "bass": save_stem(bass, folder, "bass.wav", file_id),
        "other": save_stem(other, folder, "other.wav", file_id),
    }

    return stems


def apply_effect(file_id, effect):
    original_path = get_file_path(file_id)
    folder = os.path.dirname(original_path)

    audio = AudioSegment.from_file(original_path)

    if effect == "reverb":
        processed = audio + 6
    elif effect == "echo":
        processed = audio.overlay(audio, delay=200)
    elif effect == "bassboost":
        processed = audio.low_pass_filter(150)
    else:
        processed = audio

    output_path = os.path.join(folder, "processed.wav")
    processed.export(output_path, format="wav")

    return {"processed_file": f"/uploads/{file_id}/processed.wav"}


def save_stem(audio, folder, name, file_id):
    path = os.path.join(folder, name)
    audio.export(path, format="wav")
    return f"/uploads/{file_id}/{name}"