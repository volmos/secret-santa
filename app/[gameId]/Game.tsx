'use client';

import CurrentMembers from "@/app/[gameId]/CurrentMembers";
import AddMember from "@/app/[gameId]/AddMember";
import ResolveGame from "@/app/[gameId]/ResolveGame";
import {AblyProvider, ChannelProvider, useChannel} from "ably/react";
import Ably from "ably";
import ResolvedGame from "@/app/[gameId]/ResolvedGame";
import {useEffect, useState} from "react";
import Paragraph from "@/components/Paragraph";
import ConfigLink from "@/app/[gameId]/ConfigLink";

interface GameProps {
    gameId: string;
    me?: {
        name: string;
        secret: string;
        membersToAvoid: string[];
        isOwner: boolean;
    },
    members: { name: string, membersToAvoid: string[] }[];
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
    const {gameId} = props;
    const [me, setMe] = useState(props.me);
    const [members, setMembers] = useState(props.members);
    const [isResolved, setIsResolved] = useState(props.isResolved);
    const [result, setResult] = useState(props.result);
    useEffect(() => {
        if (me && members.map(m => m.name).includes(me.name)) {
            setMembers(members.filter(m => m.name !== me.name));
        }
        setMe(me);
    }, [me, members]);
    useChannel(gameId, (message) => {
        switch (message.name) {
            case 'resolved':
                const newResult: { [secret: string]: string } = message.data;
                setIsResolved(true);
                setResult(newResult);
                return;
            case 'new-member':
                const member: { name: string, membersToAvoid: string[] } = message.data;
                if (member.name !== me?.name) {
                    setMembers([...members, member]);
                }
                return;
            case 'member-updated':
                const updatedMember: { name: string, membersToAvoid: string[] } = message.data;
                if (updatedMember.name === me?.name) {
                    setMe({...me, ...updatedMember});
                } else {
                    setMembers(members.map(member => member.name === updatedMember.name ? updatedMember : member));
                }
                return;
            default:
                return;
        }
    });
    if (isResolved) {
        return (
            <ResolvedGame secret={me?.secret} result={result} members={members}/>
        );
    }
    if (!me) {
        return (
            <>
                <AddMember gameId={gameId}/>
                <CurrentMembers members={members}/>
            </>
        );
    }
    return (
        <>
            <Paragraph>
                ¡Hola <b>{me.name}</b>! {me.isOwner ? <>Envía este <a href="#"
                                                                      className="underline"
                                                                      onClick={() => share(`${window.location.origin}${window.location.pathname}`)}>link</a> a
                los participantes y cuando esten todos haz el
                reparto</> : 'Ahora espera al reparto para ver quién te toca'}
            </Paragraph>
            <ConfigLink gameId={gameId} secret={me.secret}/>
            <CurrentMembers members={members} me={me}/>
            {me.isOwner && members.length > 1 &&
                <ResolveGame gameId={gameId} secret={me.secret}/>}
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