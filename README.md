# image-processing-API

This project was created as part of the Udacity Fullstack Javascript Developer Nanodegree Course.

# What does it do

This is an image-processing API.

Resizing the image (you'll have couple of images provided already) to the dimensions specified by the
user. The resized image will be saved to your disk and displayed in the new tab. If selected image already
exists in the selected dimensions, it will not be resized again, but will directly display the resized image.

All the images are saved under the name pattern: name_widthxheight.jpg, making it easier to find the specific dimension you need.

Start at the: http://localhost:3000/api

Fill the form to provide the correct info to build the endpoint or use the format:
http://localhost:3000/appi/images?filename=fjord&w=200&h=200

# Formatting scripts

- npm run prettier
- npm run lint

# Test the app

- npm run test - unit testing with Jasmine

# Run the app

- npm run build - to compile TS
- npm run start - to compile TS and run app
