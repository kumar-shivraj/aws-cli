Prerequisites : install node in local machine in order to use aws cdk.

In order to write the CDK code, we first need to create an AWS account.
Then we need to install AWS CLI in our local machine.
Then we need to configure AWS CLI with the proper privilage(I have provided an Admininstrator privilage)
=> this can be done by creating a user in IAM and generating secret key from there and configure in my local.
=> to verify, type "aws s3 ls" in the terminal and then it will list out all the aws s3 buckets.
Then we need to install aws cdk in your local. use below command :
npm i -g aws-cdk
cdk --version

##### AWS CDK Resources

https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html
https://github.com/aws/aws-cdk
https://github.com/aws/aws-cdk/issues
