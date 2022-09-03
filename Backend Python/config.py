class Config:
    pass



class DevelopmentConfig(Config):
    DEBUG = True
    S3_ACCESS_KEY_ID="AKIA4WX7QJHHOHAHB7RJ"
    S3_SECRET_ACCESS_KEY="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"
    S3_BUCKET_NAME="img-infoutility"
    S3_BUCKET_REGION="us-east-1"
    UPLOAD_PATH="/files2"




config= {
    'development':DevelopmentConfig,
}