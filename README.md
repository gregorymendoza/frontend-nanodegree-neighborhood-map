#Neighborhood Map

Fifth project of the Udacity's Front-End Web Developer Nanodegree Program. It is a single-page application featuring a map with the best Shopping Malls in Caracas, Venezuela. The app includes map markers to identify the locations, an text input to easily filter and discover these locations and a listview to support simple browsing of all locations. It also features Flickr photos as a third-party API.

##Getting Started

Preview this project on GitHub pages: https://gregorymendoza.github.io/frontend-nanodegree-neighborhood-map/dist/index.html

If you prefer to test it locally, clone this repository with Git or download the ZIP file and extract it to your local machine, then do the following:

1. Check out the repository
1. Run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  # On Windows you might have to change it for this:
  $> python -m http.server 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  # Or
  $> ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

##How to Run Grunt

1. Download and follow the install instructions for node.js here: http://nodejs.org/.
2. Open a terminal and install Grunt's command line interface (CLI) globally with `npm install -g grunt-cli`. This will put the `grunt` command in your system path, allowing it to be run from any directory.
3. Change to the project's root directory.
4. Install project's dependencies with `npm install`.
5. Run Grunt with `grunt`.
6. To run a specific task, you can use `grunt <task>`.

For further in-depth documentation visit Grunt's official website: http://gruntjs.com/

##Credits

Maps Icons Collection https://mapicons.mapsmarker.com ![logo](http://mapicons.mapsmarker.com/wp-content/uploads/2011/03/miclogo-88x31.gif)
