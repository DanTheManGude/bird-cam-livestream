import os
from dotenv import load_dotenv

load_dotenv()

DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")

print(DEVELOPER_KEY)
