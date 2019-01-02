FROM nginx:1.13.3-alpine

## Remove default nginx website

RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /default.conf /etc/nginx/conf.d/default.conf

COPY /dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
