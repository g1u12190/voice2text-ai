from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

print("=== MODELOS DISPONIBLES ===\n")

for model in client.models.list():
    print(model.name)