'use client';

import {redirect} from "next/navigation";
import Paragraph from "@/components/Paragraph";
import {SubmitHandler, useForm} from "react-hook-form";
import {updateMembersToAvoid} from "@/app/actions";
import Button from "@/components/Button";

interface GameConfigProps {
    gameId: string;
    members: { name: string }[];
    secret?: string;
    isResolved?: boolean;
    membersToAvoid?: string[];
}

function getFormValues(members: { name: string }[], membersToAvoid: string[]) {
    return members.reduce((acc, member) => {
        acc[member.name] = !membersToAvoid.includes(member.name);
        return acc;
    }, {} as { [member: string]: boolean });
}

export default function GameConfig({gameId, members, isResolved, secret, membersToAvoid}: GameConfigProps) {
    const {
        register,
        handleSubmit,
    } = useForm<{ [member: string]: boolean }>({defaultValues: getFormValues(members, membersToAvoid ?? [])});
    if (!secret || isResolved) {
        redirect(`/${gameId}?secret=${secret}`);
    }
    const onSubmit: SubmitHandler<{ [member: string]: boolean }> = (data: {
        [member: string]: boolean
    }) => updateMembersToAvoid(gameId, secret, Object.entries(data).filter(([_memberName, include]) => !include).map(([memberName, _include]) => memberName));
    return (
        <div>
            <Paragraph className="mb-2">Desmarca los participantes a los que no vayas a regalar</Paragraph>
            <form onSubmit={handleSubmit(onSubmit)}>
                {members.map(member => (
                    <label key={member.name} className="block text-lg">
                        <input type="checkbox"  {...register(member.name)} /> {member.name}
                    </label>
                ))}
                <Button type="submit" className="block mx-auto">Guardar</Button>
            </form>
        </div>
    );
}
