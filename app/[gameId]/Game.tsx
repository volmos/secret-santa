'use client';

import CurrentMembers from "@/app/[gameId]/CurrentMembers";
import AddMember from "@/app/[gameId]/AddMember";
import ResolveGame from "@/app/[gameId]/ResolveGame";
import { AblyProvider, ChannelProvider, useChannel } from "ably/react";
import Ably from "ably";
import ResolvedGame from "@/app/[gameId]/ResolvedGame";
import { useEffect, useState } from "react";
import Paragraph from "@/components/Paragraph";
import ConfigLink from "@/app/[gameId]/ConfigLink";
import Card from "@/components/Card";
import NotificationsRequestButton from "./NotificationsRequestButton";

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
    const client = new Ably.Realtime({ authUrl: '/api/ably-auth', authMethod: 'POST' });
    return (
        <AblyProvider client={client}>
            <ChannelProvider channelName={props.gameId}>
                <InnerComponent {...props} />
            </ChannelProvider>
        </AblyProvider>
    );
}

function InnerComponent(props: GameProps) {
    const { gameId } = props;
    const [me, setMe] = useState(props.me);
    const [members, setMembers] = useState(props.members);
    const [isResolved, setIsResolved] = useState(props.isResolved);
    const [result, setResult] = useState(props.result);
    const [permission, setPermission] = useState('default');

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('SW registration failed: ', err);
                });
        }
        if ('Notification' in window) {
            setPermission(Notification.permission);
            if (Notification.permission === 'default') {
                requestNotificationPermission();
            }
        }
    }, []);

    useEffect(() => {
        if (props.me && members.map(m => m.name).includes(props.me.name)) {
            setMembers(members.filter(m => m.name !== props.me?.name));
        }
        setMe(props.me);
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, [props.me, members]);

    const requestNotificationPermission = async () => {
        const result = await Notification.requestPermission();
        setPermission(result);
        if (result === 'granted') {
            sendNotification('Notificaciones activadas', {
                body: 'Te avisaremos cuando se unan nuevos participantes',
                icon: '/icon.png'
            });
        }
    };

    const sendNotification = (title: string, options?: NotificationOptions) => {
        if (Notification.permission === 'granted') {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(registration => {
                    registration.showNotification(title, options);
                });
            } else {
                new Notification(title, options);
            }
        }
    }

    useChannel(gameId, (message) => {
        switch (message.name) {
            case 'resolved':
                const newResult: { [secret: string]: string } = message.data;
                setIsResolved(true);
                setResult(newResult);
                sendNotification('¡Sorteo realizado! 🎲', {
                    body: 'Entra para descubrir quién es tu amigo invisible',
                    icon: '/icon.png'
                });
                return;
            case 'new-member':
                const member: { name: string, membersToAvoid: string[] } = message.data;
                if (member.name !== me?.name) {
                    setMembers([...members, member]);
                    sendNotification('Nuevo participante 🎁', {
                        body: `¡${member.name} se ha unido al juego!`,
                        icon: '/icon.png'
                    });
                }
                return;
            case 'member-updated':
                const updatedMember: { name: string, membersToAvoid: string[] } = message.data;
                if (updatedMember.name === me?.name) {
                    setMe({ ...me, ...updatedMember });
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
            <ResolvedGame secret={me?.secret} result={result} members={members} />
        );
    }
    if (!me) {
        return (
            <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
                <AddMember gameId={gameId} />
                <CurrentMembers members={members} />
            </div>
        );
    }
    return (
        <>
            <div className="relative mb-6">
                <Card className="p-4 md:p-6 bg-white/70 pr-12">
                    <Paragraph className="text-lg">
                        ¡Hola <b className="text-secondary text-xl">{me.name}</b>! 👋
                    </Paragraph>
                    <div className="mt-2 text-primary/80 text-sm leading-relaxed">
                        {me.isOwner ? (
                            <>
                                Envía este
                                <button
                                    onClick={() => share(`${window.location.origin}${window.location.pathname}`)}
                                    className="mx-1 px-2 py-0.5 bg-primary/10 text-primary font-bold rounded hover:bg-primary/20 transition-colors inline-flex items-center gap-1"
                                >
                                    enlace 🔗
                                </button>
                                a los participantes.
                                <br />
                                <span className="text-xs opacity-70 block mt-1">Cuando esten todos, ¡haz el reparto!</span>
                            </>
                        ) : (
                            'Espera a que el organizador realice el sorteo.'
                        )}
                    </div>
                </Card>
                <div className="absolute top-2 right-2 flex gap-2">
                    {permission === 'default' && (
                        <NotificationsRequestButton requestNotificationPermission={requestNotificationPermission} />
                    )}
                    <ConfigLink gameId={gameId} />
                </div>
            </div>

            <CurrentMembers members={members} me={me} />

            {me.isOwner && members.length > 1 &&
                <ResolveGame gameId={gameId} />}
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