FROM nginx:stable-alpine
RUN apk add --update nodejs
COPY nginx.conf /etc/nginx//conf.d/default.conf
COPY game-server-dashboard-web/build /usr/share/nginx/html
COPY game-server-dashboard-api /usr/share/game-server-dashboard-api
COPY start.sh ./
RUN chmod +x ./start.sh
EXPOSE 80
EXPOSE 3001
CMD [ "./start.sh" ]