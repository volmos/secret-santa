'use client';

import { createGame } from "@/app/actions";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Paragraph from "@/components/Paragraph";

type Inputs = {
    owner: string
}

import { cn } from "@/lib/tailwindUtil";

export default function CreateGame() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => createGame(data.owner);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
            <div className="space-y-4">
                <Paragraph className="text-center text-xl md:text-2xl">
                    ¡Ho Ho Ho! 🎅 <br />
                    <span className="text-base font-normal opacity-80">Introduce tu nombre para organizar el sorteo</span>
                </Paragraph>

                <div className="relative group">
                    <Input
                        placeholder="Tu nombre (ej. Santa Claus)"
                        {...register("owner", {
                            required: { value: true, message: '¡Necesitamos tu nombre!' },
                            minLength: { value: 3, message: 'Al menos 3 letras, por favor' },
                            maxLength: { value: 100, message: '¡Eso es muy largo!' }
                        })}
                        className={cn(
                            "block w-full transition-all duration-300",
                            errors.owner && "border-secondary focus:border-secondary bg-secondary/5"
                        )}
                        aria-invalid={errors.owner ? 'true' : 'false'}
                    />
                    {errors.owner && (
                        <span className="text-secondary text-sm font-bold mt-2 ml-2 flex items-center gap-1 animate-pulse">
                            ⚠️ {errors.owner.message}
                        </span>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                className="w-full md:w-auto md:mx-auto md:min-w-[200px]"
                loading={isSubmitting}
                size="lg"
            >
                Comenzar Sorteo 🎁
            </Button>
        </form>
    );
}