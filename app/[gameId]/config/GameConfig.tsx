'use client';

import {redirect} from "next/navigation";
import Paragraph from "@/components/Paragraph";
import {SubmitHandler, useForm} from "react-hook-form";
import {updateMembersToAvoid} from "@/app/actions";
import Button from "@/components/Button";
import {useState} from "react";
import {isError} from "@/lib/result";

interface GameConfigProps {
    gameId: string;
    members: { name: string }[];
    isResolved?: boolean;
    me?: {
        secret: string;
        membersToAvoid: string[];
    }
}

function getFormValues(members: { name: string }[], membersToAvoid: string[]) {
    return members.reduce((acc, member) => {
        acc[member.name] = !membersToAvoid.includes(member.name);
        return acc;
    }, {} as { [member: string]: boolean });
}

export default function GameConfig({gameId, members, isResolved, me}: GameConfigProps) {
    const {
        register,
        handleSubmit,
        formState: {isSubmitting},
    } = useForm<{ [member: string]: boolean }>({defaultValues: getFormValues(members, me?.membersToAvoid ?? [])});
    const [error, setError] = useState<string>();
    if (!me || isResolved) {
        redirect(`/${gameId}`);
    }
    const onSubmit: SubmitHandler<{ [member: string]: boolean }> = async (data: { [member: string]: boolean }) => {
        const membersToAvoid = Object.entries(data).filter(([_memberName, include]) => !include).map(([memberName, _include]) => memberName);
        const result = await updateMembersToAvoid(gameId, membersToAvoid);
        if (isError(result)) {
            setError(result.errorMessage);
        }
    };
    return (
        <div>
            <Paragraph className="mb-2">Desmarca los participantes a los que no vayas a regalar</Paragraph>
            <form onSubmit={handleSubmit(onSubmit)}>
                {members.map(member => (
                    <label key={member.name} className="block text-lg">
                        <input type="checkbox"  {...register(member.name)} /> {member.name}
                    </label>
                ))}
                {error && <span>{error}</span>}
                <Button type="submit" className="block mx-auto mt-4" loading={isSubmitting}>Guardar</Button>
            </form>
        </div>
    );
}
