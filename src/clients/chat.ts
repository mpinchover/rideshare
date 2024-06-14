import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";

export class ChatClient {
  constructor() {}

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
      return chUuid;
    } catch (e) {
      console.log(e);
    }
  };

  generateChatClientToken = (userId) => {
    const serverClient = StreamChat.getInstance(
      process.env.CHAT_API_KEY,
      process.env.CHAT_API_SECRET
    );
    const token = serverClient.createToken(userId);
    return token;
  };
}
