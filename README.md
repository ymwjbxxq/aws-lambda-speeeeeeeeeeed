# SPEEEEEEEED #

The code above contains few tricks to make your lambda fly. Most of time it could be overkilled to worry to save cents in the overall cost of lambda functions.
We have to think about lambda functions at scale and lambda price model is a combination of memory and execution so we could say **TIME IS MONEY**.


### Lambda lifecycle ###

**Amazon optimization**:

* Download your code
* Start new container

**Our optimization**: 

* Boostrap the runtime
* Run your code

**Cold start**:

* Download your code
* Start new container
* Boostrap the runtime

**Warm start**:

* Run your code

**Sum up**:

We need to make sure that our package is small as possible and 

* [Webpack](https://github.com/serverless-heaven/serverless-webpack) is the first place to start but, for me the package is between 2-4 times bigger than using webpack for yourself and provide the bundle file before the sls deploy
* Optimize dependencies using small packages as possible and so never reference the full aws-sdk but, only what you need like DynamoDB, SQS, S3 etc

Initialize your classed, SDK clients and database connections outside of the function handler, and cache static assets locally in the /tmp directory.
This saves execution time and cost for subsequent invocations (Warm start)

In this example I use SQS to trigger the lambda and based on the default batch of 10, the best way is to process all of them in parallel. 
If for example the execution of the total logic for 1 SQS message is 1s, processing them sequentially would take let�s say 10s.
Now doing all in parallel the total execution will be around 1s.

**Tips**:

* Promise.all over a sequential loop will reduce execution and overall cost
* Multiple concurrent tasks over sequential execution
