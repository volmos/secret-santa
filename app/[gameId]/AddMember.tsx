'use client';

import {addMember} from "@/app/actions";
import {SubmitHandler, useForm} from "react-hook-form"
import Paragraph from "@/components/Paragraph";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {useState} from "react";
import {isError} from "@/lib/result";

type Inputs = {
    name: string
}

export default function AddMember({gameId}: { gameId: string }) {
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const result = await addMember(gameId, data.name);
        if (isError(result)) {
            setError(result.errorMessage);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
            <Paragraph className="text-center">Introduce tu nombre para unirte al amigo invisible</Paragraph>
            <Input {...register("name", {required: true})} className="block w-full"/>
            {errors.name && <span>Tu nombre es necesario para participar</span>}
            {error && <span>{error}</span>}
            <Button type="submit" className="block mx-auto mt-4">Unirme</Button>
        </form>
    );
}