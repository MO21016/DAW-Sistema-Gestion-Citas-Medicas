# ETAPA 1: Build del frontend con Node/Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json primero
COPY package.json package-lock.json* ./
RUN npm install

# Copia el resto del código y construimos
COPY . .
RUN npm run build

# ETAPA 2: Imagen final con Nginx
# Sirve los archivos estáticos generados por Vite
FROM nginx:alpine

# Copia la config personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos del build (carpeta dist de Vite)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]