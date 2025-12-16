'use client';

import { addMember } from "@/app/actions";
import { SubmitHandler, useForm } from "react-hook-form"
import Paragraph from "@/components/Paragraph";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { isError } from "@/lib/result";
import Card from "@/components/Card";

type Inputs = {
    name: string
}

export default function AddMember({ gameId }: { gameId: string }) {
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const result = await addMember(gameId, data.name);
        if (isError(result)) {
            setError(result.errorMessage);
        }
    };

    return (
        <Card className="mb-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Paragraph className="text-center font-bold">Unirse al sorteo</Paragraph>
                <Paragraph className="text-center text-sm -mt-2 opacity-70">
                    Introduce tu nombre para participar
                </Paragraph>

                <div className="relative">
                    <Input
                        {...register("name", { required: true })}
                        placeholder="Tu nombre"
                        className="w-full text-center"
                    />
                    {errors.name && <span className="text-xs text-secondary font-bold absolute -bottom-5 left-0 w-full text-center">¡Nombre necesario!</span>}
                </div>

                {error && <div className="p-2 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary text-sm text-center">{error}</div>}

                <Button type="submit" className="w-full mt-2" loading={isSubmitting}>Unirme</Button>
            </form>
        </Card>
    );
}