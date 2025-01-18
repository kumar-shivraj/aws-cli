#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkStarterStack } from "../lib/cdk-starter-stack";

const app = new cdk.App();
new CdkStarterStack(app, "CdkStarterStack");
// new CdkStarterStack(app, "CdkStarterStack2");
