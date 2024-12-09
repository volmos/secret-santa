import H2 from "@/components/H2";

export default function CurrentMembers({members, memberName}: {
    members: { name: string, membersToAvoid: string[] }[],
    memberName?: string,
}) {
    return (
        <section className="flex-grow">
            <H2 className="text-center mb-2 underline">Participantes</H2>
            <ul className="max-w-96 mx-auto">
                {members.map((member) => <Member key={member.name} memberName={memberName} member={member} members={members}/>)}
            </ul>
        </section>
    );
}

function Member({memberName, member, members}: {
    memberName?: string,
    member: { name: string, membersToAvoid: string[] },
    members: { name: string, membersToAvoid: string[] }[]
}) {
    let membersToAvoid = members.filter(({name}) => member.membersToAvoid.includes(name)).map(({name}) => name);
    if (memberName && member.membersToAvoid.includes(memberName)) {
        membersToAvoid = ['ti', ...membersToAvoid];
    }
    return (
        <li key={member.name} className="text-3xl font-semibold">
            {member.name}
            {membersToAvoid.length > 0 && <small className="block text-xs font-normal">No regala a {membersToAvoid.join(' ni a ')}</small>}
        </li>
    );
}