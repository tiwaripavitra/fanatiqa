# set the base image
FROM node:12.18.2 as build
# this is the working folder in the container
# from which the app will be running from
WORKDIR /app
# copy everything to /app directory
# as opposed to on dev, in prod everything is copied to docker
COPY package.json /app 
RUN npm install
COPY . .
CMD ["npm", "start"]