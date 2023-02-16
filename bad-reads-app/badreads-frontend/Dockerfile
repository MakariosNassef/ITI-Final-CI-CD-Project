###### Install dependencies  ######
FROM node:16-alpine as builder
# Make /app as working directory
WORKDIR /app
# Copy package.json file
COPY ./package.json .
RUN npm install
# Copy the source code to the /app directory
COPY . .
EXPOSE 3000
# Build the application
RUN npm run build

######  Use NgInx alpine image  ###### 
FROM nginx:stable-alpine
EXPOSE 3000
# Copy nginx config file
COPY --from=builder /app/build /usr/share/nginx/html
# Copy dist folder fro build stage to nginx public folder
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Start NgInx service
CMD ["nginx", "-g", "daemon off;"]