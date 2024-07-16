
export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	MY_BUCKET : R2Bucket;


	// Binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	MY_QUEUE: Queue<any>;
}

export default {
	async queue(batch: MessageBatch<any>, env: Env): Promise<void> {
	  //console.log("Batch            " + JSON.stringify(batch))
	  console.log(batch.queue)
	  let messages = JSON.stringify(batch.messages);
	  await env.MY_BUCKET.put(`logs-myqueue/${Date.now()}.log`, messages);
	  console.log(`consumed from our queue: ${messages}`);
	},
  };


  //use vs code and wrangler tail to see output of queue