const { StreamChat } = require("stream-chat");
const dotenv = require("dotenv");
dotenv.config({
  path: "../../.env",
});

const getChannel = async (uuid) => {
  const filter = { id: { $eq: uuid } };
  const sort = { last_message_at: -1 };

  const serverClient = StreamChat.getInstance(
    process.env.CHAT_API_KEY,
    process.env.CHAT_API_SECRET
  );

  const channels = await serverClient.queryChannels(filter, sort, {});
  console.log("Channel is ");
  channels.map((ch) => {
    console.log(ch.id, ch.cid);
  });
};

getChannel("ff4f8e85-7a1c-4608-b3ab-34f4ae88ee62");
