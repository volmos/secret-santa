'use client';

import {createGame} from "@/app/actions";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Paragraph from "@/components/Paragraph";

type Inputs = {
    owner: string
}

export default function CreateGame() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => createGame(data.owner);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Paragraph className="text-center">Introduce tu nombre para comenzar</Paragraph>
            <Input
                {...register("owner", {
                    required: {value: true, message: 'Tu nomber es necesario'},
                    minLength: {value: 3, message: 'Debe tener al menos 3 caracteres'},
                    maxLength: {value: 100, message: 'Debe tener como máximo 100 caracteres'}
                })}
                className="block mb-4 w-full"
                aria-invalid={errors.owner ? 'true' : 'false'}
            />
            {errors.owner && <span>{errors.owner.message}</span>}
            <Button type="submit" className="block mx-auto" loading={isSubmitting}>Iniciar</Button>
        </form>
    );
}