#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
// import { CdkStarterStack } from "../lib/cdk-starter-stack";
import { PhotosStack } from "../lib/PhotosStack";
import { PhotosHandlerStack } from "../lib/PhotosHandlerStack";

const app = new cdk.App();
// new CdkStarterStack(app, "CdkStarterStack");
// new CdkStarterStack(app, "CdkStarterStack2");
const photosStack = new PhotosStack(app, "PhotosStack");
// new PhotosHandlerStack(app, "PhotosHandlerStack");
new PhotosHandlerStack(app, "PhotosHandlerStack", {
  targetBucketArn: photosStack.photosBucketArn,
});
