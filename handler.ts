import DynamoDB from "aws-sdk/clients/dynamodb";
import SQS from "aws-sdk/clients/sqs";
import { SQSEvent, SNSMessage, SQSRecord } from "aws-lambda";
//other imports....

const sqs = new SQS({ region: process.env.AWS_REGION });
const dynamoDbClient = new DynamoDB.DocumentClient();
const myModule1 = new myModule1(dynamoDbClient);
const myModule2 = new myModule1(sqs, process.env.sqsUrl);

export const handler = async (event: SQSEvent): Promise<any> => {
  await Promise.all(event.Records.map(async (record: SQSRecord) => {
    const myModule1Promise = myModule1.doSomething(record.body);
    const myModule2Promise = myModule2.doSomething();
    
    await myModule1Promise;
    await myModule2Promise;
  }));

  return "OK";
};

//SUDO CODE
export class MyQuery {
  constructor(private readonly dynamoDbClient: DynamoDB.DocumentClient) { }

  public async execute(id: string): Promise<any> {
    const params = {...};

    await this.dynamoDbClient.query(params).promise();
  }
}

export class myModule1 {
  private readonly myQuery: MyQuery;

  constructor(private readonly dynamoDbClient: DynamoDB.DocumentClient) {
    this.myQuery = new MyQuery(this.dynamoDbClient);
  }

  public async doSomething(sqsBody: any): Promise<void> {
    //do something
    const result = await this.myQuery.execute(deliverables);
    //do something else
  }
}

export class myModule2 {
  private readonly sqsWrapper: SqsWraper;

  constructor(private readonly sqs: SQS, private readonly sqsUrl: string) {
      this.sqsWrapper = new SqsWrapper(this.sqs, this.sqsUrl);
  }

  public async doSomething(): Promise<void> {
    //do something
    await this.sqsWrapper.doSomething();
  }
}


