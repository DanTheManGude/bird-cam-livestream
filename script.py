import os
from dotenv import load_dotenv
import json
import googleapiclient.discovery

load_dotenv()

api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY
)


request = youtube.search().list(
    part="id,snippet",
    type="video",
    maxResults=10,
    fields="items(id(videoId),snippet(publishedAt,title))",
    channelId="UC7orL7AlwFoMYNnA-YURoBA",
    order="date",
)
response = request.execute()

json_formatted_str = json.dumps(response, indent=2)

print(json_formatted_str)
