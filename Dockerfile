FROM node

ADD package.json /pacage.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /app
ADD . /app

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]