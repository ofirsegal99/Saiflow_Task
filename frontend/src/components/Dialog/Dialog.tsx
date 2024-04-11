import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import '@/components/Dialog/Dialog.scss';
import getMessagesById from '@/utills/getMessagesById';

interface DialogProps {
    callDialogButton: React.ReactNode;
    msgId: string;
}

const messageTypes: Record<string, string> = {
    '2': 'Client calls to server',
    '3': 'Server calls to client',
    '4': 'Error has occurred',
};

const DialogDemo = ({ callDialogButton, msgId }: DialogProps) => {
    const messages = getMessagesById({ msgId });
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {callDialogButton}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Transaction messages</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Here you can see all the ocpp messages within this specific transaction.
                    </Dialog.Description>
                    <div className='FieldsContainer'>
                        {messages.map((curr: any, index: string) => {
                          const timestamp = new Date(curr.Timestamp);
                          // Format the date into a readable string
                          const formattedTimestamp = `${timestamp.toLocaleDateString()}   ${timestamp.toLocaleTimeString()}`;
                            return (
                                <fieldset className="Fieldset">
                                    <div className='NumberOfMessage'>
                                        message {index +1}
                                    </div>
                                    <div className='row'>
                                        <span className="title">
                                            Message type :
                                        </span>
                                        <span className="result">
                                            {messageTypes[curr.msg_type]}
                                        </span>
                                    </div>
                                    <div className='row'>
                                        <span className="title">
                                            Time :
                                        </span>
                                        <span className="result">
                                            {formattedTimestamp}
                                        </span>
                                    </div>
                                </fieldset>
                            )
                        })}

                    </div>
                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                        <Dialog.Close asChild>
                            <button className="Button green">Close</button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>          </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
};

export default DialogDemo;