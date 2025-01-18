#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkStarterStack } from "../lib/cdk-starter-stack";
import { PhotosStack } from "../lib/PhotosStack";

const app = new cdk.App();
// new CdkStarterStack(app, "CdkStarterStack");
// new CdkStarterStack(app, "CdkStarterStack2");
new PhotosStack(app, "PhotosStack");
