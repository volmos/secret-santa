import H2 from "@/components/H2";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";

export default function ResolvedGame({secret, members, result}: {
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
        <>
            <H2 className="text-center mb-4">¡Reparto realizado!</H2>
            <Paragraph className="mt-16 text-center">Te ha tocado regalar a <br/><span
                className="text-6xl font-bold">{assignedMember.name}</span></Paragraph>
        </>
    );
}