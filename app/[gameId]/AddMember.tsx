'use client';

import {addMember} from "@/app/actions";
import {SubmitHandler, useForm} from "react-hook-form"
import Paragraph from "@/components/Paragraph";
import Input from "@/components/Input";
import Button from "@/components/Button";

type Inputs = {
    name: string
}

export default function AddMember({gameId}: { gameId: string }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => addMember(gameId, data.name);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paragraph className="text-center">Introduce tu nombre para unirte al amigo invisible</Paragraph>
            <div className="mb-4">
                <Input {...register("name", {required: true})} className="block w-full"/>
                {errors.name && <span>Tu nombre es necesario para participar</span>}
            </div>
            <Button type="submit" className="block mx-auto">Unirme</Button>
        </form>
    );
}