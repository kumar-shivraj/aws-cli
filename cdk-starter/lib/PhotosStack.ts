import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // new Bucket(this, "PhotoBucket");

    // new Bucket(this, "PhotoBucket", {
    //   bucketName: "photos-bucket-shivraj",
    // });

    // aws create the new resource if we change the bucket name and delete the old one
    // const myBucket = new Bucket(this, "PhotoBucket-changed", {
    //   bucketName: "photos-bucket-shivraj",
    // });
    // here we will get the error photos-bucket-shivraj already exists in stack .....
    // in order to fix it, we manually need to delete that bucket from the aws management console
    // we can delete it with following commands through aws cli as well :
    // aws s3 rb s3://photos-bucket-shivraj
    // aws s3 rb s3://photos-bucket-shivraj --force
    // The --force flag ensures that the bucket is deleted even if it contains objects or versions. However, it’s important to confirm that the bucket is empty before proceeding.
    // We can also verify with below commands once the bucket is deleted :
    // aws s3 ls
    // then we will try to deploy our code with the updated construct id : "PhotoBucket-changed"
    // if still failing the error for the stack then we can try deleting the stack and then deploy again
    // aws cloudformation delete-stack --stack-name PhotosStack

    // manually give the logical id for the resource ourself
    const myBucket = new Bucket(this, "PhotoBucket-changed", {
      bucketName: "photos-bucket-shivraj-1",
    });
    (myBucket.node.defaultChild as CfnBucket).overrideLogicalId(
      "PhotoBucketOverride123"
    );
  }
}
