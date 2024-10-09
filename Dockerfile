# Step 1: Use official Node.js image from Docker Hub
FROM node:18-alpine AS builder

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the Next.js application (this will create the optimized build)
RUN npm run build

# Step 7: Expose the port on which the app will run (Next.js typically uses port 3000)
EXPOSE 3000

# Step 8: Set environment variables, if needed (you can also pass these in the Docker run command or through Docker Compose)
# ENV MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
# ENV NEXT_PUBLIC_ENV_VAR=your_public_var_here

# Step 9: Start the Next.js server in production mode
CMD ["npm", "run", "start"]
