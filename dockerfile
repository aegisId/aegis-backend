# Use the specified node version
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the entire project
COPY . .

# Install dependencies using yarn
RUN npm install

# Build the TypeScript code
RUN npm run build

# Expose the necessary port
EXPOSE 3006

# Start the Fastify server
CMD ["npm", "start"]