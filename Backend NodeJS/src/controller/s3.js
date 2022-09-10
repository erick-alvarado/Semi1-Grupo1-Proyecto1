import { S3Client, ListObjectsCommand, PutObjectCommand, GetObjectAclCommand, GetObjectCommand, GetBucketLifecycleConfigurationRequestFilterSensitiveLog} from "@aws-sdk/client-s3";
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } from '../config/config.js'
import fs from 'fs'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
})

//Uploads a file to the s3 bucket
export async function uploadfile(file){
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command)

}
//Returns a json with information about all files in the s3 bucket
export async function getFiles(){
    const command = new ListObjectsCommand({
        Bucket: AWS_BUCKET_NAME
    })
    return await client.send(command)
    
}
//Prints on console the file information in s3 bucket that match with the given filename
export async function getFile(filename){
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: filename
    })
    const result = await client.send(command)
    console.log(result)
}

//Sends a file name in the s3 bucket and returns an url to access it
export async function getFileURL(filename){
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: filename
    })
    return await getSignedUrl(client, command,{expiresIn: 432000} )
}
