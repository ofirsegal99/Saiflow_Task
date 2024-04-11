import allMessages from '@/data/ocpp_messages.json';

interface useGetMessagesProps{
    msgId:string;
}

const getMessagesById = ({msgId}:useGetMessagesProps) => {
        const filteredMessages = allMessages.filter((current:any) => current.msg_unique_id === msgId)
        return filteredMessages;
    }

export default getMessagesById;