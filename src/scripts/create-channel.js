const { StreamChat } = require("stream-chat");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

dotenv.config({
  path: "../../.env",
});

createChatRoom = async (members) => {
  try {
    const serverClient = StreamChat.getInstance(
      process.env.CHAT_API_KEY,
      process.env.CHAT_API_SECRET
    );

    const membersToUpsert = members.map((userId) => {
      return {
        id: userId,
        role: "user",
      };
    });

    await serverClient.upsertUsers(membersToUpsert);

    const chUuid = uuidv4();
    const channel = serverClient.channel("messaging", chUuid, {
      members,
      created_by_id: "admin",
    });

    await channel.create();
    console.log("Ch uuid is ", chUuid);
    return chUuid;
  } catch (e) {
    console.log(e);
  }
};

createChatRoom(["userid10", "userid11"]);
