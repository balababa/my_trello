import consumer from "./consumer"
 
consumer.subscriptions.create({ channel: "BoardChannel"}, {
  received(data) {
    if (data.commit) {
      window.$store.commit(data.commit, JSON.parse(data.payload));
    }
  }
})
 