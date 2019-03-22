# Sketch It

A NodeJS app to demonstrate end to end use case for external developers using Design Automation for Revit. In addition to using Design Automation for Revit REST APIs, this app also leverages other Autodes Forge services like [Data API (OSS)](https://developer.autodesk.com/en/docs/data/v2/overview/), [Autodesk Viewer (LMV)](https://developer.autodesk.com/en/docs/viewer/v2/overview/) and [Model Derivative services](https://developer.autodesk.com/en/docs/model-derivative/v2/overview/).

The sketcher is built using [Redux](https://redux.js.org) with [React](https://reactjs.org) and makes use of [Flux architecture](https://facebook.github.io/flux/) extensively.

### Demo
https://s3.amazonaws.com/revitio/documentation/SketchIt.mp4

## Deploy on Heroku

To deploy this project to Heroku, be sure to set your environment variables in the dashboard:

- `FORGE_CLIENT_ID`
- `FORGE_CLIENT_SECRET`
- `FORGE_BUCKET_KEY`
- `FORGE_ACTIVITY_ID`

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Watch [this video](https://www.youtube.com/watch?v=Oqa9O20Gj0c) on how deploy this sample to Heroku.