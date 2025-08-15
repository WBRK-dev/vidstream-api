# prod stage for including only necessary files
FROM node:20-alpine AS prod

# Install Firefox for Puppeteer
RUN apk add --no-cache firefox-esr

# create a non-privileged user
RUN addgroup -S vidstream-api && adduser -S user -G vidstream-api

# set secure folder permissions
RUN mkdir -p /app/public /app/dist && chown -R user:vidstream-api /app

# set non-privileged user
USER user

# set working directory
WORKDIR /app

# copy config file for better use of layers
COPY --chown=user:vidstream-api package.json .

# install dependencies
RUN npm install --ignore-scripts

# copy dist folder from build stage to prod
COPY --chown=user:vidstream-api . .

ENV NODE_ENV=production
ENV PORT=4030
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/firefox-esr

# exposed port
EXPOSE 4030

CMD [ "npm", "start" ]

# exit