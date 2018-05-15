# Example Testing DynamoDB With AWS SDK Mock

This code shows an example about how to test node.js modules that rely
on the AWS SDK. It uses the AWS SDK MOCK library to do it.

An example module that could be a Lambda function or just an implementation
of the repository pattern can be found in `src/caller.js`.

You can find two tests, one success scenario and one failure scenario, in
the `test/test-dynamo-with-aws-sdk-mock.js` module.
