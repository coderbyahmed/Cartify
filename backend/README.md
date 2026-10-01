# Cartify API

A REST API backend for Cartify that demonstrates core e-commerce workflows, including account access, protected product management, validation, and image storage.

## Project Vision
Cartify brings together common backend patterns used by an online store: user registration and login, JWT-protected endpoints, MongoDB-backed product CRUD, email notifications, and managed product images.

## Technologies
Node.js, Express.js, MongoDB with Mongoose, JWT (`jsonwebtoken`), `bcryptjs`, Joi, Nodemailer, Multer, Cloudinary, and dotenv.

## Features
- User registration and login with Joi validation and bcrypt password hashing
- JWT-protected profile and product write operations
- Public product listing and detail endpoints
- Welcome email sent on registration through Nodemailer and Gmail
- Product image uploads stored in Cloudinary; temporary upload files are removed after Cloudinary processing
- Cloudinary image cleanup when a product image is replaced or the product is deleted

## Project Structure
```text
server.js
src/
  config/        MongoDB and Cloudinary configuration
  controllers/   Auth and product request handlers
  middlewares/   JWT authentication, Multer upload, and Joi validation
  models/        Mongoose user and product models
  routes/        Auth and product routes
  services/      Auth and product operations
  uploads/       Temporary image uploads
  utils/         Email and Cloudinary helpers
  validations/   Joi schemas
```

## Installation
```bash
npm install
npm run dev
```

`npm start` is also available. Create a local `.env` file and configure the required settings: `PORT`, `MONGO_DB_URI`, `JWT_SECRET_KEY`, `JWT_EXPIRES_IN`, `EMAIL_USER`, `EMAIL_APP_PASSWORD`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Do not commit real credentials.

## API Endpoints
| Method | Endpoint | Access |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| GET | `/api/v1/auth/profile` | JWT required |
| GET | `/api/v1/products` | Public |
| GET | `/api/v1/products/:id` | Public |
| POST | `/api/v1/products` | JWT required |
| PUT | `/api/v1/products/:id` | JWT required |
| DELETE | `/api/v1/products/:id` | JWT required |

## Authentication
Register or log in to receive an access token. Send it with protected requests as `Authorization: Bearer <token>`; the API verifies the token and uses its user ID for the profile endpoint.

## Product Image Upload
Send an image using the `image` field in `multipart/form-data` on product create or update. The flow is:

`Client → Multer temporary file → Cloudinary → product image URL/public ID in MongoDB → temporary file cleanup`

Replacing an image removes the previous Cloudinary asset; deleting a product removes its associated asset.

## Testing
Test the endpoints with Postman. The Postman collection is provided separately.
