import { google } from "googleapis";
import { config } from "dotenv";

config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;

const authClient = new google.auth.OAuth2({ clientId, clientSecret });
authClient.setCredentials({ refresh_token: refreshToken });

const youtube = google.youtube({ auth: authClient, version: "v3" });

const videoResponse = await youtube.search.list({
  part: ["id", "snippet"],
  type: ["video"],
  fields: "items(id(videoId),snippet(publishedAt,title, description))",
  channelId: "UC7orL7AlwFoMYNnA-YURoBA",
  order: "date",
  maxResults: 7,
});

const videos = videoResponse.data.items;

const standardTitle = "Live Bird Feeder — Boston";

videos.forEach(async ({ id: { videoId }, snippet }) => {
  const { publishedAt, title, description } = snippet;
  //if (title !== standardTitle) return;
  if (videoId !== "Lw9Z9XgNTs4") return;

  const date = publishedAt.split("T")[0];
  const newTitle = `${date}: ${standardTitle}`;

  const updateResponse = await youtube.videos.update({
    part: "snippet",
    requestBody: {
      id: videoId,
      snippet: { title: newTitle, description, categoryId: 15 },
    },
  });

  if (updateResponse.status === 200) {
    console.log(`Successfully updated title for ${videoId}: ${date}`);
  } else {
    conosle.log(`Error for ${videoId}: ${date}`, updateResponse);
  }
});
