'use client';

import { redirect } from "next/navigation";
import Paragraph from "@/components/Paragraph";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateMembersToAvoid } from "@/app/actions";
import Button from "@/components/Button";
import { useState } from "react";
import { isError } from "@/lib/result";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";

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

export default function GameConfig({ gameId, members, isResolved, me }: GameConfigProps) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<{ [member: string]: boolean }>({ defaultValues: getFormValues(members, me?.membersToAvoid ?? []) });
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
        <Card>
            <Paragraph className="mb-6 text-center font-bold text-xl">
                ¿A quién NO quieres regalar?
            </Paragraph>
            <Paragraph className="mb-6 text-center text-sm opacity-70 -mt-4">
                Desmarca las casillas de las personas que prefieres evitar.
            </Paragraph>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {members.map(member => (
                        <div key={member.name} className="p-3 border border-primary/10 rounded-xl hover:bg-white/50 transition-colors">
                            <Checkbox
                                label={member.name}
                                {...register(member.name)}
                                className="w-full justify-start"
                            />
                        </div>
                    ))}
                </div>

                {error && <div className="p-3 bg-secondary/10 text-secondary rounded-lg text-center font-bold text-sm">{error}</div>}

                <Button type="submit" className="block mx-auto mt-8 w-full md:w-auto min-w-[200px]" loading={isSubmitting}>
                    Guardar Cambios
                </Button>
            </form>
        </Card>
    );
}
