import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { Fn } from "aws-cdk-lib";

export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.initializeSuffix();

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
    // const myBucket = new Bucket(this, "PhotoBucket-changed", {
    //   bucketName: "photos-bucket-shivraj-1",
    // });
    // (myBucket.node.defaultChild as CfnBucket).overrideLogicalId(
    //   "PhotoBucketOverride123"
    // );

    new Bucket(this, "PhotoBucket-changed", {
      bucketName: `photos-bucket-shivraj-${this.stackSuffix}`,
    });
  }

  private initializeSuffix() {
    // When we use `Fn.select` on a `Fn.split` expression, AWS CDK will generate a CloudFormation
    // `Select` expression with the index of the element we want to select.
    //
    // The `stackId` property returns a string that looks like this:
    //   "arn:aws:cloudformation:REGION:ACCOUNT-ID:stack/
    //   "arn:aws:cloudformation:ap-south-1:433364472722:stack/PhotosStack/d7576e30-d561-11ef-84dd-0a157fbb039d"
    //
    // We use `Fn.split` to split the `stackId` string on the "/" character, which gives us an
    // array of strings like this:
    //   ["arn:aws:cloudformation:REGION:ACCOUNT-ID:stack", "PhotosStack", "STACK-ID"]
    //
    // We then use `Fn.select` to select the third element of the array (index 2), which is the
    // stack name.
    //
    // The resulting string is like "PhotosStack-STACK-ID".
    //
    //
    // We then split this string on the "-" character, which gives us an array of strings like
    // this:
    //   ["PhotosStack", "STACK-ID"]
    //
    // We then use `Fn.select` to select the second element of the array (index 4), which is the
    // stack ID.
    //
    // The resulting string is like "STACK-ID".
    //  =>  =>  "0a157fbb039d"
    const shortStackId = Fn.select(2, Fn.split("/", this.stackId));
    this.stackSuffix = Fn.select(4, Fn.split("-", shortStackId));
  }
}
