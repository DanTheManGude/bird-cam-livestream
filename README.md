# bird-cam-service

This script fetches the most recent YouYube videos from my channel, [Avis Amica](https://www.youtube.com/@AvisAmica). A livestream is made everyday, which is made into a video. This script renames the title of any video that uses the default name and renames it to include the data it was published.

It utilizes the YouTube api to fetch and post. It uses OAuth 2 with a `refresh_token`. Note for developer if the refresh token becomes invalid visit the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground), enter the client ID and secret found in `.env` and exchange for a new one.
