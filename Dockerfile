FROM node:20-alpine

# set the working derectory
WORKDIR /app

# copy the package.json package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# copy the rest of the application files
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "dev" ]