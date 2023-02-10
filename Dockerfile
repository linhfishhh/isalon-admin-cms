FROM 323985919046.dkr.ecr.ap-southeast-1.amazonaws.com/dockerhub/nginx:1.19.2-alpine
COPY build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
