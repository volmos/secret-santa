'use client';

import CurrentMembers from "@/app/[gameId]/CurrentMembers";
import AddMember from "@/app/[gameId]/AddMember";
import ResolveGame from "@/app/[gameId]/ResolveGame";
import {AblyProvider, ChannelProvider, useChannel} from "ably/react";
import Ably from "ably";
import ResolvedGame from "@/app/[gameId]/ResolvedGame";
import {useState} from "react";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";

interface GameProps {
    gameId: string;
    memberName?: string;
    isOwner: boolean;
    members: { name: string, membersToAvoid: string[] }[];
    secret?: string;
    isResolved?: boolean;
    result?: { [secret: string]: string };
}

export default function Game(props: GameProps) {
    const client = new Ably.Realtime({authUrl: '/api/ably-auth', authMethod: 'POST'});
    return (
        <AblyProvider client={client}>
            <ChannelProvider channelName={props.gameId}>
                <InnerComponent {...props}/>
            </ChannelProvider>
        </AblyProvider>
    );
}

function InnerComponent(props: GameProps) {
    const {gameId, memberName, isOwner, secret} = props;
    const [members, setMembers] = useState(props.members);
    const [isResolved, setIsResolved] = useState(props.isResolved);
    const [result, setResult] = useState(props.result);
    useChannel(gameId, (message) => {
        switch (message.name) {
            case 'resolved':
                const newResult: { [secret: string]: string } = message.data;
                setIsResolved(true);
                setResult(newResult);
                return;
            case 'new-member':
                const member: { name: string, membersToAvoid: string[] } = message.data;
                if (member.name !== memberName) {
                    setMembers([...members, member]);
                }
                return;
            case 'member-updated':
                const updatedMember: { name: string, membersToAvoid: string[] } = message.data;
                setMembers(members.map(member => member.name === updatedMember.name ? updatedMember : member));
                return;
            default:
                return;
        }
    });
    if (isResolved) {
        return (
            <ResolvedGame secret={secret} result={result} members={members}/>
        );
    }
    if (!secret) {
        return (
            <AddMember gameId={gameId}/>
        );
    }
    return (
        <>
            <Paragraph>¡Hola <b>{memberName}</b>! {isOwner ? <>Envía este <a href="#"
                                                                             className="underline"
                                                                             onClick={() => share(`${window.location.origin}${window.location.pathname}`)}>link</a> a
                los participantes y cuando esten todos haz el
                reparto</> : 'Ahora espera al reparto para ver quién te toca'}</Paragraph>
            <Link href={`/${gameId}/config?secret=${secret}`} title="Config"
                  className="w-fit ms-auto p-2 border border-primary rounded-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-bolt">
                    <path
                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <circle cx="12" cy="12" r="4"/>
                </svg>
            </Link>
            <CurrentMembers members={members} memberName={memberName}/>
            {isOwner && members.length > 1 &&
                <ResolveGame gameId={gameId} secret={secret}/>}
        </>
    );
}

async function share(url: string) {
    if (navigator.share) {
        await navigator.share({
            title: 'Amigo invisible',
            text: 'Participa en el amigo invisible',
            url
        });
    } else {
        await navigator.clipboard.writeText(url);
        alert('Enlace copiado al portapapeles');
    }
}