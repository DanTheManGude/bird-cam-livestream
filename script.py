import os
from dotenv import load_dotenv
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
videoList = response["items"]

standard_title = "Live Bird Feeder — Boston"

for video in videoList:
    info = video["snippet"]
    publishedDate = info["publishedAt"]
    title = info["title"]
    videoId = video["id"]["videoId"]

    if title == standard_title:
        date = publishedDate.split("T")[0]
        new_title = f"{date}: {standard_title}"

        if videoId == "jnlne5bgZhY":
            print(videoId, new_title)

            # resp = (
            #     youtube.videos()
            #     .update(
            #         part="snippet", body={"id": videoId, "snippet": {title: new_title}}
            #     )
            #     .execute()
            # )
            # print(resp)
