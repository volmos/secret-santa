'use client';

import {createGame} from "@/app/actions";
import {SubmitHandler, useForm} from "react-hook-form"
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
        formState: {errors},
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => createGame(data.owner);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Paragraph className="text-center">Introduce tu nombre para comenzar</Paragraph>
            <Input {...register("owner", {required: true})} className="block mb-4 w-full" />
            {errors.owner && <span>This field is required</span>}
            <Button type="submit" className="block mx-auto">Iniciar</Button>
        </form>
    );
}