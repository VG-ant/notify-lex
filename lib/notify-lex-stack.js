const cdk = require('aws-cdk-lib');
const lambda = cdk.aws_lambda;
const apigateway = cdk.aws_apigateway;

class NotifyLexStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const notifyFunction = new lambda.Function(this, 'Notify Function', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda')
    });

    const api = new apigateway.RestApi(this, "Notification API", {
      restApiName: "Notification Service",
      description: "This api is hit when we have an incoming message"
    });

    const notifyIntegration = new apigateway.LambdaIntegration(notifyFunction);
    api.root.addResource('slack').addResource('events').addMethod('POST', notifyIntegration);

  }
}

module.exports = { NotifyLexStack }
