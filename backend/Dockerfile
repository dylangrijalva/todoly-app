FROM node:12.21.0

# Create app directory
WORKDIR /src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Generate the .prisma/client folder into the node_modules
COPY prisma ./
RUN npx prisma generate

COPY . ./   

EXPOSE 3000
CMD ["npm", "start"]