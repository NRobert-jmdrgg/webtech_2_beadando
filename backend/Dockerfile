FROM node:lts
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
ENV MONGO_URI=mongodb://localhost:27017/
EXPOSE 3000
CMD [ "npm", "start" ]