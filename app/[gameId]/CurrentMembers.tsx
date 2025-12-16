import H2 from "@/components/H2";
import MemberCard from "@/components/MemberCard";

export default function CurrentMembers({ members, me }: {
    members: { name: string, membersToAvoid: string[] }[],
    me?: { name: string, membersToAvoid: string[] }
}) {
    return (
        <section className="flex-grow w-full">
            <H2 className="text-center mb-6 text-3xl font-serif text-secondary">Participantes ({members.length + (me ? 1 : 0)})</H2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                {me && <Member me={me} member={me} members={members} />}
                {members.map((member) => <Member key={member.name} me={me} member={member} members={members} />)}
            </ul>
        </section>
    );
}

function Member({ me, member, members }: {
    me?: { name: string, membersToAvoid: string[] },
    member: { name: string, membersToAvoid: string[] },
    members: { name: string, membersToAvoid: string[] }[]
}) {
    let membersToAvoid = members.filter(({ name }) => member.membersToAvoid.includes(name)).map(({ name }) => name);
    if (me && member.membersToAvoid.includes(me.name)) {
        membersToAvoid = ['ti', ...membersToAvoid];
    }
    const isMe = member.name === me?.name;

    return (
        <MemberCard
            name={member.name}
            isMe={isMe}
            membersToAvoid={membersToAvoid}
        />
    );
}