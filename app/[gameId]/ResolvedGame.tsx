import H2 from "@/components/H2";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";
import Card from "@/components/Card";

export default function ResolvedGame({ secret, members, result }: {
    secret?: string,
    members: { name: string }[],
    result?: { [secret: string]: string }
}) {
    if (!result || !secret) {
        return <Paragraph>Ups! Parece que llegaste tarde al reparto. Puedes crear uno nuevo <Link href="/"
            className="font-bold underline">aquí</Link></Paragraph>;
    }
    const assignedMemberName = Object.entries(result).find(([key]) => key === secret)?.[1];
    const assignedMember = members.find(member => member.name === assignedMemberName);
    if (!assignedMember) {
        return null;
    }
    return (
        <Card variant="glass" className="text-center py-12 animate-fade-in relative overflow-hidden">
            {/* Confetti effect placeholder or background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent pointer-events-none"></div>

            <H2 className="text-center mb-8 text-primary font-serif drop-shadow-sm">¡Reparto Realizado!</H2>
            <Paragraph className="mb-8">Te ha tocado regalar a...</Paragraph>

            <div className="relative inline-block group cursor-pointer perspective-1000">
                <div className="relative z-10 bg-white p-8 rounded-full shadow-floating transform transition-all duration-700 hover:rotate-[360deg] hover:scale-110">
                    <span className="text-5xl md:text-7xl font-bold text-secondary font-serif bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
                        {assignedMember.name}
                    </span>
                </div>
                <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full animate-pulse group-hover:bg-accent/50"></div>
            </div>

            <Paragraph className="mt-12 text-sm opacity-60">¡Shhh! Es un secreto 🤫</Paragraph>
        </Card>
    );
}