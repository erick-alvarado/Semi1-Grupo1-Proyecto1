import {config} from 'dotenv'

config()
//-----------------------S3--------------------------------
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
export const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY


//-------------------------RDS------------------------------
export const AWS_DB_HOST = process.env.AWS_DB_HOST
export const AWS_DB_NAME = process.env.AWS_DB_NAME
export const AWS_DB_USER = process.env.AWS_DB_USER
export const AWS_DB_PASSWORD = process.env.AWS_DB_PASSWORD
