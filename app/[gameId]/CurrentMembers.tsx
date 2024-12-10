import H2 from "@/components/H2";

export default function CurrentMembers({members, me}: {
    members: { name: string, membersToAvoid: string[] }[],
    me?: { name: string, membersToAvoid: string[] }
}) {
    return (
        <section className="flex-grow">
            <H2 className="text-center mb-2 underline">Participantes</H2>
            <ul className="max-w-96 mx-auto">
                {me && <Member me={me} member={me} members={members}/>}
                {members.map((member) => <Member key={member.name} me={me} member={member} members={members}/>)}
            </ul>
        </section>
    );
}

function Member({me, member, members}: {
    me?: { name: string, membersToAvoid: string[] },
    member: { name: string, membersToAvoid: string[] },
    members: { name: string, membersToAvoid: string[] }[]
}) {
    let membersToAvoid = members.filter(({name}) => member.membersToAvoid.includes(name)).map(({name}) => name);
    if (me && member.membersToAvoid.includes(me.name)) {
        membersToAvoid = ['ti', ...membersToAvoid];
    }
    const isMe = member.name === me?.name;
    return (
        <li key={member.name} className="text-3xl font-semibold">
            {isMe ? 'Tú' : member.name}
            {membersToAvoid.length > 0 &&
                <small className="block text-xs font-normal">
                    {isMe ? 'No regalas a' : 'No regala a'} {membersToAvoid.join(' ni a ')}
                </small>
            }
        </li>
    );
}