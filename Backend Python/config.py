class Config:
    pass

class DevelopmentConfig(Config):
    DEBUG = True
    S3_BUCKET_NAME="archivos-1-p1"
    S3_ACCESS_KEY_ID="AKIAXUSLBHHVFU4LXXBA"
    S3_SECRET_ACCESS_KEY="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"
    S3_BUCKET_REGION="us-east-1"
    UPLOAD_PATH="/files2"
    

    MYSQL_HOST="database-1.ct4jfvgo8r4m.us-east-1.rds.amazonaws.com"
    MYSQL_USER="admin"
    MYSQL_PASSWORD="contrasena123jaja"
    MYSQL_DB="semi"

config= {
    'development':DevelopmentConfig,
}