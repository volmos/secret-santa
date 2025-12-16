import { cn } from "@/lib/tailwindUtil";

interface MemberCardProps {
    name: string;
    isMe?: boolean;
    membersToAvoid?: string[];
    className?: string;
}

export default function MemberCard({ name, isMe, membersToAvoid = [], className }: MemberCardProps) {
    return (
        <li className={cn(
            "bg-white/80 p-4 rounded-2xl shadow-sm border border-primary/10 flex flex-col gap-1 items-center justify-center text-center transition-all hover:scale-105 hover:shadow-md hover:bg-white",
            isMe && "bg-primary/5 border-primary/20",
            className
        )}>
            <div className={cn(
                "text-2xl font-bold font-serif",
                isMe ? "text-primary-dark" : "text-primary"
            )}>
                {isMe ? 'Tú' : name}
            </div>



            {membersToAvoid.length > 0 && (
                <div className="mt-2 text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20">
                    🚫 No regala a: <span className="font-semibold">{membersToAvoid.join(', ')}</span>
                </div>
            )}
        </li>
    );
}
