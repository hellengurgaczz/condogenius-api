require('dotenv').config();
var amqp = require('amqplib/callback_api');

async function sendMessageToQueue() {
  console.log('sendMessageToQueueService')
    

    amqp.connect('amqp://localhost', function(error0, connection) {
        console.log('Entrou')

        connection.createChannel(function(error1, channel) {
        console.log(channel)
          if (error1) {
            console.log(error1)
            throw error1;
          }
          var queue = 'hello';
          var msg = 'Hello world';
      
          channel.assertQueue(queue, {
            durable: false
          });
      
          channel.sendToQueue(queue, Buffer.from(msg));
          console.log(" [x] Sent %s", msg);
        });
      });
    

}

module.exports = { sendMessageToQueue };
