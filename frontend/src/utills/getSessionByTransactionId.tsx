import React from 'react'
import allSessions from '@/data/ocpp_req_conf.json';

interface useGetSessionsProps{
    transactionId:string|undefined;
}

const getSessionByTransactionId = ({transactionId}:useGetSessionsProps) => {
        const filteredSessions = allSessions.filter((current:any) => current.transactionId === transactionId)
        return filteredSessions;
    }

export default getSessionByTransactionId;