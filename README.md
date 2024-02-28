# SocialStream

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Description

This project is a web client designed to visualize data from the Upfluence public SSE endpoint streaming social media posts.

## Architectural choices

While implementing the app, my main concern was to make sure the rendering of the graph isn't slowed down by the processing of the incoming data through the stream source.

To achieve this, I isolated within their own process, leveraging two web workers :

- connection to the Upfluence stream : this worker opens the connection to the SSE endpoint, posts are sorted by type as they are received, and stored within observables which serve as data store
- computation of the statistics : another worker is then in charge of calculating the number of posts by weekday & hour, in a format that will be easily usable by the data visualization component 

All of this is done to ensure the main thread only has to deal with the rendering of the punch card chart.

## Libraries

- To keep things simple, and save time on the implementation of the data visualization, I used the [AG Charts](https://charts.ag-grid.com/) library which has built-in support for scatter plot graphs. 
- RxJS Observables are used extensively throughout the app to manipulate the data
- Both workers are initialized as a side-effect, through the use of the @ngrx/effects package

## Trade-offs

- Data storage : the processed data (posts & derived stats) are simply stored in-memory within observables and their respective service. I considered setting-up an NgRx data store at first, but since the app is small, doing so remained optional to its main purpose
- Workers : both workers still rely on the main thread to communicate data between them. I tried setting up nested workers to avoid this, but while looking up for documentation on this, it turns out little performance would be gained doing so, but should the volume of data processed increase, this could be a potential improvement
- UI : implementing the UI was done with the help of Angular Material. Were I to spend additional time on the project, the next step would have been to bring more customization to the UI.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

