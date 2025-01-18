import * as cdk from "aws-cdk-lib";
import { Duration } from "aws-cdk-lib";
import { CfnOutput, CfnParameter } from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, id, {
      lifecycleRules: [
        {
          expiration: Duration.days(expiration),
        },
      ],
    });
  }
}
export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create an s3 bucket 3 ways :

    // L1 Construct
    new CfnBucket(this, "MyL1Bucket", {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 1,
            status: "Enabled",
          },
        ],
      },
    });

    // here we are paasing the parameter so deploy the stack using below command:
    // cdk deploy --parameters duration=3
    // if we don't give any parameter and execute simply `cdk deploy` then it will take the default value as parameter.
    const duration = new CfnParameter(this, "duration", {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: "Number",
    });

    // L2 Construct
    const MyL2Bucket = new Bucket(this, "MyL2Bucket", {
      lifecycleRules: [
        {
          // expiration: Duration.days(2),
          expiration: Duration.days(duration.valueAsNumber),
        },
      ],
    });

    // console.log("My L2 Bucket Name: ", MyL2Bucket.bucketName);
    new CfnOutput(this, "My L2 Bucket Name: ", {
      value: MyL2Bucket.bucketName,
    });

    // L3 Construct
    // new L3Bucket(this, "MyL3Bucket", 3);
    new L3Bucket(this, "MyL3Bucket", 5);
  }
}
