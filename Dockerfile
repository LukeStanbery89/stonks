# syntax=docker/dockerfile:1
FROM node:16-alpine
COPY . /app
WORKDIR /app
CMD ["npm", "run", "start"]
EXPOSE 3000