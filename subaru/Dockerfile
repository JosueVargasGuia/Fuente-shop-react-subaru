
#  docker build -t subaru-parts-react-desarrollo .  
#  docker  run  -d -p  3000:3000 subaru-parts-react-desarrollo

#  docker build -t subaru-parts-react-beta .  
#  docker  run  -d -p  5000:3000 subaru-parts-react-beta

# pull official base image
FROM node:13.12.0-alpine
# set working directory
WORKDIR /shop
# add `/shop/node_modules/.bin` to $PATH
ENV PATH /shop/node_modules/.bin:$PATH
RUN apk add --no-cache make gcc g++ python3
#RUN apk add --no-cache python2
# install app dependencies Instalar dependencias
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
#RUN npm install sass-loader sass webpack --save-dev
# add app
COPY . ./
  
# start app
CMD ["npm", "start"] 