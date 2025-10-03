all three projects should have their environment variables in the .env respectfully

.env (cms & website) 
VITE_API_BASE_URL=http://localhost:5000

.env (apis)
DATABASE_URL=postgresql://neondb_owner:npg_z1jsbUcT7Pdp@ep-twilight-haze-aehcj9za-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
# PORT
PORT = 5000

# TOKEN
SECRET_KEY = secretKey

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = *
CREDENTIALS = false

# BASE URL (for file upload URLs)
BASE_URL = http://localhost:5000

# EMAIL CONFIGURATION
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=info@turkmengala.com

docker compose up -d
docker compose down

API: http://localhost:5000
Website: http://localhost:5001
CMS: http://localhost:5002