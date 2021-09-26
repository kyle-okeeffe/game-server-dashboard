import cors from 'cors';
import express from 'express';
import { EC2Client, DescribeInstancesCommand, StartInstancesCommand } from '@aws-sdk/client-ec2';


const app = express();
app.use(express.json());
app.use(cors());

app.put('/start', async (req, res) => {
  const client = new EC2Client({region: `${process.env.AWS_REGION}`});
  const command = new StartInstancesCommand({InstanceIds: [`${process.env.AWS_INSTANCE_ID}`]});
  await client.send(command).then(data => {
    console.log(data);
    res.status(data.$metadata.httpStatusCode).send(data);
  }).catch(error => {
    console.log('ERROR: ', error);
    res.status(error.$metadata.httpStatusCode).send(error);
  });
});

app.get('/public-ip', async (req, res) => {
  const client = new EC2Client({region: `${process.env.AWS_REGION}`});
  const command = new DescribeInstancesCommand({InstanceIds: [`${process.env.AWS_INSTANCE_ID}`]});
  await client.send(command).then(data => {
    console.log(data);
    console.log('PublicIP', {PublicIP: data.Reservations[0].Instances[0].PublicIpAddress});
    res.status(data.$metadata.httpStatusCode).send({PublicIP: data.Reservations[0].Instances[0].PublicIpAddress});
  }).catch(error => {
    console.log('ERROR: ', error);
    res.status(error.$metadata.httpStatusCode).send(error);
  });
});

app.listen(80, () => {
  console.log('app is running on port 80');
});
