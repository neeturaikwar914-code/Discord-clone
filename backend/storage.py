import boto3
import os
from botocore.exceptions import NoCredentialsError

# Use Environment Variables from Render
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
BUCKET_NAME = "your-bucket-name" # Change this to your actual bucket name

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

def upload_to_s3(file_path, object_name):
    """
    Uploads a file to an S3 bucket and returns the public URL
    """
    try:
        s3_client.upload_file(file_path, BUCKET_NAME, object_name)
        # Generate the public URL
        url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
        return url
    except NoCredentialsError:
        print("Credentials not available")
        return None
    except Exception as e:
        print(f"Error uploading to S3: {e}")
        return None
