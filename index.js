import { google } from "googleapis";
import { config } from "dotenv";

const fetchOnly = false;

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
  maxResults: 8,
});

const videos = videoResponse.data.items;

const standardTitle = "Live Bird Feeder — Boston";

videos.forEach(async ({ id: { videoId }, snippet }, index) => {
  const { publishedAt, title, description } = snippet;
  console.log(videoId, publishedAt, title);

  if (index === 0 || title !== standardTitle) return;

  const publishedDate = new Date(publishedAt);
  const offsetDate = new Date(publishedDate.getTimezoneOffset() * 60 * 1000);
  const localDate = new Date(publishedDate - offsetDate);
  const titleDate = localDate.toISOString().split("T")[0];

  const newTitle = `${titleDate}: ${standardTitle}`;

  if (fetchOnly) {
    console.log(newTitle);
    return;
  }

  const updateResponse = await youtube.videos.update({
    part: "snippet",
    requestBody: {
      id: videoId,
      snippet: { title: newTitle, description, categoryId: 15 },
    },
  });

  if (updateResponse.status === 200) {
    console.log(`Successfully updated title for ${videoId} -> ${newTitle}`);
  } else {
    conosle.log(`Error for ${videoId}-> ${newTitle}`, updateResponse);
  }
});
